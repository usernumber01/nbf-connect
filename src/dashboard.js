import { requireAuth } from "./utils/authGuard.js";
import { logout } from "./firebase/auth.js";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Enforce route protection
    requireAuth(
        (user) => {
            // User is logged in and verified.
            console.log("Welcome verified user:", user.email);
        },
        () => {
            // Fails: redirect to login
            window.location.href = "login.html";
        }
    );

    // 2. Wire logout button
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                await logout();
            } catch (err) {
                console.error("Logout failed", err);
            }
        });
    }
});
