import { db, storage } from "./firebase/config.js";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

let errorBannerTimeout;

function showGlobalError() {
    const banner = document.getElementById("global-error-banner");
    if (!banner) return;
    banner.classList.add("show");
    if (errorBannerTimeout) clearTimeout(errorBannerTimeout);
    errorBannerTimeout = setTimeout(() => {
        banner.classList.remove("show");
    }, 6000);
}

function hideGlobalError() {
    const banner = document.getElementById("global-error-banner");
    if (banner) banner.classList.remove("show");
}

function setFieldError(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add("invalid-field");
    const errEl = document.getElementById(id + "-error");
    if (errEl) {
        errEl.textContent = message;
        errEl.style.display = "block";
    }
}

function clearFieldErrors() {
    document.querySelectorAll(".invalid-field").forEach(el => el.classList.remove("invalid-field"));
    document.querySelectorAll(".inline-error").forEach(el => {
        el.style.display = "none";
        el.textContent = "";
    });
    document.querySelectorAll(".declaration-error").forEach(el => el.style.display = "none");
    const failBanner = document.getElementById("global-failure-banner");
    if (failBanner) failBanner.style.display = "none";
    ['box-terms', 'box-nofee', 'box-data'].forEach(id => {
        const box = document.getElementById(id);
        if (box) box.style.borderColor = "#e0e0e0";
    });
}

document.getElementById("partner-form").addEventListener("input", () => {
    hideGlobalError();
});

document.getElementById("partner-form").addEventListener("change", (e) => {
    if (e.target.tagName === 'SELECT' || e.target.type === 'checkbox') {
        hideGlobalError();
        e.target.classList.remove("invalid-field");
    }
});

document.getElementById("partner-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    clearFieldErrors();
    
    let hasError = false;
    let firstErrorEl = null;

    const trackError = (id, msg) => {
        hasError = true;
        setFieldError(id, msg);
        if (!firstErrorEl) {
            firstErrorEl = document.getElementById(id) || document.getElementById(id + "-error")?.parentElement;
        }
    };

    // Check declarations
    const termsAccepted = document.getElementById("termsAccepted")?.checked;
    const noFeeDeclared = document.getElementById("noFeeDeclared")?.checked;
    const dataConsent = document.getElementById("dataConsent")?.checked;
    const declarationsError = document.getElementById("declarations-error");

    let hasDeclarationError = false;
    if (document.getElementById("termsAccepted") && !termsAccepted) {
        document.getElementById("box-terms").style.borderColor = "#DC2626";
        hasDeclarationError = true;
    }
    if (document.getElementById("noFeeDeclared") && !noFeeDeclared) {
        document.getElementById("box-nofee").style.borderColor = "#DC2626";
        hasDeclarationError = true;
    }
    if (document.getElementById("dataConsent") && !dataConsent) {
        document.getElementById("box-data").style.borderColor = "#DC2626";
        hasDeclarationError = true;
    }
    
    if (hasDeclarationError) {
        hasError = true;
        if (declarationsError) declarationsError.style.display = "block";
        if (!firstErrorEl) firstErrorEl = document.getElementById("box-terms");
    }

    // Required fields check based on existence
    const requiredFields = [
        { id: "contactPerson", name: "Contact Person" },
        { id: "designation", name: "Designation" },
        { id: "email", name: "Email Address" },
        { id: "phone", name: "Phone Number" }
    ];

    for (let field of requiredFields) {
        const el = document.getElementById(field.id);
        if (el && !el.value.trim()) {
            trackError(field.id, `Please enter your ${field.name.toLowerCase()}`);
        }
    }

    // Specific format validations
    const emailEl = document.getElementById("email");
    if (emailEl && emailEl.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
        trackError("email", "Please enter a valid email address.");
    }

    const phoneEl = document.getElementById("phone");
    if (phoneEl && phoneEl.value.trim()) {
        const phoneVal = phoneEl.value.trim().replace(/[^\d+]/g, '');
        if (phoneVal.length < 10) {
            trackError("phone", "Please enter a valid 10-digit mobile number.");
        }
    }

    if (hasError) {
        showGlobalError();
        if (firstErrorEl) {
            firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return; // STOP execution, don't submit to Firebase
    }

    const submitBtn = document.getElementById("btn-submit");
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Submitting...</span>';

    try {
        const contactPerson = document.getElementById("contactPerson")?.value.trim() || "";
        const designation = document.getElementById("designation")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim() || "";
        const phone = document.getElementById("phone")?.value.trim() || "";
        const alternateContact = document.getElementById("alternateContact")?.value.trim() || "";
        const hearAboutUs = document.getElementById("hearAboutUs")?.value || "";

        const docRef = doc(collection(db, "partners"));
        
        const partnerData = {
            contactPerson,
            designation,
            email,
            phone,
            alternateContact,
            hearAboutUs,
            termsAccepted: true,
            noFeeDeclared: true,
            dataConsent: true,
            status: "pending_review",
            source: "partnershipsignup.html",
            submittedAt: serverTimestamp()
        };

        // Save to Firestore
        await setDoc(docRef, partnerData);

        // Success Flow
        document.getElementById("form-header").style.display = "none";
        document.getElementById("partner-form").style.display = "none";
        
        const successWrapper = document.getElementById("registration-success");
        successWrapper.style.display = "flex";
        
    } catch (err) {
        console.error("Partner Registration Error: ", err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Submit</span>';
        
        const failBanner = document.getElementById("global-failure-banner");
        if (failBanner) {
            failBanner.style.display = "flex";
            failBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
