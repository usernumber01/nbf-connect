import { logout } from "./firebase/auth.js";
import { db } from "./firebase/config.js";
import { doc, getDoc, collection, query, where, getDocs, limit, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DOMPurify from "dompurify";

const auth = getAuth();
document.documentElement.style.visibility = "hidden"; // hide page instantly

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/login.html";
  } else if (!user.emailVerified) {
    window.location.href = "/login.html?error=verify-email";
  } else {
    document.documentElement.style.visibility = "visible";
    // User is logged in and verified.
    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", () => initDashboard(user));
    } else {
        initDashboard(user);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {

    // 2. Wire logout buttons (Sidebar and Mobile)
    const sidebarLogout = document.getElementById("sidebar-logout");
    const mobileLogout = document.getElementById("mobile-logout");
    
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
        } catch (err) {
            console.error("Logout failed", err);
            alert("Failed to logout. Please try again.");
        }
    };

    if (sidebarLogout) sidebarLogout.addEventListener("click", handleLogout);
    if (mobileLogout) mobileLogout.addEventListener("click", handleLogout);
});

async function initDashboard(user) {
    try {
        // Fetch Profile Data
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);
        
        let profileData = {};
        if (userSnap.exists()) {
            profileData = userSnap.data();
            
            // Sync email verification status from Firebase Auth to Firestore profile
            if (user.emailVerified && profileData.emailVerified === false) {
                await updateDoc(userDocRef, { emailVerified: true });
                profileData.emailVerified = true;
                console.log("Synced email verification status to Firestore.");
            }
        } else {
            console.warn("No user profile found in Firestore.");
        }

        renderWelcomeBanner(profileData);
        renderProfileCompletion(profileData);
        renderCertificateStatus(profileData);

        // Fetch Opportunities and Applications in parallel
        await Promise.all([
            fetchAndRenderOpportunities(profileData),
            fetchAndRenderApplications(user.uid)
        ]);

        // Attach Profile Completion Simulation
        const completeProfileBtn = document.getElementById("complete-profile-btn");
        if (completeProfileBtn) {
            completeProfileBtn.addEventListener("click", () => {
                completeProfileBtn.textContent = "Saving...";
                completeProfileBtn.disabled = true;

                setTimeout(() => {
                    profileData.mobile = "9876543210";
                    profileData.state = "Delhi";
                    profileData.orgType = "ncc";
                    profileData.skills = ["Leadership", "First Aid"];
                    profileData.photoURL = "photo.jpg";
                    profileData.resumeURL = "resume.pdf";
                    profileData.verified = true;

                    renderWelcomeBanner(profileData);
                    renderProfileCompletion(profileData);
                    fetchAndRenderOpportunities(profileData);
                    
                    document.getElementById("profile-action").classList.add("hidden");
                }, 1000);
            });
        }

    } catch (error) {
        console.error("Error initializing dashboard:", error);
        alert("Unable to load data: " + (error.message || "Please refresh."));
    }
}

function renderWelcomeBanner(profileData) {
    const nameEl = document.getElementById("welcome-name");
    const badgesEl = document.getElementById("welcome-badges");

    nameEl.textContent = `Welcome back, ${profileData.displayName || "Shurveer"}!`;
    nameEl.classList.remove("skeleton", "sk-title");

    let badgesHTML = "";
    
    // Verification Badge
    if (profileData.verified) {
        badgesHTML += `<span class="badge green"><i class="fas fa-check-circle"></i> Verified Shurveer</span>`;
    } else {
        badgesHTML += `<span class="badge amber"><i class="fas fa-clock"></i> Verification Pending</span>`;
    }

    // Org Badge
    if (profileData.orgType) {
        badgesHTML += `<span class="badge orange"><i class="fas fa-sitemap"></i> ${profileData.orgType.toUpperCase()}</span>`;
    }

    // State Badge
    if (profileData.state) {
        badgesHTML += `<span class="badge white"><i class="fas fa-map-marker-alt"></i> ${profileData.state}</span>`;
    }

    badgesEl.innerHTML = DOMPurify.sanitize(badgesHTML);
}

