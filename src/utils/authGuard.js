import { onAuthChange } from "../firebase/auth.js";

// Call at the top of any page that requires login
export function requireAuth(onSuccess, onFail) {
    return onAuthChange((user) => {
        if (user && user.emailVerified) {
            onSuccess(user);
        } else {
            onFail ? onFail() : window.location.href = "login.html";
        }
    });
}

// In your dashboard.js — use like this:
// requireAuth((user) => {
//   loadDashboard(user);
// });