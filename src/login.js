import { loginWithEmail, loginWithGoogle, resetPassword } from "./firebase/auth.js";

// TODO: Partner portal login — Phase 2
// Partners will get login credentials via email 
// after manual verification by NBF Connect team

document.addEventListener("DOMContentLoaded", () => {
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

    const loginForm = document.getElementById("login-form");
    const googleBtn = document.getElementById("btn-google");
    const forgotPasswordBtn = document.getElementById("forgot-password");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;
            const btn = document.getElementById("btn-login");
            const errorEl = document.getElementById("error-message");
            
            const rlCheck = checkRateLimit();
            if (rlCheck.locked) {
                showError(`Too many attempts. Please wait ${rlCheck.minutesLeft} minutes before trying again.`);
                btn.disabled = true;
                return;
            }
            
            errorEl.style.display = "none";
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Authenticating...</span>';
            btn.disabled = true;

            try {
                const user = await loginWithEmail(email, password);
                
                btn.innerHTML = `<i class="fas fa-check-circle"></i> <span>Welcome Back!</span>`;
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                clearRateLimit();
                
                setTimeout(() => {
                    window.location.href = "shurveerdashboard.html";
                }, 1000);
            } catch (err) {
                recordFailedAttempt();
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-arrow-right-to-bracket"></i> <span>Login</span>';
                showError(getErrorMessage(err.code || err.message));
            }
        });
    }

    if (googleBtn) {
        googleBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const errorEl = document.getElementById("error-message");
            
            const rlCheck = checkRateLimit();
            if (rlCheck.locked) {
                showError(`Too many attempts. Please wait ${rlCheck.minutesLeft} minutes before trying again.`);
                return;
            }
            
            errorEl.style.display = "none";

            try {
                await loginWithGoogle();
                clearRateLimit();
                window.location.href = "shurveerdashboard.html";
            } catch (err) {
                recordFailedAttempt();
                showError(getErrorMessage(err.code || err.message));
            }
        });
    }

    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const errorEl = document.getElementById("error-message");
            
            const rlCheck = checkRateLimit();
            if (rlCheck.locked) {
                showError(`Too many attempts. Please wait ${rlCheck.minutesLeft} minutes before trying again.`);
                return;
            }
            
            if (!email) {
                showError("Please enter your email address first to reset password.");
                return;
            }

            try {
                await resetPassword(email);
                clearRateLimit();
                errorEl.style.display = "block";
                errorEl.style.color = "#10b981";
                errorEl.style.borderColor = "#10b981";
                errorEl.style.background = "rgba(16, 185, 129, 0.1)";
                errorEl.textContent = "Password reset email sent. Check your inbox.";
            } catch (err) {
                recordFailedAttempt();
                showError(getErrorMessage(err.code || err.message));
            }
        });
    }
});

function getErrorMessage(code) {
    const messages = {
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/user-not-found": "Incorrect email or password.",
        "auth/wrong-password": "Incorrect email or password.",
        "EMAIL_NOT_VERIFIED": "Please verify your email first.",
    };
    return messages[code] || "Something went wrong. Please try again.";
}

function showError(message) {
    const errorEl = document.getElementById("error-message");
    errorEl.textContent = message;
    errorEl.style.display = "block";
    errorEl.style.color = "#ef4444";
    errorEl.style.borderColor = "#ef4444";
    errorEl.style.background = "rgba(239, 68, 68, 0.1)";
}
