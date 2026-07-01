import { auth, db } from "./firebase/config.js";
import DOMPurify from "dompurify";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = './login.html';
            return;
        }

        const tableBody = document.getElementById("partners-table-body");
    if (!tableBody) return;

    try {
        const q = query(collection(db, "partners"), orderBy("submittedAt", "desc"));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No partner requests found.</td></tr>`;
            return;
        }

        let html = "";
        snapshot.forEach((doc) => {
            const data = doc.data();
            
            // Format status
            let statusClass = "status pending";
            let statusText = "Pending";
            if (data.status === "verified" || data.status === "active") {
                statusClass = "status active";
                statusText = "Verified";
            } else if (data.status === "rejected") {
                statusClass = "status flagged";
                statusText = "Rejected";
            }

            // Fallbacks
            const company = data.companyName || "Unknown";
            const contact = data.contactPerson || "Unknown";
            const industry = data.industry || "-";
            const hired = data.numberOfShurveers || "0";
            
            let fileBtn = data.fileURL 
                ? `<a href="${data.fileURL}" target="_blank" class="tbl-btn" title="View Requirements File"><i class="fas fa-file-pdf"></i></a>` 
                : `<button class="tbl-btn" disabled style="opacity: 0.3"><i class="fas fa-file-pdf"></i></button>`;

            html += `
                <tr>
                    <td><strong>${company}</strong><br><small style="color:var(--text-muted)">${data.email || ''}</small></td>
                    <td>${contact}<br><small style="color:var(--text-muted)">${data.phone || ''}</small></td>
                    <td>${industry}</td>
                    <td>${hired}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="tbl-btn" title="View Details"><i class="fas fa-eye"></i></button>
                        ${fileBtn}
                        <button class="tbl-btn red" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });

        tableBody.innerHTML = DOMPurify.sanitize(html);
        
        } catch (error) {
            console.error("Error fetching partners:", error);
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#ef4444;">Failed to load partners database. Check Firebase rules.</td></tr>`;
        }
    });
});
