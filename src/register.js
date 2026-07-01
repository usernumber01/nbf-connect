import { registerWithEmail } from "./firebase/auth.js";
import { auth, storage } from "./firebase/config.js";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateUserProfile } from "./firebase/firestore.js";

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function checkRateLimit() {
    try {
        const attempts = parseInt(localStorage.getItem('nbf_auth_attempts') || '0');
        const lockoutUntil = parseInt(localStorage.getItem('nbf_auth_lockout_until') || '0');
        const now = Date.now();
        if (lockoutUntil && now < lockoutUntil) {
            const minutesLeft = Math.ceil((lockoutUntil - now) / 60000);
            return { locked: true, minutesLeft };
        }
    } catch (e) {
        console.warn('localStorage not available', e);
    }
    return { locked: false };
}

function recordFailedAttempt() {
    try {
        let attempts = parseInt(localStorage.getItem('nbf_auth_attempts') || '0');
        attempts++;
        localStorage.setItem('nbf_auth_attempts', attempts);
        if (attempts >= 5) {
            const lockoutUntil = Date.now() + (15 * 60 * 1000);
            localStorage.setItem('nbf_auth_lockout_until', lockoutUntil);
        }
    } catch (e) {}
}

function clearRateLimit() {
    localStorage.removeItem('nbf_auth_attempts');
    localStorage.removeItem('nbf_auth_lockout_until');
}



// Validation logic
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const emailSuccess = document.getElementById("email-success");

const mobileInput = document.getElementById("mobile");
const mobileError = document.getElementById("mobile-error");
const mobileSuccess = document.getElementById("mobile-success");

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const confirmError = document.getElementById("confirm-password-error");
const confirmSuccess = document.getElementById("confirm-password-success");

let isPasswordStrong = false;
let isConfirmMatch = false;
let isPhoneValid = false;
let isEmailAvailable = false;

passwordInput.addEventListener('strengthUpdated', function() {
    isPasswordStrong = window.isPasswordStrong || false;
    checkConfirmPassword();
});

function checkConfirmPassword() {
    const pwd = passwordInput.value;
    const confirmPwd = confirmPasswordInput.value;
    
    if (confirmPwd.length === 0) {
        confirmError.style.display = "none";
        confirmSuccess.style.display = "none";
        isConfirmMatch = false;
        return;
    }
    
    if (pwd === confirmPwd) {
        confirmError.style.display = "none";
        confirmSuccess.style.display = "block";
        isConfirmMatch = true;
    } else {
        confirmError.textContent = "Passwords do not match";
        confirmError.style.display = "block";
        confirmSuccess.style.display = "none";
        isConfirmMatch = false;
    }
}

confirmPasswordInput.addEventListener("input", checkConfirmPassword);

mobileInput.addEventListener('input', function() {
  let val = this.value.replace(/\D/g, '');
  if (val.startsWith('91') && val.length > 10) {
    val = val.substring(2);
  }
  if (val.length > 10) val = val.slice(0, 10);
  this.value = val;
  mobileError.style.display = "none";
  mobileSuccess.style.display = "none";
});

mobileInput.addEventListener('blur', function() {
  const digits = this.value.replace(/\D/g, '');
  if (digits.length !== 10) {
    mobileError.textContent = "Enter valid 10-digit Indian mobile number";
    mobileError.style.display = "block";
    mobileSuccess.style.display = "none";
    isPhoneValid = false;
  } else {
    mobileError.style.display = "none";
    mobileSuccess.style.display = "block";
    isPhoneValid = true;
  }
});

emailInput.addEventListener("input", () => {
    emailError.style.display = "none";
    emailSuccess.style.display = "none";
});

