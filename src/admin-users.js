import { auth, db } from "./firebase/config.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        if (!user) return;

        const tableBody = document.getElementById("users-table-body");
        if (!tableBody) return;

        try {
            const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No users found.</td></tr>`;
                return;
            }

            let html = "";
            snapshot.forEach((doc) => {
                const data = doc.data();
                
                // Format role
                let roleTag = "shurveer";
                let roleText = "Shurveer";
                if (data.role === "partner") {
                    roleTag = "partner";
                    roleText = "Partner";
                } else if (data.role === "org_admin" || data.role === "admin") {
                    roleTag = "shurveer"; // Reusing color class
                    roleText = "Admin";
                }

                // Format status
                let statusClass = data.verified ? "status active" : "status pending";
                let statusText = data.verified ? "Verified" : "Pending";

                // Format date
                const dateObj = data.createdAt ? new Date(data.createdAt) : new Date();
                const joinedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

                // Fallbacks
                const name = data.displayName || "Unknown User";
                const email = data.email || "No Email";
                const state = data.state || "-";

                // Generate avatar color
                const colors = ["f49f1c", "10b981", "3b82f6", "a855f7", "ef4444"];
                const color = colors[name.length % colors.length];
                const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff`;

                html += `
                    <tr>
                        <td><div class="td-user"><img src="${avatar}">${name}</div></td>
                        <td>${email}</td>
                        <td><span class="tag ${roleTag}">${roleText}</span></td>
                        <td>${state}</td>
                        <td><span class="${statusClass}">${statusText}</span></td>
                        <td>${joinedDate}</td>
                        <td>
                            <button class="tbl-btn" title="View"><i class="fas fa-eye"></i></button>
                            <button class="tbl-btn red" title="Block"><i class="fas fa-ban"></i></button>
                        </td>
                    </tr>
                `;
            });

            tableBody.innerHTML = html;

        } catch (error) {
            console.error("Error fetching users:", error);
            tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:#ef4444;">Error loading users. Permissions issue?</td></tr>`;
        }
    });
});
