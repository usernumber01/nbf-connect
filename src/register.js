import { registerWithEmail } from "./firebase/auth.js";
import { auth, storage } from "./firebase/config.js";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function checkRateLimit() {
    const attempts = parseInt(localStorage.getItem('nbf_auth_attempts') || '0');
    const lockoutUntil = parseInt(localStorage.getItem('nbf_auth_lockout_until') || '0');
    const now = Date.now();
    if (lockoutUntil && now < lockoutUntil) {
        const minutesLeft = Math.ceil((lockoutUntil - now) / 60000);
        return { locked: true, minutesLeft };
    }
    return { locked: false };
}

function recordFailedAttempt() {
    let attempts = parseInt(localStorage.getItem('nbf_auth_attempts') || '0');
    attempts++;
    localStorage.setItem('nbf_auth_attempts', attempts);
    if (attempts >= 5) {
        const lockoutUntil = Date.now() + (15 * 60 * 1000);
        localStorage.setItem('nbf_auth_lockout_until', lockoutUntil);
    }
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

mobileInput.addEventListener("focus", () => {
    if (!mobileInput.value) {
        mobileInput.value = "+91";
    }
});

mobileInput.addEventListener("input", () => {
    mobileError.style.display = "none";
    mobileSuccess.style.display = "none";
});

mobileInput.addEventListener("blur", () => {
    let val = mobileInput.value.trim();
    if (!val || val === "+91") {
        isPhoneValid = false;
        return;
    }
    
    val = val.replace(/[^\d+]/g, '');
    if (val.startsWith("+91") && val.length === 13) {
        // ok
    } else if (val.startsWith("91") && val.length === 12) {
        val = "+" + val;
    } else if (val.length === 10 && !val.startsWith("+")) {
        val = "+91" + val;
    }
    
    mobileInput.value = val;
    
    if (/^\+91\d{10}$/.test(val)) {
        mobileError.style.display = "none";
        mobileSuccess.style.display = "block";
        isPhoneValid = true;
    } else {
        mobileError.textContent = "Enter valid 10-digit Indian mobile number";
        mobileError.style.display = "block";
        mobileSuccess.style.display = "none";
        isPhoneValid = false;
    }
});

emailInput.addEventListener("input", () => {
    emailError.style.display = "none";
    emailSuccess.style.display = "none";
});

emailInput.addEventListener("blur", async () => {
    const val = emailInput.value.trim();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        isEmailAvailable = false;
        return;
    }
    
    try {
        const methods = await fetchSignInMethodsForEmail(auth, val);
        if (methods && methods.length > 0) {
            emailError.innerHTML = 'This email is already registered. <a href="login.html" class="login-instead-link">Login instead &rarr;</a>';
            emailError.style.display = "block";
            emailSuccess.style.display = "none";
            isEmailAvailable = false;
        } else {
            emailError.style.display = "none";
            emailSuccess.style.display = "block";
            isEmailAvailable = true;
        }
    } catch (err) {
        console.error("Email check error:", err);
    }
});

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const captchaResponse = hcaptcha.getResponse();
    if (!captchaResponse) {
        document.getElementById('captcha-error').style.display = 'block';
        return;
    }
    document.getElementById('captcha-error').style.display = 'none';

    // Form Validation for required fields
    let hasEmptyRequiredFields = false;
    const requiredFields = ['fullName', 'mobile', 'email', 'password', 'confirmPassword', 'dob', 'gender', 'state', 'district', 'orgType', 'availability', 'resume', 'photo'];
    
    // Clear old inline errors
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

    if (!isPhoneValid) {
        hasInvalidFields = true;
        const el = document.getElementById('mobile');
        if (el && el.parentElement) {
            el.parentElement.style.border = '1px solid #ef4444';
            const errorMsg = document.createElement('div');
            errorMsg.className = 'empty-field-error';
            errorMsg.style.color = '#ef4444';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '4px';
            errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> please fix error (invalid phone)';
            el.parentElement.insertAdjacentElement('afterend', errorMsg);
        }
    }

    if (!isEmailAvailable) {
        hasInvalidFields = true;
        const el = document.getElementById('email');
        if (el && el.parentElement) {
            el.parentElement.style.border = '1px solid #ef4444';
            const errorMsg = document.createElement('div');
            errorMsg.className = 'empty-field-error';
            errorMsg.style.color = '#ef4444';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '4px';
            errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> please fix error (email invalid/used)';
            el.parentElement.insertAdjacentElement('afterend', errorMsg);
        }
    }

    if (!declarationCheckbox.checked) {
        hasInvalidFields = true;
        declarationWrapper.style.borderColor = '#ff4444';
        declarationError.style.display = 'block';
    }

    if (hasEmptyRequiredFields || hasInvalidFields) {
        showError("Please fill out all required fields marked in red.");
        if (window.hcaptcha) hcaptcha.reset();
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
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Uploading resume...</span>';
            const resumeRef = ref(storage, `resumes/${user.uid}/resume.pdf`);
            await uploadBytes(resumeRef, resumeFile);
            resumeURL = await getDownloadURL(resumeRef);
        }
        if (photoFile) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Uploading photo...</span>';
            // Use original extension if available, else default to .jpg
            const ext = photoFile.name.split('.').pop() || 'jpg';
            const photoRef = ref(storage, `photos/${user.uid}/profile.${ext}`);
            await uploadBytes(photoRef, photoFile);
            photoURL = await getDownloadURL(photoRef);
        }

        // 3. Update the Firestore profile with the new URLs
        if (resumeURL || photoURL) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Finalizing profile...</span>';
            const { updateUserProfile } = await import("./firebase/firestore.js");
            await updateUserProfile(user.uid, { 
                ...(resumeURL && { resumeURL }), 
                ...(photoURL && { photoURL }) 
            });
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
        if (window.hcaptcha) hcaptcha.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-rocket"></i> <span>Join Mission</span>';
        showError(getErrorMessage(err.code || err.message));
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
        "auth/email-already-in-use": "This email is already registered. Try logging in.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "WEAK_PASSWORD": "Password needs: 8+ chars, 1 uppercase, 1 number, 1 special character.",
        "EMAIL_NOT_VERIFIED": "Please verify your email before logging in. Check your inbox.",
        "COMMITMENT_REQUIRED": "You must accept the discipline and integrity declaration to register.",
    };
    return messages[code] || `Something went wrong. Please try again. (Debug: ${code})`;
}

function showError(message) {
    const errorEl = document.getElementById("error-message");
    if (errorEl) {
        errorEl.textContent = message;
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