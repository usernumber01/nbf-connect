import { registerWithEmail } from "./firebase/auth.js";
import { auth, storage } from "./firebase/config.js";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

    const declarationCheckbox = document.getElementById('declaration');
    const declarationWrapper = document.querySelector('.declaration-wrapper');
    const declarationError = document.getElementById('declaration-error');

    if (!isPasswordStrong || !isConfirmMatch || !isPhoneValid || !isEmailAvailable || !declarationCheckbox.checked) {
        showError("Please fix the errors above before continuing.");
        if (!declarationCheckbox.checked) {
            declarationWrapper.style.borderColor = '#ff4444';
            declarationError.style.display = 'block';
        }
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

        setTimeout(() => {
            window.location.href = "login.html";
        }, 10000);

    } catch (err) {
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
    return messages[code] || "Something went wrong. Please try again.";
}

function showError(message) {
    const errorEl = document.getElementById("error-message");
    errorEl.textContent = message;
    errorEl.style.display = "block";
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