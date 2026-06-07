import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithCustomToken,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./config.js";
import { createUserProfile } from "./firestore.js";

// ─── EMAIL REGISTER ───────────────────────────────────────────────────────────
export async function registerWithEmail(email, password, profileData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send verification email immediately
    await sendEmailVerification(user);

    // Save profile to Firestore
    await createUserProfile(user.uid, {
        email,
        displayName: profileData.fullName,
        role: profileData.role,           // 'shurveer' | 'employer' | 'org_admin'
        mobile: profileData.mobile,
        state: profileData.state,
        orgType: profileData.orgType,
        skills: profileData.skills,
        verified: false,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        provider: "email",
    });

    return user;
}

// ─── EMAIL LOGIN ──────────────────────────────────────────────────────────────
export async function loginWithEmail(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
        await signOut(auth);
        throw new Error("EMAIL_NOT_VERIFIED");
    }

    return user;
}

// ─── GOOGLE LOGIN ─────────────────────────────────────────────────────────────
export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Create profile only if first-time Google login
    const { getUserProfile } = await import("./firestore.js");
    const existingProfile = await getUserProfile(user.uid);

    if (!existingProfile) {
        await createUserProfile(user.uid, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: "shurveer",               // default role, user can change later
            verified: false,
            emailVerified: true,            // Google accounts are already verified
            createdAt: new Date().toISOString(),
            provider: "google",
        });
    }

    return user;
}

// ─── LINKEDIN LOGIN ───────────────────────────────────────────────────────────
// LinkedIn doesn't have a native Firebase provider.
// Flow: your Netlify Function handles the OAuth, returns a custom token.
export async function loginWithLinkedIn() {
    // Step 1: Open LinkedIn OAuth popup
    const state = Math.random().toString(36).substring(2);
    const linkedInAuthUrl =
        `https://www.linkedin.com/oauth/v2/authorization` +
        `?response_type=code` +
        `&client_id=${import.meta.env.VITE_LINKEDIN_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(import.meta.env.VITE_LINKEDIN_REDIRECT_URI)}` +
        `&state=${state}` +
        `&scope=openid%20profile%20email`;

    // Step 2: Open popup and wait for custom token back
    return new Promise((resolve, reject) => {
        const popup = window.open(linkedInAuthUrl, "linkedin-auth", "width=600,height=700");

        const messageHandler = async (event) => {
            if (event.origin !== window.location.origin) return;
            if (!event.data?.customToken) return;

            window.removeEventListener("message", messageHandler);

            try {
                // Step 3: Sign into Firebase with the custom token from Netlify Function
                const userCredential = await signInWithCustomToken(auth, event.data.customToken);
                resolve(userCredential.user);
            } catch (err) {
                reject(err);
            }
        };

        window.addEventListener("message", messageHandler);

        // Timeout after 5 minutes
        setTimeout(() => {
            window.removeEventListener("message", messageHandler);
            reject(new Error("LinkedIn login timed out"));
        }, 300000);
    });
}

// ─── PASSWORD RESET ───────────────────────────────────────────────────────────
export async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
}

// ─── LOGOUT ───────────────────────────────────────────────────────────────────
export async function logout() {
    await signOut(auth);
    window.location.href = "login.html";
}

// ─── AUTH STATE LISTENER ─────────────────────────────────────────────────────
// Call this once in your app root to track login state globally
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}