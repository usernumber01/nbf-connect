import{t as e}from"./modulepreload-polyfill-CwuZNuQA.js";/* empty css               */import{E as t,S as n,_ as r,d as i,i as a,j as o,m as s,r as c,t as l,v as u}from"./config-Do0BULPT.js";e((()=>{a(),i(),t(),document.addEventListener(`DOMContentLoaded`,()=>{o(l,async e=>{if(!e){window.location.href=`./login.html`;return}let t=document.getElementById(`partners-table-body`);if(t)try{let e=await s(u(n(c,`partners`),r(`submittedAt`,`desc`)));if(e.empty){t.innerHTML=`<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No partner requests found.</td></tr>`;return}let i=``;e.forEach(e=>{let t=e.data(),n=`status pending`,r=`Pending`;t.status===`verified`||t.status===`active`?(n=`status active`,r=`Verified`):t.status===`rejected`&&(n=`status flagged`,r=`Rejected`);let a=t.companyName||`Unknown`,o=t.contactPerson||`Unknown`,s=t.industry||`-`,c=t.numberOfShurveers||`0`,l=t.fileURL?`<a href="${t.fileURL}" target="_blank" class="tbl-btn" title="View Requirements File"><i class="fas fa-file-pdf"></i></a>`:`<button class="tbl-btn" disabled style="opacity: 0.3"><i class="fas fa-file-pdf"></i></button>`;i+=`
                <tr>
                    <td><strong>${a}</strong><br><small style="color:var(--text-muted)">${t.email||``}</small></td>
                    <td>${o}<br><small style="color:var(--text-muted)">${t.phone||``}</small></td>
                    <td>${s}</td>
                    <td>${c}</td>
                    <td><span class="${n}">${r}</span></td>
                    <td>
                        <button class="tbl-btn" title="View Details"><i class="fas fa-eye"></i></button>
                        ${l}
                        <button class="tbl-btn red" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `}),t.innerHTML=DOMPurify.sanitize(i)}catch(e){console.error(`Error fetching partners:`,e),t.innerHTML=`<tr><td colspan="6" style="text-align:center; padding:2rem; color:#ef4444;">Failed to load partners database. Check Firebase rules.</td></tr>`}})})}))();