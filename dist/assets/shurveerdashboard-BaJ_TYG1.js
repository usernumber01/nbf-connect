import"./modulepreload-polyfill-CwuZNuQA.js";/* empty css               */import{b as e,d as t,g as n,h as r,i,m as a,p as o,r as s,v as c,w as l}from"./config-CozLXxoY.js";import{a as u,n as d,o as f}from"./auth-DlmolhU3.js";d();function p(e,t){return f(n=>{n&&n.emailVerified?e(n):t?t():window.location.href=`login.html`})}d(),i(),t(),document.addEventListener(`DOMContentLoaded`,()=>{p(e=>{m(e)},()=>{window.location.href=`login.html`});let e=document.getElementById(`sidebar-logout`),t=document.getElementById(`mobile-logout`),n=async e=>{e.preventDefault();try{await u()}catch(e){console.error(`Logout failed`,e),alert(`Failed to logout. Please try again.`)}};e&&e.addEventListener(`click`,n),t&&t.addEventListener(`click`,n)});async function m(e){try{let t=await r(a(s,`users`,e.uid)),n={};t.exists()?n=t.data():console.warn(`No user profile found in Firestore.`),h(n),g(n),y(n),await Promise.all([_(n),v(e.uid)]);let i=document.getElementById(`complete-profile-btn`);i&&i.addEventListener(`click`,()=>{i.textContent=`Saving...`,i.disabled=!0,setTimeout(()=>{n.mobile=`9876543210`,n.state=`Delhi`,n.orgType=`ncc`,n.skills=[`Leadership`,`First Aid`],n.photoURL=`photo.jpg`,n.resumeURL=`resume.pdf`,n.verified=!0,h(n),g(n),_(n),document.getElementById(`profile-action`).classList.add(`hidden`)},1e3)})}catch(e){console.error(`Error initializing dashboard:`,e),alert(`Unable to load data. Please refresh.`)}}function h(e){let t=document.getElementById(`welcome-name`),n=document.getElementById(`welcome-badges`);t.textContent=`Welcome back, ${e.displayName||`Shurveer`}!`,t.classList.remove(`skeleton`,`sk-title`);let r=``;e.verified?r+=`<span class="badge green"><i class="fas fa-check-circle"></i> Verified Shurveer</span>`:r+=`<span class="badge amber"><i class="fas fa-clock"></i> Verification Pending</span>`,e.orgType&&(r+=`<span class="badge orange"><i class="fas fa-sitemap"></i> ${e.orgType.toUpperCase()}</span>`),e.state&&(r+=`<span class="badge white"><i class="fas fa-map-marker-alt"></i> ${e.state}</span>`),n.innerHTML=DOMPurify.sanitize(r)}function g(e){let t=0;e.displayName&&(t+=10),e.mobile&&(t+=10),e.state&&(t+=10),e.orgType&&(t+=10),e.skills&&e.skills.length>0&&(t+=10),e.photoURL&&(t+=15),e.resumeURL&&(t+=15),(e.certificateStatus===`pending`||e.certificateStatus===`verified`)&&(t+=20);let n=document.getElementById(`profile-percent-text`),r=document.getElementById(`profile-progress-bar`),i=document.getElementById(`profile-action`);n.textContent=`${t}%`,n.classList.remove(`skeleton`,`sk-text`),r.style.width=`${t}%`,t>=100?r.style.backgroundColor=`var(--status-green)`:t>=50?r.style.backgroundColor=`var(--status-amber)`:r.style.backgroundColor=`var(--status-red)`,t<80?i.classList.remove(`hidden`):i.classList.add(`hidden`)}async function _(t){let r=document.getElementById(`opp-feed`),i=document.getElementById(`stat-opps`);if(!t.state||!t.orgType){r.innerHTML=`<p style="color: var(--text-muted); padding: 1rem;">Please complete your profile (State and Org Type) to see targeted opportunities.</p>`,i.textContent=`0`,i.classList.remove(`skeleton`,`sk-text`);return}try{let a=await n(e(o(s,`opportunities`),l(`state`,`==`,t.state),l(`orgType`,`==`,t.orgType),c(6)));if(i.textContent=a.size.toString(),i.classList.remove(`skeleton`,`sk-text`),a.empty){r.innerHTML=`<p style="color: var(--text-muted); padding: 1rem;">No opportunities in your area yet. Check back soon!</p>`;return}let u=``;a.forEach(e=>{let t=e.data();u+=`
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
            `}),r.innerHTML=DOMPurify.sanitize(u)}catch(e){console.error(`Error fetching opportunities:`,e),r.innerHTML=`<p style="color: var(--status-red);">Unable to load opportunities. Please refresh.</p>`,i.textContent=`-`,i.classList.remove(`skeleton`,`sk-text`)}}async function v(t){let r=document.getElementById(`app-feed`),i=document.getElementById(`stat-apps`);try{let a=await n(e(o(s,`applications`),l(`applicantId`,`==`,t),c(3)));if(i.textContent=a.size.toString(),i.classList.remove(`skeleton`,`sk-text`),a.empty){r.innerHTML=`<p style="color: var(--text-muted); padding: 1rem;">You haven't applied to any opportunities yet.</p>`;return}let u=``;a.forEach(e=>{let t=e.data(),n=`status-pending`,r=`Pending`;t.status===`reviewed`&&(n=`status-reviewed`,r=`Reviewed`),t.status===`accepted`&&(n=`status-accepted`,r=`Accepted`),t.status===`rejected`&&(n=`status-rejected`,r=`Rejected`);let i=`Recently`;t.appliedDate&&(i=(t.appliedDate.toDate?t.appliedDate.toDate():new Date(t.appliedDate)).toLocaleDateString()),u+=`
                <div class="app-item">
                    <div>
                        <h4 style="color: var(--navy); margin-bottom: 0.25rem;">${t.opportunityTitle||`Application`}</h4>
                        <span style="color: var(--text-muted); font-size: 0.85rem;">Applied: ${i}</span>
                    </div>
                    <div>
                        <span class="status-badge ${n}">${r}</span>
                    </div>
                </div>
            `}),r.innerHTML=DOMPurify.sanitize(u)}catch(e){console.error(`Error fetching applications:`,e),r.innerHTML=`<p style="color: var(--status-red);">Unable to load applications. Please refresh.</p>`,i.textContent=`-`,i.classList.remove(`skeleton`,`sk-text`)}}function y(e){let t=document.getElementById(`cert-box`),n=e.certificateStatus||`not_uploaded`,r=``;n===`not_uploaded`?r=`
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
        `),t.innerHTML=DOMPurify.sanitize(r);let i=document.getElementById(`cert-upload-btn`),a=document.getElementById(`cert-upload-input`);i&&a&&(i.addEventListener(`click`,()=>{a.click()}),a.addEventListener(`change`,t=>{if(t.target.files&&t.target.files.length>0){let n=t.target.files[0];i.textContent=`Uploading...`,i.disabled=!0,setTimeout(()=>{e.certificateStatus=`pending`,y(e),alert(`Successfully uploaded ${n.name}. It is now under review.`)},1500)}}))}