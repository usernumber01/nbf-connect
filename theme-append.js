const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/kalav/Desktop/krishna/project/site 2';

const overrides = `
/* ========================================= */
/* LIGHT THEME OVERRIDES (Appended manually) */
/* ========================================= */

:root {
    --bg-dark: #f5f5f0;
    --bg-card: #ffffff;
    --bg-input: #ffffff;
    --border-color: #e0e0e0;
    --text-primary: #333333;
    --text-secondary: #555555;
    --text-muted: #888888;
}

body { background-color: #f5f5f0; }

.login-form-section, .register-form-section { background: #ffffff; }

.login-form-section::before, .register-form-section::before {
    background: linear-gradient(to bottom, transparent, rgba(224, 90, 30, 0.2), transparent);
}

.input-wrapper input, .input-wrapper select {
    border: 1.5px solid #e0e0e0;
    background: #ffffff;
    color: #222222;
}

.input-wrapper input:focus, .input-wrapper select:focus {
    border-color: #1a3a5c;
    box-shadow: 0 0 0 3px rgba(26, 58, 92, 0.1);
}

.input-wrapper input:focus ~ .input-icon,
.input-wrapper select:focus ~ .input-icon {
    color: #1a3a5c;
}

.input-wrapper input::placeholder, .input-wrapper select option:first-child { color: #999999; }
.input-icon, .input-prefix { color: #888888; }

.form-group label { color: #444444; font-weight: 600; }
.login-title, .form-title { color: #1a3a5c; }
.form-section-label { color: #1a3a5c; border-bottom-color: rgba(26,58,92,0.1); }

/* Role cards */
.role-cards { grid-template-columns: repeat(2, 1fr); }
.role-card { background: #ffffff; border-color: #e0e0e0; }
.role-card .role-name { color: #555555; }
.role-card:hover { background: #f9f9f9; border-color: #cccccc; }
.role-card.active { border-color: #1a3a5c; background: #f0f4f8; box-shadow: none; }
.role-card.active .role-icon { background: #1a3a5c; box-shadow: none; }
.role-card.active .role-icon i { color: #ffffff; }
.role-card.active .role-name { color: #1a3a5c; }

/* Back Home Button */
.back-home {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    color: #333333;
}
.back-home:hover {
    background: #fff4ed;
    color: var(--gold);
    border-color: rgba(244, 159, 28, 0.3);
}

/* Social Buttons */
.btn-social {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    color: #555555;
}
.btn-social:hover {
    background: #f9f9f9;
    color: #1a3a5c;
    border-color: #cccccc;
}

/* Fix Hero text colors to stay white */
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

/* Buttons text color */
.btn-login, .btn-register, .btn-primary {
    color: #ffffff !important;
}

/* Skill chips */
.skill-chip span { background: #f5f5f5; border-color: #e0e0e0; color: #555555; }
.skill-chip input:checked + span { background: #fff4ed; border-color: #e05a1e; color: #e05a1e; box-shadow: none; }
.skill-chip:hover span { background: #f9f9f9; border-color: #cccccc; }

/* File upload */
.file-upload { background: #fcfcfc; border-color: #e0e0e0; }
.file-upload .file-label { color: #444444; }

/* Checkboxes */
.checkbox-wrapper, .declaration-box { background: #f9f9f9 !important; border-color: #e0e0e0 !important; }
.checkbox-text, .declaration-box label { color: #333333 !important; }

/* Additional tweaks */
.register-link a { color: #1a3a5c; font-weight: 700; }
.forgot-link { color: #1a3a5c; font-weight: 600; }
`;

function appendToCss(filePath) {
    if (!fs.existsSync(filePath)) return;
    let css = fs.readFileSync(filePath, 'utf8');
    if (!css.includes('LIGHT THEME OVERRIDES')) {
        fs.appendFileSync(filePath, overrides, 'utf8');
        console.log("Appended to " + path.basename(filePath));
    } else {
        console.log("Already appended to " + path.basename(filePath));
    }
}

['login.css', 'register.css'].forEach(file => appendToCss(path.join(dir, file)));
