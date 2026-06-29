import{n as e,t}from"./modulepreload-polyfill-CwuZNuQA.js";/* empty css               */import{b as n,d as r,g as i,h as a,i as o,m as s,p as c,r as l,v as u,w as d}from"./config-CozLXxoY.js";import{a as f,n as p,o as m}from"./auth-DlmolhU3.js";function h(e,t){return m(n=>{n&&n.emailVerified?e(n):t?t():window.location.href=`login.html`})}var g=e((()=>{p()}));t((()=>{g(),p(),o(),r(),document.addEventListener(`DOMContentLoaded`,()=>{h(t=>{e(t)},()=>{window.location.href=`login.html`});let t=document.getElementById(`sidebar-logout`),n=document.getElementById(`mobile-logout`),r=async e=>{e.preventDefault();try{await f()}catch(e){console.error(`Logout failed`,e),alert(`Failed to logout. Please try again.`)}};t&&t.addEventListener(`click`,r),n&&n.addEventListener(`click`,r)});async function e(e){try{let n=await a(s(l,`users`,e.uid)),r={};n.exists()?r=n.data():console.warn(`No user profile found in Firestore.`),t(r),m(r),y(r),await Promise.all([_(r),v(e.uid)]);let i=document.getElementById(`complete-profile-btn`);i&&i.addEventListener(`click`,()=>{i.textContent=`Saving...`,i.disabled=!0,setTimeout(()=>{r.mobile=`9876543210`,r.state=`Delhi`,r.orgType=`ncc`,r.skills=[`Leadership`,`First Aid`],r.photoURL=`photo.jpg`,r.resumeURL=`resume.pdf`,r.verified=!0,t(r),m(r),_(r),document.getElementById(`profile-action`).classList.add(`hidden`)},1e3)})}catch(e){console.error(`Error initializing dashboard:`,e),alert(`Unable to load data. Please refresh.`)}}function t(e){let t=document.getElementById(`welcome-name`),n=document.getElementById(`welcome-badges`);t.textContent=`Welcome back, ${e.displayName||`Shurveer`}!`,t.classList.remove(`skeleton`,`sk-title`);let r=``;e.verified?r+=`<span class="badge green"><i class="fas fa-check-circle"></i> Verified Shurveer</span>`:r+=`<span class="badge amber"><i class="fas fa-clock"></i> Verification Pending</span>`,e.orgType&&(r+=`<span class="badge orange"><i class="fas fa-sitemap"></i> ${e.orgType.toUpperCase()}</span>`),e.state&&(r+=`<span class="badge white"><i class="fas fa-map-marker-alt"></i> ${e.state}</span>`),n.innerHTML=DOMPurify.sanitize(r)}function m(e){let t=0;e.displayName&&(t+=10),e.mobile&&(t+=10),e.state&&(t+=10),e.orgType&&(t+=10),e.skills&&e.skills.length>0&&(t+=10),e.photoURL&&(t+=15),e.resumeURL&&(t+=15),(e.certificateStatus===`pending`||e.certificateStatus===`verified`)&&(t+=20);let n=document.getElementById(`profile-percent-text`),r=document.getElementById(`profile-progress-bar`),i=document.getElementById(`profile-action`);n.textContent=`${t}%`,n.classList.remove(`skeleton`,`sk-text`),r.style.width=`${t}%`,t>=100?r.style.backgroundColor=`var(--status-green)`:t>=50?r.style.backgroundColor=`var(--status-amber)`:r.style.backgroundColor=`var(--status-red)`,t<80?i.classList.remove(`hidden`):i.classList.add(`hidden`)}async function _(e){let t=document.getElementById(`opp-feed`),r=document.getElementById(`stat-opps`);if(!e.state||!e.orgType){t.innerHTML=`<p style="color: var(--text-muted); padding: 1rem;">Please complete your profile (State and Org Type) to see targeted opportunities.</p>`,r.textContent=`0`,r.classList.remove(`skeleton`,`sk-text`);return}try{let a=await i(n(c(l,`opportunities`),d(`state`,`==`,e.state),d(`orgType`,`==`,e.orgType),u(6)));if(r.textContent=a.size.toString(),r.classList.remove(`skeleton`,`sk-text`),a.empty){t.innerHTML=`<p style="color: var(--text-muted); padding: 1rem;">No opportunities in your area yet. Check back soon!</p>`;return}let o=``;a.forEach(e=>{let t=e.data();o+=`
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
            `}),t.innerHTML=DOMPurify.sanitize(o)}catch(e){console.error(`Error fetching opportunities:`,e),t.innerHTML=`<p style="color: var(--status-red);">Unable to load opportunities. Please refresh.</p>`,r.textContent=`-`,r.classList.remove(`skeleton`,`sk-text`)}}async function v(e){let t=document.getElementById(`app-feed`),r=document.getElementById(`stat-apps`);try{let a=await i(n(c(l,`applications`),d(`applicantId`,`==`,e),u(3)));if(r.textContent=a.size.toString(),r.classList.remove(`skeleton`,`sk-text`),a.empty){t.innerHTML=`<p style="color: var(--text-muted); padding: 1rem;">You haven't applied to any opportunities yet.</p>`;return}let o=``;a.forEach(e=>{let t=e.data(),n=`status-pending`,r=`Pending`;t.status===`reviewed`&&(n=`status-reviewed`,r=`Reviewed`),t.status===`accepted`&&(n=`status-accepted`,r=`Accepted`),t.status===`rejected`&&(n=`status-rejected`,r=`Rejected`);let i=`Recently`;t.appliedDate&&(i=(t.appliedDate.toDate?t.appliedDate.toDate():new Date(t.appliedDate)).toLocaleDateString()),o+=`
                <div class="app-item">
                    <div>
                        <h4 style="color: var(--navy); margin-bottom: 0.25rem;">${t.opportunityTitle||`Application`}</h4>
                        <span style="color: var(--text-muted); font-size: 0.85rem;">Applied: ${i}</span>
                    </div>
                    <div>
                        <span class="status-badge ${n}">${r}</span>
                    </div>
                </div>
            `}),t.innerHTML=DOMPurify.sanitize(o)}catch(e){console.error(`Error fetching applications:`,e),t.innerHTML=`<p style="color: var(--status-red);">Unable to load applications. Please refresh.</p>`,r.textContent=`-`,r.classList.remove(`skeleton`,`sk-text`)}}function y(e){let t=document.getElementById(`cert-box`),n=e.certificateStatus||`not_uploaded`,r=``;n===`not_uploaded`?r=`
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
        `),t.innerHTML=DOMPurify.sanitize(r);let i=document.getElementById(`cert-upload-btn`),a=document.getElementById(`cert-upload-input`);i&&a&&(i.addEventListener(`click`,()=>{a.click()}),a.addEventListener(`change`,t=>{if(t.target.files&&t.target.files.length>0){let n=t.target.files[0];i.textContent=`Uploading...`,i.disabled=!0,setTimeout(()=>{e.certificateStatus=`pending`,y(e),alert(`Successfully uploaded ${n.name}. It is now under review.`)},1500)}}))}}))();