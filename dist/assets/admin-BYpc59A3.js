import{t as e}from"./modulepreload-polyfill-CwuZNuQA.js";/* empty css               */import{A as t,T as n,b as r,d as i,g as a,i as o,p as s,r as c,t as l,y as u}from"./config-CozLXxoY.js";e((()=>{o(),i(),n(),document.addEventListener(`DOMContentLoaded`,()=>{t(l,async e=>{if(!e){window.location.href=`./login.html`;return}let t=document.getElementById(`partners-table-body`);if(t)try{let e=await a(r(s(c,`partners`),u(`submittedAt`,`desc`)));if(e.empty){t.innerHTML=`<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No partner requests found.</td></tr>`;return}let n=``;e.forEach(e=>{let t=e.data(),r=`status pending`,i=`Pending`;t.status===`verified`||t.status===`active`?(r=`status active`,i=`Verified`):t.status===`rejected`&&(r=`status flagged`,i=`Rejected`);let a=t.companyName||`Unknown`,o=t.contactPerson||`Unknown`,s=t.industry||`-`,c=t.numberOfShurveers||`0`,l=t.fileURL?`<a href="${t.fileURL}" target="_blank" class="tbl-btn" title="View Requirements File"><i class="fas fa-file-pdf"></i></a>`:`<button class="tbl-btn" disabled style="opacity: 0.3"><i class="fas fa-file-pdf"></i></button>`;n+=`
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
            `}),t.innerHTML=DOMPurify.sanitize(n)}catch(e){console.error(`Error fetching partners:`,e),t.innerHTML=`<tr><td colspan="6" style="text-align:center; padding:2rem; color:#ef4444;">Failed to load partners database. Check Firebase rules.</td></tr>`}})})}))();