function renderProfileCompletion(profileData) {
    // Calculate % based on: displayName(10) + mobile(10) + state(10) + orgType(10) + skills(10) + photoURL(15) + resumeURL(15) + certificate(20)
    let percent = 0;
    if (profileData.displayName) percent += 10;
    if (profileData.mobile) percent += 10;
    if (profileData.state) percent += 10;
    if (profileData.orgType) percent += 10;
    if (profileData.skills && profileData.skills.length > 0) percent += 10;
    if (profileData.photoURL) percent += 15;
    if (profileData.resumeURL) percent += 15;
    if (profileData.certificateStatus === "pending" || profileData.certificateStatus === "verified") percent += 20;

    const percentText = document.getElementById("profile-percent-text");
    const progressBar = document.getElementById("profile-progress-bar");
    const actionContainer = document.getElementById("profile-action");

    percentText.textContent = `${percent}%`;
    percentText.classList.remove("skeleton", "sk-text");

    progressBar.style.width = `${percent}%`;

    // Determine Color
    if (percent >= 100) {
        progressBar.style.backgroundColor = "var(--status-green)";
    } else if (percent >= 50) {
        progressBar.style.backgroundColor = "var(--status-amber)";
    } else {
        progressBar.style.backgroundColor = "var(--status-red)";
    }

    // Show action button if below 80% (meaning they haven't done the basic profile form yet)
    if (percent < 80) {
        actionContainer.classList.remove("hidden");
    } else {
        actionContainer.classList.add("hidden");
    }
}

async function fetchAndRenderOpportunities(profileData) {
    const oppFeed = document.getElementById("opp-feed");
    const statOpps = document.getElementById("stat-opps");

    if (!profileData.state || !profileData.orgType) {
        oppFeed.innerHTML = `<p style="color: var(--text-muted); padding: 1rem;">Please complete your profile (State and Org Type) to see targeted opportunities.</p>`;
        statOpps.textContent = "0";
        statOpps.classList.remove("skeleton", "sk-text");
        return;
    }

    try {
        const q = query(
            collection(db, "opportunities"),
            where("state", "==", profileData.state),
            where("orgType", "==", profileData.orgType),
            limit(6)
        );

        const querySnapshot = await getDocs(q);
        
        statOpps.textContent = querySnapshot.size.toString();
        statOpps.classList.remove("skeleton", "sk-text");

        if (querySnapshot.empty) {
            oppFeed.innerHTML = `<p style="color: var(--text-muted); padding: 1rem;">No opportunities in your area yet. Check back soon!</p>`;
            return;
        }

        let html = "";
        querySnapshot.forEach((doc) => {
            const opp = doc.data();
            html += `
                <div class="opp-card">
                    <h3>${opp.title || "Opportunity"}</h3>
                    <div class="opp-meta">
                        <i class="fas fa-building"></i> ${opp.orgName || "Organization"}
                    </div>
                    <div class="opp-meta">
                        <i class="fas fa-map-marker-alt"></i> ${opp.location || "Location"}
                    </div>
                    <div class="opp-meta">
                        <i class="fas fa-calendar-alt"></i> Deadline: ${opp.deadline || "TBA"}
                    </div>
                    <div class="opp-footer">
                        <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Apply Now</button>
                    </div>
                </div>
            `;
        });

        oppFeed.innerHTML = DOMPurify.sanitize(html);

    } catch (error) {
        console.error("Error fetching opportunities:", error);
        oppFeed.innerHTML = `<p style="color: var(--status-red);">Unable to load opportunities. Please refresh.</p>`;
        statOpps.textContent = "-";
        statOpps.classList.remove("skeleton", "sk-text");
    }
}

