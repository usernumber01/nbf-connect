import"./modulepreload-polyfill-CwuZNuQA.js";/* empty css               */import{E as e,b as t,c as n,d as r,h as i,i as a,l as o,o as s,p as c,r as l,u,v as d,w as f,y as p}from"./config-DB_8Dn9O.js";import{i as m,n as h}from"./auth-DYbDa4PS.js";import{n as g,t as _}from"./purify.es-BUgxfoD1.js";h(),a(),s(),t(),_();var v=f();document.documentElement.style.visibility=`hidden`,e(v,e=>{e?e.emailVerified?(document.documentElement.style.visibility=`visible`,document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,()=>y(e)):y(e)):window.location.href=`/login.html?error=verify-email`:window.location.href=`/login.html`}),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`sidebar-logout`),t=document.getElementById(`mobile-logout`),n=async e=>{e.preventDefault();try{await m()}catch(e){console.error(`Logout failed`,e),alert(`Failed to logout. Please try again.`)}};e&&e.addEventListener(`click`,n),t&&t.addEventListener(`click`,n)});async function y(e){try{let t=o(l,`users`,e.uid),n=await u(t),r={};n.exists()?(r=n.data(),e.emailVerified&&r.emailVerified===!1&&(await d(t,{emailVerified:!0}),r.emailVerified=!0,console.log(`Synced email verification status to Firestore.`))):console.warn(`No user profile found in Firestore.`),b(r),x(r),w(r),await Promise.all([S(r),C(e.uid)]);let i=document.getElementById(`complete-profile-btn`);i&&i.addEventListener(`click`,()=>{i.textContent=`Saving...`,i.disabled=!0,setTimeout(()=>{r.mobile=`9876543210`,r.state=`Delhi`,r.orgType=`ncc`,r.skills=[`Leadership`,`First Aid`],r.photoURL=`photo.jpg`,r.resumeURL=`resume.pdf`,r.verified=!0,b(r),x(r),S(r),document.getElementById(`profile-action`).classList.add(`hidden`)},1e3)})}catch(e){console.error(`Error initializing dashboard:`,e),alert(`Unable to load data: `+(e.message||`Please refresh.`))}}function b(e){let t=document.getElementById(`welcome-name`),n=document.getElementById(`welcome-badges`);t.textContent=`Welcome back, ${e.displayName||`Shurveer`}!`,t.classList.remove(`skeleton`,`sk-title`);let r=``;e.verified?r+=`<span class="badge green"><i class="fas fa-check-circle"></i> Verified Shurveer</span>`:r+=`<span class="badge amber"><i class="fas fa-clock"></i> Verification Pending</span>`,e.orgType&&(r+=`<span class="badge orange"><i class="fas fa-sitemap"></i> ${e.orgType.toUpperCase()}</span>`),e.state&&(r+=`<span class="badge white"><i class="fas fa-map-marker-alt"></i> ${e.state}</span>`),n.innerHTML=g.sanitize(r)}function x(e){let t=0;e.displayName&&(t+=10),e.mobile&&(t+=10),e.state&&(t+=10),e.orgType&&(t+=10),e.skills&&e.skills.length>0&&(t+=10),e.photoURL&&(t+=15),e.resumeURL&&(t+=15),(e.certificateStatus===`pending`||e.certificateStatus===`verified`)&&(t+=20);let n=document.getElementById(`profile-percent-text`),r=document.getElementById(`profile-progress-bar`),i=document.getElementById(`profile-action`);n.textContent=`${t}%`,n.classList.remove(`skeleton`,`sk-text`),r.style.width=`${t}%`,t>=100?r.style.backgroundColor=`var(--status-green)`:t>=50?r.style.backgroundColor=`var(--status-amber)`:r.style.backgroundColor=`var(--status-red)`,t<80?i.classList.remove(`hidden`):i.classList.add(`hidden`)}async function S(e){let t=document.getElementById(`opp-feed`),a=document.getElementById(`stat-opps`);if(!e.state||!e.orgType){t.innerHTML=`<p style="color: var(--text-muted); padding: 1rem;">Please complete your profile (State and Org Type) to see targeted opportunities.</p>`,a.textContent=`0`,a.classList.remove(`skeleton`,`sk-text`);return}try{let o=await r(i(n(l,`opportunities`),p(`state`,`==`,e.state),p(`orgType`,`==`,e.orgType),c(6)));if(a.textContent=o.size.toString(),a.classList.remove(`skeleton`,`sk-text`),o.empty){t.innerHTML=`<p style="color: var(--text-muted); padding: 1rem;">No opportunities in your area yet. Check back soon!</p>`;return}let s=``;o.forEach(e=>{let t=e.data();s+=`
                <div class="opp-card">
                    <h3>${t.title||`Opportunity`}</h3>
                    <div class="opp-meta">
                        <i class="fas fa-building"></i> ${t.orgName||`Organization`}
                    </div>
                    <div class="opp-meta">
                        <i class="fas fa-map-marker-alt"></i> ${t.location||`Location`}
                    </div>
                    <div class="opp-meta">
                        <i class="fas fa-calendar-alt"></i> Deadline: ${t.deadline||`TBA`}
                    </div>
                    <div class="opp-footer">
                        <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Apply Now</button>
                    </div>
                </div>
            `}),t.innerHTML=g.sanitize(s)}catch(e){console.error(`Error fetching opportunities:`,e),t.innerHTML=`<p style="color: var(--status-red);">Unable to load opportunities. Please refresh.</p>`,a.textContent=`-`,a.classList.remove(`skeleton`,`sk-text`)}}async function C(e){let t=document.getElementById(`app-feed`),a=document.getElementById(`stat-apps`);try{let o=await r(i(n(l,`applications`),p(`applicantId`,`==`,e),c(3)));if(a.textContent=o.size.toString(),a.classList.remove(`skeleton`,`sk-text`),o.empty){t.innerHTML=`<p style="color: var(--text-muted); padding: 1rem;">You haven't applied to any opportunities yet.</p>`;return}let s=``;o.forEach(e=>{let t=e.data(),n=`status-pending`,r=`Pending`;t.status===`reviewed`&&(n=`status-reviewed`,r=`Reviewed`),t.status===`accepted`&&(n=`status-accepted`,r=`Accepted`),t.status===`rejected`&&(n=`status-rejected`,r=`Rejected`);let i=`Recently`;t.appliedDate&&(i=(t.appliedDate.toDate?t.appliedDate.toDate():new Date(t.appliedDate)).toLocaleDateString()),s+=`
                <div class="app-item">
                    <div>
                        <h4 style="color: var(--navy); margin-bottom: 0.25rem;">${t.opportunityTitle||`Application`}</h4>
                        <span style="color: var(--text-muted); font-size: 0.85rem;">Applied: ${i}</span>
                    </div>
                    <div>
                        <span class="status-badge ${n}">${r}</span>
                    </div>
                </div>
            `}),t.innerHTML=g.sanitize(s)}catch(e){console.error(`Error fetching applications:`,e),t.innerHTML=`<p style="color: var(--status-red);">Unable to load applications. Please refresh.</p>`,a.textContent=`-`,a.classList.remove(`skeleton`,`sk-text`)}}function w(e){let t=document.getElementById(`cert-box`),n=e.certificateStatus||`not_uploaded`,r=``;n===`not_uploaded`?r=`
            <i class="fas fa-file-upload" style="font-size: 2.5rem; color: var(--navy-light); margin-bottom: 1rem;"></i>
            <p style="margin-bottom: 1.5rem; color: var(--text-muted);">Upload your Original certificate to get verified</p>
            <input type="file" id="cert-upload-input" accept="image/*,.pdf" style="display: none;">
            <button class="btn btn-primary" id="cert-upload-btn">Upload Certificate</button>
        `:n===`pending`?r=`
            <i class="fas fa-clock" style="font-size: 2.5rem; color: var(--status-amber); margin-bottom: 1rem;"></i>
            <p style="color: var(--status-amber); font-weight: 600;">Certificate under review by org admin</p>
        `:n===`verified`?r=`
            <i class="fas fa-check-circle" style="font-size: 2.5rem; color: var(--status-green); margin-bottom: 1rem;"></i>
            <p style="color: var(--status-green); font-weight: 600;">Certificate verified ✅</p>
        `:n===`rejected`&&(r=`
            <i class="fas fa-times-circle" style="font-size: 2.5rem; color: var(--status-red); margin-bottom: 1rem;"></i>
            <p style="color: var(--status-red); font-weight: 600; margin-bottom: 1.5rem;">Certificate rejected — please re-upload</p>
            <input type="file" id="cert-upload-input" accept="image/*,.pdf" style="display: none;">
            <button class="btn btn-primary" id="cert-upload-btn">Re-upload Certificate</button>
        `),t.innerHTML=g.sanitize(r);let i=document.getElementById(`cert-upload-btn`),a=document.getElementById(`cert-upload-input`);i&&a&&(i.addEventListener(`click`,()=>{a.click()}),a.addEventListener(`change`,t=>{if(t.target.files&&t.target.files.length>0){let n=t.target.files[0];i.textContent=`Uploading...`,i.disabled=!0,setTimeout(()=>{e.certificateStatus=`pending`,w(e),alert(`Successfully uploaded ${n.name}. It is now under review.`)},1500)}}))}