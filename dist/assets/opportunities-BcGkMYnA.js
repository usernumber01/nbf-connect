import{t as e}from"./modulepreload-polyfill-CwuZNuQA.js";/* empty css               *//* empty css               */import{_ as t,b as n,n as r,p as i,r as a,u as o,x as s}from"./config-Dd28I3sq.js";var c=e(((e,t)=>{t.exports={}})),l=e((()=>{var e=c(),t=c(),n=`c:/Users/kalav/Desktop/krishna/project/site 2`;function r(n){if(!e.existsSync(n))return;let r=e.readFileSync(n,`utf8`);r=r.replace(/--bg-dark:\s*#[0-9a-fA-F]+;/g,`--bg-dark: #f5f5f0;`),r=r.replace(/--bg-card:\s*#[0-9a-fA-F]+;/g,`--bg-card: #ffffff;`),r=r.replace(/--bg-input:\s*#[0-9a-fA-F]+;/g,`--bg-input: #ffffff;`),r=r.replace(/--border-color:\s*#[0-9a-fA-F]+;/g,`--border-color: #e0e0e0;`),r=r.replace(/--text-primary:\s*#[0-9a-fA-F]+;/g,`--text-primary: #333333;`),r=r.replace(/--text-secondary:\s*#[0-9a-fA-F]+;/g,`--text-secondary: #555555;`),r=r.replace(/--text-muted:\s*#[0-9a-fA-F]+;/g,`--text-muted: #888888;`),r=r.replace(/border:\s*1px\s*solid\s*var\(--border-color\);/g,`border: 1.5px solid var(--border-color);`),r=r.replace(/border-color:\s*var\(--gold\);/g,`border-color: #1a3a5c;`),r=r.replace(/box-shadow:\s*0\s*0\s*0\s*3px\s*rgba\(244,\s*159,\s*28,\s*0\.1\).*?;/g,`box-shadow: 0 0 0 3px rgba(26, 58, 92, 0.1);`),r=r.replace(/color:\s*var\(--gold\);/g,`color: #1a3a5c;`),r=r.replace(/border-color:\s*#1a3a5c;/g,`border-color: var(--gold);`),r=r.replace(/color:\s*#1a3a5c;/g,`color: var(--gold);`),r=r.replace(/\.input-wrapper\s*input:focus\s*{[^}]*}/g,`.input-wrapper input:focus {
    border-color: #1a3a5c;
    box-shadow: 0 0 0 3px rgba(26, 58, 92, 0.1);
}`),r=r.replace(/\.input-wrapper\s*select:focus\s*{[^}]*}/g,`.input-wrapper select:focus {
    border-color: #1a3a5c;
    box-shadow: 0 0 0 3px rgba(26, 58, 92, 0.1);
}`),r=r.replace(/\.input-wrapper\s*input:focus\s*(~|\+)\s*\.input-icon[\s\S]*?{.*?}/g,`.input-wrapper input:focus $1 .input-icon {
    color: #1a3a5c;
}`),r=r.replace(/\.input-wrapper\s*select:focus\s*(~|\+)\s*\.input-icon[\s\S]*?{.*?}/g,`.input-wrapper select:focus $1 .input-icon {
    color: #1a3a5c;
}`),r=r.replace(/\.input-wrapper\s*input[\s\S]*?{([^}]*)}/g,function(e,t){return e.includes(`:focus`)||e.includes(`::placeholder`)?e:`.input-wrapper input, .input-wrapper select {${t.replace(/color:\s*var\(--text-primary\);/g,`color: #222222;`)}}`}),r=r.replace(/\.login-form-section\s*{([^}]*)}/g,function(e,t){return e.replace(/background:\s*var\(--bg-dark\);/g,`background: #ffffff;`)}),r=r.replace(/\.register-form-section\s*{([^}]*)}/g,function(e,t){return e.replace(/background:\s*var\(--bg-dark\);/g,`background: #ffffff;`)}),r+=`
/* Force Hero text to white */
.hero-content .hero-quote,
.hero-content .hero-heading,
.hero-content .logo-text,
.hero-logo .logo-text { color: #ffffff !important; }
.hero-content .hero-tagline,
.hero-content .hero-desc,
.hero-content .hero-badge,
.hero-content .stat-num,
.hero-content .stat-label { color: rgba(255,255,255,0.9) !important; }
.hero-content .stat-num { color: var(--gold) !important; }

/* Force Form Headings */
.login-title, .form-title { color: #1a3a5c; }
.form-section-label { color: #1a3a5c; border-bottom-color: rgba(26,58,92,0.1); }
.form-group label { color: #444444; font-weight: 600; }
.input-wrapper input::placeholder, .input-wrapper select option:first-child { color: #999999; }
.input-icon, .input-prefix { color: #888888; }
.input-wrapper input, .input-wrapper select { border: 1.5px solid #e0e0e0; color: #222222; background: #ffffff; }

/* Role cards (Login) */
.role-card { background: #ffffff; border-color: #e0e0e0; }
.role-card .role-name { color: #555555; }
.role-card:hover { background: #f9f9f9; border-color: #cccccc; }
.role-card.active { border-color: #1a3a5c; background: #f0f4f8; box-shadow: none; }
.role-card.active .role-icon { background: #1a3a5c; box-shadow: none; }
.role-card.active .role-name { color: #1a3a5c; }

/* Skill chips (Register / Partner) */
.skill-chip span { background: #f5f5f5; border-color: #e0e0e0; color: #555555; }
.skill-chip input:checked + span { background: #fff4ed; border-color: #e05a1e; color: #e05a1e; box-shadow: none; }
.skill-chip:hover span { background: #f9f9f9; border-color: #cccccc; }

/* File upload */
.file-upload { background: #fcfcfc; border-color: #e0e0e0; }
.file-upload .file-label { color: #444444; }

/* Declarations */
.checkbox-wrapper, .declaration-box { background: #f9f9f9 !important; border-color: #e0e0e0 !important; }
.checkbox-text, .declaration-box label { color: #333333 !important; }
`,e.writeFileSync(n,r,`utf8`),console.log(`Updated ${t.basename(n)}`)}function i(n){if(!e.existsSync(n))return;let r=e.readFileSync(n,`utf8`);r=r.replace(/textarea\s*{([^}]*)}/g,function(e,t){let n=t.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g,`background: #ffffff;`);return n=n.replace(/border:\s*1\.5px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.1\);/g,`border: 1.5px solid #e0e0e0;`),n=n.replace(/color:\s*#ffffff;/g,`color: #222222;`),`textarea {${n}}`}),r=r.replace(/textarea:focus\s*{([^}]*)}/g,function(e,t){return`textarea:focus { border-color: #1a3a5c; outline: none; box-shadow: 0 0 0 3px rgba(26,58,92,0.1); }`}),r=r.replace(/\.declaration-box\s*{([^}]*)}/g,function(e,t){let n=t.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.15\);/g,`border: 1px solid #e0e0e0;`);return n=n.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.02\);/g,`background: #f9f9f9;`),`.declaration-box {${n}}`}),r=r.replace(/\.declaration-box\s*label\s*{([^}]*)}/g,function(e,t){return`.declaration-box label {${t.replace(/color:\s*#cbd5e1;/g,`color: #333333;`)}}`}),r=r.replace(/\.character-counter\s*{([^}]*)}/g,function(e,t){return`.character-counter {${t.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.6\);/g,`color: #888888;`)}}`}),r.includes(`password-meter`)&&(r=r.replace(/\.password-meter-container\s*{([^}]*)}/g,function(e,t){let n=t.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g,`background: #f5f5f5;`);return n=n.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.1\);/g,`border: 1px solid #e0e0e0;`),`.password-meter-container {${n}}`}),r=r.replace(/\.req-item\s*{([^}]*)}/g,function(e,t){return`.req-item {${t.replace(/color:\s*var\(--text-muted\);/g,`color: #888888;`)}}`}),r=r.replace(/\.req-item\.met\s*{([^}]*)}/g,function(e,t){return`.req-item.met {${t.replace(/color:\s*var\(--green\);/g,`color: #22c55e;`)}}`})),e.writeFileSync(n,r,`utf8`),console.log(`Updated inline styles in ${t.basename(n)}`)}[`login.css`,`register.css`].forEach(e=>r(t.join(n,e))),[`partnershipsignup.html`,`register.html`,`login.html`].forEach(e=>i(t.join(n,e)))})),u=e((()=>{a(),o(),document.addEventListener(`DOMContentLoaded`,async()=>{let e=document.getElementById(`opp-feed`);try{let a=await i(t(s(r,`opportunities`),n(`status`,`==`,`active`)));if(a.empty){e.innerHTML=`
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted); background: var(--card-bg); border-radius: var(--radius); border: 1px solid var(--border);">
                    <i class="fas fa-box-open" style="font-size: 3rem; color: rgba(255,255,255,0.1); margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.1rem;">No opportunities posted yet.</p>
                    <p style="font-size: 0.9rem; margin-top: 4px;">Check back soon or post one!</p>
                </div>
            `;return}let o=[];a.forEach(e=>{o.push({id:e.id,...e.data()})}),o.sort((e,t)=>new Date(t.postedAt)-new Date(e.postedAt));let c=``;o.forEach(e=>{let t=e.deadline;t&&=new Date(t).toLocaleDateString(`en-IN`,{day:`2-digit`,month:`short`,year:`numeric`});let n=``;e.skillsRequired&&e.skillsRequired.length>0&&(e.skillsRequired.slice(0,3).forEach(e=>{n+=`<span class="tag">${e}</span>`}),e.skillsRequired.length>3&&(n+=`<span class="tag">+${e.skillsRequired.length-3}</span>`));let r=e.applicationLink;r&&!r.startsWith(`http`)&&r.includes(`@`)?r=`mailto:${r}`:r&&!r.startsWith(`http`)&&(r=`https://${r}`),c+=`
                <div class="opp-card">
                    <div class="card-banner" style="background: linear-gradient(rgba(7, 18, 42, 0.4), rgba(7, 18, 42, 0.8)), url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center/cover;">
                        <button class="bookmark-btn"><i class="far fa-bookmark"></i></button>
                    </div>
                    <div class="card-content">
                        <div class="card-meta">
                            <span class="org-badge"><i class="fas fa-check-circle verified"></i> ${e.orgName}</span>
                            <span class="duration">${e.type}</span>
                        </div>
                        <h2 class="card-title">${e.title}</h2>
                        <div class="card-info">
                            <span><i class="fas fa-location-dot"></i> ${e.location}, ${e.state}</span>
                            <span class="pay-badge">${e.stipend||`Unpaid`}</span>
                        </div>
                        <p class="card-desc" style="display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${e.description||``}</p>
                        
                        <div style="font-size: 0.8rem; color: var(--gold); margin: 8px 0 12px;">
                            <i class="fas fa-calendar-alt"></i> Apply by ${t}
                        </div>

                        <div class="skill-tags">
                            ${n}
                        </div>
                        <div class="card-actions">
                            <a href="${r}" target="_blank" class="btn btn-gold btn-full" style="text-align:center; text-decoration:none; display:flex; justify-content:center; align-items:center;">Apply Now</a>
                            <button class="btn btn-save"><i class="far fa-heart"></i> Save</button>
                        </div>
                    </div>
                </div>
            `}),e.innerHTML=DOMPurify.sanitize(c)}catch(t){console.error(`Error fetching opportunities:`,t),e.innerHTML=`
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--danger);">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>Failed to load opportunities. Please try again later.</p>
            </div>
        `}})}));l(),u();