emailInput.addEventListener('blur', async function() {
  const email = this.value.trim();
  
  if (emailError) emailError.style.display = 'none';
  if (emailSuccess) emailSuccess.style.display = 'none';
  if (this.parentElement) this.parentElement.style.border = '';
  this.style.borderColor = '#e0e0e0';
  
  if (!email) {
      isEmailAvailable = false;
      return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    if (emailError) {
      emailError.innerHTML = '⚠️ Please enter a valid email address (e.g. name@gmail.com)';
      emailError.style.display = 'block';
    }
    this.style.borderColor = '#e05a1e';
    isEmailAvailable = false;
    return;
  }
  
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    
    if (methods && methods.length > 0) {
      if (emailError) {
        emailError.innerHTML = '✉️ This email is already registered. <a href="/login.html" style="color:#1a3a5c;font-weight:600;text-decoration:underline">Login instead →</a>';
        emailError.style.display = 'block';
      }
      this.style.borderColor = '#e05a1e';
      isEmailAvailable = false;
    } else {
      this.style.borderColor = '#22c55e';
      if (emailError) emailError.style.display = 'none';
      if (emailSuccess) emailSuccess.style.display = 'block';
      isEmailAvailable = true;
    }
  } catch (checkError) {
    console.warn('Email check failed:', checkError);
    // Allow submit if check fails
    isEmailAvailable = true;
  }
});

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const passwordVal = document.getElementById("password").value;
    const confirmPasswordVal = document.getElementById("confirmPassword").value;
    const errorBox = document.getElementById("registerError");

    if (passwordVal !== confirmPasswordVal) {
        if(errorBox) {
            errorBox.textContent = "Passwords do not match.";
            errorBox.style.display = "block";
            errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return; // stops the form from continuing
    }

    let captchaResponse = "";
    try {
        if (typeof hcaptcha !== 'undefined') {
            captchaResponse = hcaptcha.getResponse();
        } else if (typeof grecaptcha !== 'undefined') {
            captchaResponse = grecaptcha.getResponse();
        }
    } catch (e) {
        console.warn("CAPTCHA check failed:", e);
    }

    if (!captchaResponse) {
        document.getElementById('captcha-error').style.display = 'block';
        return;
    }
    document.getElementById('captcha-error').style.display = 'none';

    // Form Validation for required fields
    let hasEmptyRequiredFields = false;
    const requiredFields = ['fullName', 'mobile', 'email', 'password', 'confirmPassword', 'dob', 'gender', 'state', 'district', 'orgType', 'availability', 'resume', 'photo'];
    
    // Clear old inline errors
    if(document.getElementById('registerError')) document.getElementById('registerError').style.display = 'none';
    document.querySelectorAll('.empty-field-error').forEach(el => el.remove());
    document.querySelectorAll('.input-wrapper').forEach(el => el.style.border = '');
    document.querySelectorAll('.file-upload').forEach(el => el.style.border = '');

    requiredFields.forEach(fieldId => {
        const el = document.getElementById(fieldId);
        if (el && (!el.value || !el.value.trim())) {
            hasEmptyRequiredFields = true;
            if (el.parentElement.classList.contains('input-wrapper') || el.parentElement.classList.contains('file-upload')) {
                el.parentElement.style.border = '1px solid #ef4444';
                
                const errorMsg = document.createElement('div');
                errorMsg.className = 'empty-field-error';
                errorMsg.style.color = '#ef4444';
                errorMsg.style.fontSize = '0.85rem';
                errorMsg.style.marginTop = '4px';
                errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> please fix error';
                
                el.parentElement.insertAdjacentElement('afterend', errorMsg);
            }
        }
    });

    const skillsChecked = document.querySelectorAll('input[name="skills"]:checked');
    if (skillsChecked.length === 0) {
        hasEmptyRequiredFields = true;
        const skillsContainer = document.querySelector('.skills-grid');
        if (skillsContainer) {
            skillsContainer.style.border = '1px solid #ef4444';
            skillsContainer.style.borderRadius = '8px';
            skillsContainer.style.padding = '8px';
            
            const errorMsg = document.createElement('div');
            errorMsg.className = 'empty-field-error';
            errorMsg.style.color = '#ef4444';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '4px';
            errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> please fix error';
            skillsContainer.insertAdjacentElement('afterend', errorMsg);
        }
    } else {
        const skillsContainer = document.querySelector('.skills-grid');
        if (skillsContainer) {
            skillsContainer.style.border = 'none';
            skillsContainer.style.padding = '0';
        }
    }

    if (hasEmptyRequiredFields) {
        showError("Please fill out all required fields marked in red.");
        return;
    }

    const declarationCheckbox = document.getElementById('declaration');
    const declarationWrapper = document.querySelector('.declaration-wrapper');
    const declarationError = document.getElementById('declaration-error');

    let hasInvalidFields = false;

    // Check specific validation flags
    if (!isPasswordStrong) {
        hasInvalidFields = true;
        const el = document.getElementById('password');
        if (el && el.parentElement) {
            el.parentElement.style.border = '1px solid #ef4444';
            const errorMsg = document.createElement('div');
            errorMsg.className = 'empty-field-error';
            errorMsg.style.color = '#ef4444';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '4px';
            errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> please fix error (password not strong enough)';
            el.parentElement.insertAdjacentElement('afterend', errorMsg);
        }
    }

    if (!isConfirmMatch) {
        hasInvalidFields = true;
        const el = document.getElementById('confirmPassword');
        if (el && el.parentElement) {
            el.parentElement.style.border = '1px solid #ef4444';
            const errorMsg = document.createElement('div');
            errorMsg.className = 'empty-field-error';
            errorMsg.style.color = '#ef4444';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '4px';
            errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> please fix error (passwords do not match)';
            el.parentElement.insertAdjacentElement('afterend', errorMsg);
        }
    }

    // Check Phone Synchronously
    const mobileEl = document.getElementById('mobile');
    if (mobileEl && mobileEl.value) {
        const digits = mobileEl.value.replace(/\D/g, '');
        if (digits.length !== 10) {
            hasInvalidFields = true;
            if (mobileEl.parentElement) {
                mobileEl.parentElement.style.border = '1px solid #ef4444';
                const errorMsg = document.createElement('div');
                errorMsg.className = 'empty-field-error';
                errorMsg.style.color = '#ef4444';
                errorMsg.style.fontSize = '0.85rem';
                errorMsg.style.marginTop = '4px';
                errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Enter valid 10-digit Indian mobile number';
                mobileEl.parentElement.insertAdjacentElement('afterend', errorMsg);
            }
        }
    }

    // Check Email Format Synchronously
    const emailEl = document.getElementById('email');
    if (emailEl && emailEl.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailEl.value.trim())) {
            hasInvalidFields = true;
            if (emailEl.parentElement) {
                emailEl.parentElement.style.border = '1px solid #ef4444';
                const errorMsg = document.createElement('div');
                errorMsg.className = 'empty-field-error';
                errorMsg.style.color = '#ef4444';
                errorMsg.style.fontSize = '0.85rem';
                errorMsg.style.marginTop = '4px';
                errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address';
                emailEl.parentElement.insertAdjacentElement('afterend', errorMsg);
            }
        }
    }

    if (!declarationCheckbox.checked) {
        hasInvalidFields = true;
        declarationWrapper.style.borderColor = '#ff4444';
        declarationError.style.display = 'block';
    }

    if (hasEmptyRequiredFields || hasInvalidFields) {
        showError("Please fill out all required fields marked in red.");
        if (window.grecaptcha) grecaptcha.reset();
        return;
    }

    const rlCheck = checkRateLimit();
    if (rlCheck.locked) {
        showError(`Too many attempts. Please wait ${rlCheck.minutesLeft} minutes before trying again.`);
        return;
    }


    const submitBtn = document.getElementById("btn-submit");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Creating account...</span>';

    try {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const fullName = document.getElementById("fullName").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const state = document.getElementById("state").value;
        const orgType = document.getElementById("orgType").value;
        const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked'))
            .map(cb => cb.value);
        const resumeFile = document.getElementById("resume").files[0];
        const photoFile = document.getElementById("photo").files[0];



        // 1. Create account & basic Firestore profile (without URLs)
        const user = await registerWithEmail(email, password, {
            fullName, mobile, state, orgType, skills,
            role: "shurveer",
        });

        // 2. Now we have user.uid, we can upload files to Firebase Storage
        let resumeURL = null, photoURL = null;

        if (resumeFile) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Processing resume...</span>';
            resumeURL = await fileToBase64(resumeFile);
        }
        if (photoFile) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Processing photo...</span>';
            photoURL = await fileToBase64(photoFile);
        }

        // 3. Update the Firestore profile with the new URLs (Base64 strings)
        if (resumeURL || photoURL) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Finalizing profile...</span>';
            await updateUserProfile(user.uid, { 
                ...(resumeURL && { resumeURL }), 
                ...(photoURL && { photoURL }) 
            });
        }

        try {
            await fetch('/.netlify/functions/send-welcome', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fullName,
                    email: email
                })
            });
        } catch (emailError) {
            console.warn('Welcome email failed:', emailError);
            // Don't block registration if email fails
        }

        // 4. Show success message and redirect
        const formHeader = document.getElementById("form-header");
        const registerForm = document.getElementById("register-form");
        const successMessage = document.getElementById("registration-success");
        
        if (formHeader) formHeader.style.display = "none";
        if (registerForm) registerForm.style.display = "none";
        if (successMessage) successMessage.style.display = "block";
        
        // Hide the trust badges too to keep the focus on success
        const trustBadges = document.querySelector('.trust-badges');
        if (trustBadges) trustBadges.style.display = "none";

        clearRateLimit();

        // Setup Resend Verification logic
        const resendBtn = document.getElementById("resend-verification-btn");
        const resendMsg = document.getElementById("resend-msg");
        if (resendBtn) {
            resendBtn.addEventListener("click", async () => {
                try {
                    resendBtn.disabled = true;
                    resendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    
                    const { resendVerificationEmail } = await import("./firebase/auth.js");
                    // auth.currentUser is set automatically upon registration
                    const { auth } = await import("./firebase/config.js");
                    
                    if (auth.currentUser) {
                        await resendVerificationEmail(auth.currentUser);
                        resendMsg.textContent = "Verification email sent successfully!";
                        resendMsg.style.color = "#22c55e";
                    } else {
                        resendMsg.textContent = "Error: User session not found.";
                        resendMsg.style.color = "#ef4444";
                    }

                    // 60-second cooldown
                    let timeLeft = 60;
                    const countdown = setInterval(() => {
                        timeLeft--;
                        resendBtn.innerHTML = `Wait ${timeLeft}s`;
                        if (timeLeft <= 0) {
                            clearInterval(countdown);
                            resendBtn.disabled = false;
                            resendBtn.innerHTML = '<i class="fas fa-envelope"></i> Resend Verification Email';
                            resendMsg.textContent = "";
                        }
                    }, 1000);
                } catch (err) {
                    resendBtn.disabled = false;
                    resendBtn.innerHTML = '<i class="fas fa-envelope"></i> Resend Verification Email';
                    resendMsg.textContent = "Failed to send email. Please try again later.";
                    resendMsg.style.color = "#ef4444";
                    console.error("Resend error:", err);
                }
            });
        }

    } catch (err) {
        recordFailedAttempt();
        if (window.grecaptcha) grecaptcha.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-rocket"></i> <span>Join Mission</span>';
        
        const errorBox = document.getElementById("registerError");
        if (errorBox) {
            errorBox.innerHTML = getErrorMessage(err.code || err.message);
            errorBox.style.display = "block";
            errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            showError(getErrorMessage(err.code || err.message));
        }
    }
});

