import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config.js";

// Create new user profile on register
export async function createUserProfile(uid, data) {
    await setDoc(doc(db, "users", uid), data);
}

// Get user profile
export async function getUserProfile(uid) {
    const docSnap = await getDoc(doc(db, "users", uid));
    return docSnap.exists() ? docSnap.data() : null;
}

// Update profile (e.g., after completing onboarding)
export async function updateUserProfile(uid, updates) {
    await updateDoc(doc(db, "users", uid), updates);
}