import { loginWithEmail, loginWithGoogle, resetPassword } from "./firebase/auth.js";

document.addEventListener("DOMContentLoaded", () => {
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
            
            errorEl.style.display = "none";
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Authenticating...</span>';
            btn.disabled = true;

            try {
                const user = await loginWithEmail(email, password);
                
                btn.innerHTML = `<i class="fas fa-check-circle"></i> <span>Welcome Back!</span>`;
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000);
            } catch (err) {
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
            errorEl.style.display = "none";

            try {
                await loginWithGoogle();
                window.location.href = "dashboard.html";
            } catch (err) {
                showError(getErrorMessage(err.code || err.message));
            }
        });
    }

    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const errorEl = document.getElementById("error-message");
            
            if (!email) {
                showError("Please enter your email address first to reset password.");
                return;
            }

            try {
                await resetPassword(email);
                errorEl.style.display = "block";
                errorEl.style.color = "#10b981";
                errorEl.style.borderColor = "#10b981";
                errorEl.style.background = "rgba(16, 185, 129, 0.1)";
                errorEl.textContent = "Password reset email sent. Check your inbox.";
            } catch (err) {
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
