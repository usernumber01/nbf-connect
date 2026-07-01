import{t as e}from"./modulepreload-polyfill-CwuZNuQA.js";/* empty css               */import{E as t,b as n,c as r,d as i,h as a,i as o,m as s,o as c,r as l,t as u}from"./config-DB_8Dn9O.js";import{n as d,t as f}from"./purify.es-BUgxfoD1.js";var p=e((()=>{o(),f(),c(),n(),document.addEventListener(`DOMContentLoaded`,()=>{t(u,async e=>{if(!e){window.location.href=`./login.html`;return}let t=document.getElementById(`partners-table-body`);if(t)try{let e=await i(a(r(l,`partners`),s(`submittedAt`,`desc`)));if(e.empty){t.innerHTML=`<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No partner requests found.</td></tr>`;return}let n=``;e.forEach(e=>{let t=e.data(),r=`status pending`,i=`Pending`;t.status===`verified`||t.status===`active`?(r=`status active`,i=`Verified`):t.status===`rejected`&&(r=`status flagged`,i=`Rejected`);let a=t.companyName||`Unknown`,o=t.contactPerson||`Unknown`,s=t.industry||`-`,c=t.numberOfShurveers||`0`,l=t.fileURL?`<a href="${t.fileURL}" target="_blank" class="tbl-btn" title="View Requirements File"><i class="fas fa-file-pdf"></i></a>`:`<button class="tbl-btn" disabled style="opacity: 0.3"><i class="fas fa-file-pdf"></i></button>`;n+=`
                <tr>
                    <td><strong>${a}</strong><br><small style="color:var(--text-muted)">${t.email||``}</small></td>
                    <td>${o}<br><small style="color:var(--text-muted)">${t.phone||``}</small></td>
                    <td>${s}</td>
                    <td>${c}</td>
                    <td><span class="${r}">${i}</span></td>
                    <td>
                        <button class="tbl-btn" title="View Details"><i class="fas fa-eye"></i></button>
                        ${l}
                        <button class="tbl-btn red" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `}),t.innerHTML=d.sanitize(n)}catch(e){console.error(`Error fetching partners:`,e),t.innerHTML=`<tr><td colspan="6" style="text-align:center; padding:2rem; color:#ef4444;">Failed to load partners database. Check Firebase rules.</td></tr>`}})})})),m=e((()=>{o(),c(),n(),document.addEventListener(`DOMContentLoaded`,()=>{t(u,async e=>{if(!e)return;let t=document.getElementById(`users-table-body`);if(t)try{let e=await i(a(r(l,`users`),s(`createdAt`,`desc`)));if(e.empty){t.innerHTML=`<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No users found.</td></tr>`;return}let n=``;e.forEach(e=>{let t=e.data(),r=`shurveer`,i=`Shurveer`;t.role===`partner`?(r=`partner`,i=`Partner`):(t.role===`org_admin`||t.role===`admin`)&&(r=`shurveer`,i=`Admin`);let a=t.verified?`status active`:`status pending`,o=t.verified?`Verified`:`Pending`,s=(t.createdAt?new Date(t.createdAt):new Date).toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`}),c=t.displayName||`Unknown User`,l=t.email||`No Email`,u=t.state||`-`,d=[`f49f1c`,`10b981`,`3b82f6`,`a855f7`,`ef4444`],f=d[c.length%d.length],p=`https://ui-avatars.com/api/?name=${encodeURIComponent(c)}&background=${f}&color=fff`;n+=`
                    <tr>
                        <td><div class="td-user"><img src="${p}">${c}</div></td>
                        <td>${l}</td>
                        <td><span class="tag ${r}">${i}</span></td>
                        <td>${u}</td>
                        <td><span class="${a}">${o}</span></td>
                        <td>${s}</td>
                        <td>
                            <button class="tbl-btn" title="View"><i class="fas fa-eye"></i></button>
                            <button class="tbl-btn red" title="Block"><i class="fas fa-ban"></i></button>
                        </td>
                    </tr>
                `}),t.innerHTML=n}catch(e){console.error(`Error fetching users:`,e),t.innerHTML=`<tr><td colspan="7" style="text-align:center; padding:2rem; color:#ef4444;">Error loading users. Permissions issue?</td></tr>`}})})}));p(),m();