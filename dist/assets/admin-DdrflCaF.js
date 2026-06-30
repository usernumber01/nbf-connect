import{t as e}from"./modulepreload-polyfill-CwuZNuQA.js";/* empty css               */import{T as t,b as n,d as r,g as i,i as a,j as o,p as s,r as c,t as l,y as u}from"./config-Ccvb54z9.js";e((()=>{a(),r(),t(),document.addEventListener(`DOMContentLoaded`,()=>{o(l,async e=>{if(!e){window.location.href=`./login.html`;return}let t=document.getElementById(`partners-table-body`);if(t)try{let e=await i(n(s(c,`partners`),u(`submittedAt`,`desc`)));if(e.empty){t.innerHTML=`<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No partner requests found.</td></tr>`;return}let r=``;e.forEach(e=>{let t=e.data(),n=`status pending`,i=`Pending`;t.status===`verified`||t.status===`active`?(n=`status active`,i=`Verified`):t.status===`rejected`&&(n=`status flagged`,i=`Rejected`);let a=t.companyName||`Unknown`,o=t.contactPerson||`Unknown`,s=t.industry||`-`,c=t.numberOfShurveers||`0`,l=t.fileURL?`<a href="${t.fileURL}" target="_blank" class="tbl-btn" title="View Requirements File"><i class="fas fa-file-pdf"></i></a>`:`<button class="tbl-btn" disabled style="opacity: 0.3"><i class="fas fa-file-pdf"></i></button>`;r+=`
                <tr>
                    <td><strong>${a}</strong><br><small style="color:var(--text-muted)">${t.email||``}</small></td>
                    <td>${o}<br><small style="color:var(--text-muted)">${t.phone||``}</small></td>
                    <td>${s}</td>
                    <td>${c}</td>
                    <td><span class="${n}">${i}</span></td>
                    <td>
                        <button class="tbl-btn" title="View Details"><i class="fas fa-eye"></i></button>
                        ${l}
                        <button class="tbl-btn red" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `}),t.innerHTML=DOMPurify.sanitize(r)}catch(e){console.error(`Error fetching partners:`,e),t.innerHTML=`<tr><td colspan="6" style="text-align:center; padding:2rem; color:#ef4444;">Failed to load partners database. Check Firebase rules.</td></tr>`}})})}))();