// Password strength checker
function isStrongPassword(password) {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    );
}

// Map Firebase error codes to user-friendly messages
function getErrorMessage(code) {
    const messages = {
        'auth/email-already-in-use': 'This email is already registered. <a href="/login.html" style="color:#e05a1e; font-weight:600">Login to your account →</a>',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/network-request-failed': 'No internet connection. Please check and retry.',
        'auth/too-many-requests': 'Too many attempts. Please wait a few minutes.',
        "WEAK_PASSWORD": "Password needs: 8+ chars, 1 uppercase, 1 number, 1 special character.",
        "EMAIL_NOT_VERIFIED": "Please verify your email before logging in. Check your inbox.",
        "COMMITMENT_REQUIRED": "You must accept the discipline and integrity declaration to register.",
    };
    return messages[code] || `Something went wrong. Please try again. (Debug: ${code})`;
}

function showError(message) {
    const errorEl = document.getElementById("error-message");
    if (errorEl) {
        errorEl.innerHTML = message;
        errorEl.style.display = "block";
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Remove error styling when declaration is checked
document.getElementById('declaration')?.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.querySelector('.declaration-wrapper').style.borderColor = 'rgba(255,255,255,0.15)';
        document.getElementById('declaration-error').style.display = 'none';
        
        // Clear main error if it was the declaration error
        const mainError = document.getElementById('error-message');
        if (mainError.textContent === 'Please accept the declaration to continue.') {
            mainError.style.display = 'none';
        }
    }
});