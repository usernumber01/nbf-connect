import { auth, db } from "./firebase/config.js";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = './login.html';
            return;
        }

        const form = document.getElementById("partner-form");
    const descInput = document.getElementById("description");
    const charCount = document.getElementById("char-count");
    const deadlineInput = document.getElementById("deadline");
    const btnSubmit = document.getElementById("btn-submit");
    const successMsg = document.getElementById("success-message");
    const successEmail = document.getElementById("success-email");
    const errorMsg = document.getElementById("error-message");

    // Live character count
    descInput.addEventListener("input", () => {
        let val = descInput.value;
        if (val.length > 500) {
            descInput.value = val.substring(0, 500);
            val = descInput.value;
        }
        charCount.textContent = val.length;
        if (val.length === 500) {
            charCount.style.color = "#e05a1e";
        } else {
            charCount.style.color = "";
        }
    });

    // Set min date for deadline
    const today = new Date().toISOString().split("T")[0];
    deadlineInput.setAttribute("min", today);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        errorMsg.style.display = "none";
        successMsg.style.display = "none";
        
        let hasError = false;
        
        // Hide all inline errors first
        document.querySelectorAll(".inline-error").forEach(el => el.style.display = "none");
        document.querySelectorAll("input, select, textarea").forEach(el => {
            el.style.borderColor = "";
        });

        // Helper to show error
        const showError = (id, msgId) => {
            const el = document.getElementById(id);
            if(el) {
                el.style.borderColor = "#ef4444";
                if (msgId) {
                    const errEl = document.getElementById(msgId);
                    if(errEl) errEl.style.display = "block";
                } else {
                    const wrapper = el.closest(".form-group");
                    if (wrapper) {
                        const err = wrapper.querySelector(".inline-error");
                        if (err) err.style.display = "block";
                    }
                }
            }
            hasError = true;
        };

        const requiredIds = [
            "orgName", "orgType", "contactPerson", "contactEmail", "contactMobile",
            "title", "type", "workMode", "state", "location", "openings",
            "minAge", "maxAge", "genderPreference", "description", "stipend", "deadline", "applicationLink"
        ];

        const data = {};

        requiredIds.forEach(id => {
            const el = document.getElementById(id);
            if(!el) return;
            const val = el.value.trim();
            if (!val) {
                showError(id);
            } else {
                data[id] = val;
            }
        });

        // Email validation
        if (data.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) {
            showError("contactEmail");
        }

        // Mobile validation
        let mobile = data.contactMobile || "";
        mobile = mobile.replace(/[^\d]/g, '');
        if (mobile.length !== 10) {
            showError("contactMobile");
        }

        // Openings
        const ops = parseInt(data.openings);
        if (data.openings && (isNaN(ops) || ops < 1 || ops > 500)) {
            showError("openings");
        }
        data.openings = ops;

        // Age logic
        data.minAge = parseInt(data.minAge);
        data.maxAge = parseInt(data.maxAge);

        // Checkboxes
        const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value);
        if (skills.length === 0) {
            document.getElementById("skills-error").style.display = "block";
            hasError = true;
        }
        data.skillsRequired = skills;

        const prefOrgTypes = Array.from(document.querySelectorAll('input[name="prefOrgType"]:checked')).map(cb => cb.value);
        if (prefOrgTypes.length === 0) {
            document.getElementById("org-error").style.display = "block";
            hasError = true;
        }
        data.preferredOrgType = prefOrgTypes;

        if (hasError) {
            errorMsg.textContent = "Please fix the errors highlighted below.";
            errorMsg.style.display = "block";
            const scrollArea = document.querySelector(".form-scroll-area");
            if(scrollArea) scrollArea.scrollTo(0, 0);
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Submitting...</span>';

        try {
            data.status = "pending_review";
            data.postedAt = new Date().toISOString();
            data.postedBy = "partner";

            if (auth.currentUser) {
                data.uid = auth.currentUser.uid;
                data.email = auth.currentUser.email;
            }
            
            await addDoc(collection(db, "partners"), data);
            
            form.reset();
            charCount.textContent = "0";
            document.querySelectorAll(".skill-chip input").forEach(cb => cb.checked = false);
            
            successEmail.textContent = data.contactEmail;
            form.style.display = "none";
            successMsg.style.display = "block";
            
            const scrollArea = document.querySelector(".form-scroll-area");
            if(scrollArea) scrollArea.scrollTo(0, 0);
            
        } catch (err) {
            console.error("Error posting opportunity:", err);
            errorMsg.textContent = "An error occurred while posting. Please try again.";
            errorMsg.style.display = "block";
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Submit Requirement</span>';
        }
    });
    });
});
