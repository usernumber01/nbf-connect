import { db } from "./firebase/config.js";
import { collection, query, where, getDocs } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", async () => {
    const oppFeed = document.getElementById("opp-feed");
    
    try {
        const q = query(
            collection(db, "opportunities"),
            where("status", "==", "active")
        );
        
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
            oppFeed.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted); background: var(--card-bg); border-radius: var(--radius); border: 1px solid var(--border);">
                    <i class="fas fa-box-open" style="font-size: 3rem; color: rgba(255,255,255,0.1); margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.1rem;">No opportunities posted yet.</p>
                    <p style="font-size: 0.9rem; margin-top: 4px;">Check back soon or post one!</p>
                </div>
            `;
            return;
        }

        const opportunities = [];
        snapshot.forEach(doc => {
            opportunities.push({ id: doc.id, ...doc.data() });
        });

        // Sort locally to avoid requiring composite index in Firestore
        opportunities.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

        let html = '';
        
        opportunities.forEach(opp => {
            // Format deadline
            let deadlineStr = opp.deadline;
            if (deadlineStr) {
                const d = new Date(deadlineStr);
                const options = { day: '2-digit', month: 'short', year: 'numeric' };
                deadlineStr = d.toLocaleDateString('en-IN', options);
            }

            // Fallback backgrounds
            const bgImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

            let skillsHtml = '';
            if (opp.skillsRequired && opp.skillsRequired.length > 0) {
                // Show up to 3 skills
                opp.skillsRequired.slice(0, 3).forEach(skill => {
                    skillsHtml += `<span class="tag">${skill}</span>`;
                });
                if (opp.skillsRequired.length > 3) {
                    skillsHtml += `<span class="tag">+${opp.skillsRequired.length - 3}</span>`;
                }
            }

            // App link
            let applyLink = opp.applicationLink;
            if (applyLink && !applyLink.startsWith('http') && applyLink.includes('@')) {
                applyLink = `mailto:${applyLink}`;
            } else if (applyLink && !applyLink.startsWith('http')) {
                applyLink = `https://${applyLink}`;
            }

            html += `
                <div class="opp-card">
                    <div class="card-banner" style="background: linear-gradient(rgba(7, 18, 42, 0.4), rgba(7, 18, 42, 0.8)), url('${bgImage}') center/cover;">
                        <button class="bookmark-btn"><i class="far fa-bookmark"></i></button>
                    </div>
                    <div class="card-content">
                        <div class="card-meta">
                            <span class="org-badge"><i class="fas fa-check-circle verified"></i> ${opp.orgName}</span>
                            <span class="duration">${opp.type}</span>
                        </div>
                        <h2 class="card-title">${opp.title}</h2>
                        <div class="card-info">
                            <span><i class="fas fa-location-dot"></i> ${opp.location}, ${opp.state}</span>
                            <span class="pay-badge">${opp.stipend || 'Unpaid'}</span>
                        </div>
                        <p class="card-desc" style="display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${opp.description || ''}</p>
                        
                        <div style="font-size: 0.8rem; color: var(--gold); margin: 8px 0 12px;">
                            <i class="fas fa-calendar-alt"></i> Apply by ${deadlineStr}
                        </div>

                        <div class="skill-tags">
                            ${skillsHtml}
                        </div>
                        <div class="card-actions">
                            <a href="${applyLink}" target="_blank" class="btn btn-gold btn-full" style="text-align:center; text-decoration:none; display:flex; justify-content:center; align-items:center;">Apply Now</a>
                            <button class="btn btn-save"><i class="far fa-heart"></i> Save</button>
                        </div>
                    </div>
                </div>
            `;
        });

        oppFeed.innerHTML = DOMPurify.sanitize(html);

    } catch (err) {
        console.error("Error fetching opportunities:", err);
        oppFeed.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--danger);">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Failed to load opportunities. Please try again later.</p>
            </div>
        `;
    }
});
