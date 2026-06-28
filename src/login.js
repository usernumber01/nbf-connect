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
                
                if (err.message === "EMAIL_NOT_VERIFIED") {
                    errorEl.style.display = "block";
                    errorEl.style.color = "#ef4444";
                    errorEl.style.borderColor = "#ef4444";
                    errorEl.style.background = "rgba(239, 68, 68, 0.1)";
                    errorEl.innerHTML = `
                        <div style="text-align: left; margin-bottom: 8px;">
                            Your email address has not been verified.<br>
                            Please verify your email before logging in.
                        </div>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                            <button id="resend-verification-btn" type="button" style="padding: 6px 12px; background: #FF9933; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">
                                Resend Verification Email
                            </button>
                            <button id="refresh-verification-btn" type="button" style="padding: 6px 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">
                                Refresh Status
                            </button>
                        </div>
                        <div id="resend-msg" style="margin-top: 8px; font-size: 0.85rem;"></div>
                    `;

                    setTimeout(() => {
                        const resendBtn = document.getElementById("resend-verification-btn");
                        const refreshBtn = document.getElementById("refresh-verification-btn");
                        const resendMsg = document.getElementById("resend-msg");
                        
                        if (resendBtn) {
                            resendBtn.addEventListener("click", async () => {
                                try {
                                    resendBtn.disabled = true;
                                    resendBtn.textContent = 'Sending...';
                                    const { resendVerificationEmail } = await import("./firebase/auth.js");
                                    const { auth } = await import("./firebase/config.js");
                                    
                                    if (auth.currentUser) {
                                        await resendVerificationEmail(auth.currentUser);
                                        resendMsg.textContent = "Verification email sent successfully!";
                                        resendMsg.style.color = "#10b981";
                                    } else {
                                        resendMsg.textContent = "Session lost. Please try logging in again.";
                                        resendMsg.style.color = "#ef4444";
                                    }

                                    let timeLeft = 60;
                                    const countdown = setInterval(() => {
                                        timeLeft--;
                                        resendBtn.textContent = `Wait ${timeLeft}s`;
                                        if (timeLeft <= 0) {
                                            clearInterval(countdown);
                                            resendBtn.disabled = false;
                                            resendBtn.textContent = 'Resend Verification Email';
                                            resendMsg.textContent = "";
                                        }
                                    }, 1000);
                                } catch (error) {
                                    resendBtn.disabled = false;
                                    resendBtn.textContent = 'Resend Verification Email';
                                    resendMsg.textContent = "Failed to send email. Try again later.";
                                    resendMsg.style.color = "#ef4444";
                                }
                            });
                        }

                        if (refreshBtn) {
                            refreshBtn.addEventListener("click", async () => {
                                try {
                                    refreshBtn.disabled = true;
                                    refreshBtn.textContent = 'Refreshing...';
                                    const { auth } = await import("./firebase/config.js");
                                    if (auth.currentUser) {
                                        await auth.currentUser.reload();
                                        if (auth.currentUser.emailVerified) {
                                            window.location.href = "shurveerdashboard.html";
                                        } else {
                                            refreshBtn.disabled = false;
                                            refreshBtn.textContent = 'Refresh Status';
                                            resendMsg.textContent = "Email is still not verified.";
                                            resendMsg.style.color = "#ef4444";
                                        }
                                    } else {
                                        refreshBtn.disabled = false;
                                        refreshBtn.textContent = 'Refresh Status';
                                    }
                                } catch (e) {
                                    refreshBtn.disabled = false;
                                    refreshBtn.textContent = 'Refresh Status';
                                }
                            });
                        }
                    }, 0);
                } else {
                    showError(getErrorMessage(err.code || err.message));
                }
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
