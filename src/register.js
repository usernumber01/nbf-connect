import { registerWithEmail } from "./firebase/auth.js";
import { storage } from "./firebase/config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Creating account...";

    try {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const fullName = document.getElementById("full-name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const state = document.getElementById("state").value;
        const orgType = document.getElementById("org-type").value;
        const skills = Array.from(document.querySelectorAll(".skill-checkbox:checked"))
            .map(cb => cb.value);
        const resumeFile = document.getElementById("resume").files[0];
        const photoFile = document.getElementById("photo").files[0];

        // Validate password strength before calling Firebase
        if (!isStrongPassword(password)) {
            throw new Error("WEAK_PASSWORD");
        }

        // Upload files to Firebase Storage first
        let resumeURL = null, photoURL = null;
        const tempId = `temp_${Date.now()}`;

        if (resumeFile) {
            const resumeRef = ref(storage, `resumes/${tempId}/${resumeFile.name}`);
            await uploadBytes(resumeRef, resumeFile);
            resumeURL = await getDownloadURL(resumeRef);
        }
        if (photoFile) {
            const photoRef = ref(storage, `photos/${tempId}/${photoFile.name}`);
            await uploadBytes(photoRef, photoFile);
            photoURL = await getDownloadURL(photoRef);
        }

        // Create account
        const user = await registerWithEmail(email, password, {
            fullName, mobile, state, orgType, skills,
            resumeURL, photoURL,
            role: "shurveer",
        });

        // Redirect to verify-email screen
        window.location.href = `verify-email.html?uid=${user.uid}`;

    } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Create Account";
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
    };
    return messages[code] || "Something went wrong. Please try again.";
}

function showError(message) {
    const errorEl = document.getElementById("error-message");
    errorEl.textContent = message;
    errorEl.style.display = "block";
}