async function fetchAndRenderApplications(uid) {
    const appFeed = document.getElementById("app-feed");
    const statApps = document.getElementById("stat-apps");

    try {
        const q = query(
            collection(db, "applications"),
            where("applicantId", "==", uid),
            limit(3)
        );

        const querySnapshot = await getDocs(q);
        
        statApps.textContent = querySnapshot.size.toString();
        statApps.classList.remove("skeleton", "sk-text");

        if (querySnapshot.empty) {
            appFeed.innerHTML = `<p style="color: var(--text-muted); padding: 1rem;">You haven't applied to any opportunities yet.</p>`;
            return;
        }

        let html = "";
        querySnapshot.forEach((doc) => {
            const app = doc.data();
            
            // Map status to css class and display text
            let statusClass = "status-pending";
            let statusText = "Pending";
            
            if (app.status === "reviewed") { statusClass = "status-reviewed"; statusText = "Reviewed"; }
            if (app.status === "accepted") { statusClass = "status-accepted"; statusText = "Accepted"; }
            if (app.status === "rejected") { statusClass = "status-rejected"; statusText = "Rejected"; }

            // Format date if it's a timestamp or string
            let dateStr = "Recently";
            if (app.appliedDate) {
                // simple check if it has toDate method (firestore timestamp)
                const dateObj = app.appliedDate.toDate ? app.appliedDate.toDate() : new Date(app.appliedDate);
                dateStr = dateObj.toLocaleDateString();
            }

            html += `
                <div class="app-item">
                    <div>
                        <h4 style="color: var(--navy); margin-bottom: 0.25rem;">${app.opportunityTitle || "Application"}</h4>
                        <span style="color: var(--text-muted); font-size: 0.85rem;">Applied: ${dateStr}</span>
                    </div>
                    <div>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                </div>
            `;
        });

        appFeed.innerHTML = DOMPurify.sanitize(html);

    } catch (error) {
        console.error("Error fetching applications:", error);
        appFeed.innerHTML = `<p style="color: var(--status-red);">Unable to load applications. Please refresh.</p>`;
        statApps.textContent = "-";
        statApps.classList.remove("skeleton", "sk-text");
    }
}

function renderCertificateStatus(profileData) {
    const certBox = document.getElementById("cert-box");
    const status = profileData.certificateStatus || "not_uploaded";

    let html = "";
    if (status === "not_uploaded") {
        html = `
            <i class="fas fa-file-upload" style="font-size: 2.5rem; color: var(--navy-light); margin-bottom: 1rem;"></i>
            <p style="margin-bottom: 1.5rem; color: var(--text-muted);">Upload your Original certificate to get verified</p>
            <input type="file" id="cert-upload-input" accept="image/*,.pdf" style="display: none;">
            <button class="btn btn-primary" id="cert-upload-btn">Upload Certificate</button>
        `;
    } else if (status === "pending") {
        html = `
            <i class="fas fa-clock" style="font-size: 2.5rem; color: var(--status-amber); margin-bottom: 1rem;"></i>
            <p style="color: var(--status-amber); font-weight: 600;">Certificate under review by org admin</p>
        `;
    } else if (status === "verified") {
        html = `
            <i class="fas fa-check-circle" style="font-size: 2.5rem; color: var(--status-green); margin-bottom: 1rem;"></i>
            <p style="color: var(--status-green); font-weight: 600;">Certificate verified ✅</p>
        `;
    } else if (status === "rejected") {
        html = `
            <i class="fas fa-times-circle" style="font-size: 2.5rem; color: var(--status-red); margin-bottom: 1rem;"></i>
            <p style="color: var(--status-red); font-weight: 600; margin-bottom: 1.5rem;">Certificate rejected — please re-upload</p>
            <input type="file" id="cert-upload-input" accept="image/*,.pdf" style="display: none;">
            <button class="btn btn-primary" id="cert-upload-btn">Re-upload Certificate</button>
        `;
    }

    certBox.innerHTML = DOMPurify.sanitize(html);

    // Attach event listeners after rendering
    const uploadBtn = document.getElementById("cert-upload-btn");
    const uploadInput = document.getElementById("cert-upload-input");

    if (uploadBtn && uploadInput) {
        uploadBtn.addEventListener("click", () => {
            uploadInput.click();
        });

        uploadInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                uploadBtn.textContent = "Uploading...";
                uploadBtn.disabled = true;

                // Simulate an upload delay
                setTimeout(() => {
                    // Update local state to show pending
                    profileData.certificateStatus = "pending";
                    renderCertificateStatus(profileData);
                    alert(`Successfully uploaded ${file.name}. It is now under review.`);
                }, 1500);
            }
        });
    }
}

// Added per user request: Email trigger after application is saved
export async function sendApplicationEmail(opportunity, currentUser) {
    try {
        await fetch('/.netlify/functions/send-application', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                applicantName: currentUser.displayName,
                applicantEmail: currentUser.email,
                opportunityTitle: opportunity.title,
                orgName: opportunity.orgName
            })
        });
    } catch (emailError) {
        console.warn('Application email failed:', emailError);
    }
}
