const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/kalav/Desktop/krishna/project/site 2';

function updateCssFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let css = fs.readFileSync(filePath, 'utf8');

    // 1. Update variables
    css = css.replace(/--bg-dark:\s*#[0-9a-fA-F]+;/g, '--bg-dark: #f5f5f0;');
    css = css.replace(/--bg-card:\s*#[0-9a-fA-F]+;/g, '--bg-card: #ffffff;');
    css = css.replace(/--bg-input:\s*#[0-9a-fA-F]+;/g, '--bg-input: #ffffff;');
    css = css.replace(/--border-color:\s*#[0-9a-fA-F]+;/g, '--border-color: #e0e0e0;');
    css = css.replace(/--text-primary:\s*#[0-9a-fA-F]+;/g, '--text-primary: #333333;');
    css = css.replace(/--text-secondary:\s*#[0-9a-fA-F]+;/g, '--text-secondary: #555555;');
    css = css.replace(/--text-muted:\s*#[0-9a-fA-F]+;/g, '--text-muted: #888888;');

    // 2. Input borders and focus
    css = css.replace(/border:\s*1px\s*solid\s*var\(--border-color\);/g, 'border: 1.5px solid var(--border-color);');
    css = css.replace(/border-color:\s*var\(--gold\);/g, 'border-color: #1a3a5c;');
    css = css.replace(/box-shadow:\s*0\s*0\s*0\s*3px\s*rgba\(244,\s*159,\s*28,\s*0\.1\).*?;/g, 'box-shadow: 0 0 0 3px rgba(26, 58, 92, 0.1);');
    css = css.replace(/color:\s*var\(--gold\);/g, 'color: #1a3a5c;');

    // Restore gold color for buttons/specific classes that should stay gold
    // Let's not blindly replace `color: var(--gold)` everywhere.
    // Actually, rollback the blind replacements for gold focus:
    css = css.replace(/border-color:\s*#1a3a5c;/g, 'border-color: var(--gold);'); // revert
    css = css.replace(/color:\s*#1a3a5c;/g, 'color: var(--gold);'); // revert

    // Targeted replacements:
    // Input focus:
    css = css.replace(/\.input-wrapper\s*input:focus\s*{[^}]*}/g, `.input-wrapper input:focus {\n    border-color: #1a3a5c;\n    box-shadow: 0 0 0 3px rgba(26, 58, 92, 0.1);\n}`);
    css = css.replace(/\.input-wrapper\s*select:focus\s*{[^}]*}/g, `.input-wrapper select:focus {\n    border-color: #1a3a5c;\n    box-shadow: 0 0 0 3px rgba(26, 58, 92, 0.1);\n}`);
    css = css.replace(/\.input-wrapper\s*input:focus\s*(~|\+)\s*\.input-icon[\s\S]*?{.*?}/g, `.input-wrapper input:focus $1 .input-icon {\n    color: #1a3a5c;\n}`);
    css = css.replace(/\.input-wrapper\s*select:focus\s*(~|\+)\s*\.input-icon[\s\S]*?{.*?}/g, `.input-wrapper select:focus $1 .input-icon {\n    color: #1a3a5c;\n}`);

    // Input text color & placeholder
    css = css.replace(/\.input-wrapper\s*input[\s\S]*?{([^}]*)}/g, function(match, inner) {
        if (match.includes(':focus') || match.includes('::placeholder')) return match;
        let newInner = inner.replace(/color:\s*var\(--text-primary\);/g, 'color: #222222;');
        return `.input-wrapper input, .input-wrapper select {${newInner}}`;
    });

    // Form background
    css = css.replace(/\.login-form-section\s*{([^}]*)}/g, function(match, inner) {
        return match.replace(/background:\s*var\(--bg-dark\);/g, 'background: #ffffff;');
    });
    css = css.replace(/\.register-form-section\s*{([^}]*)}/g, function(match, inner) {
        return match.replace(/background:\s*var\(--bg-dark\);/g, 'background: #ffffff;');
    });

    // Hero Text Colors (force to white so they don't get dark text from vars)
    css += `
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
`;

    fs.writeFileSync(filePath, css, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
}

function updateHtmlFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    // Inline styles in partnershipsignup.html & register.html
    html = html.replace(/textarea\s*{([^}]*)}/g, function(match, inner) {
        let n = inner.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g, 'background: #ffffff;');
        n = n.replace(/border:\s*1\.5px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.1\);/g, 'border: 1.5px solid #e0e0e0;');
        n = n.replace(/color:\s*#ffffff;/g, 'color: #222222;');
        return `textarea {${n}}`;
    });
    
    html = html.replace(/textarea:focus\s*{([^}]*)}/g, function(match, inner) {
        return `textarea:focus { border-color: #1a3a5c; outline: none; box-shadow: 0 0 0 3px rgba(26,58,92,0.1); }`;
    });

    html = html.replace(/\.declaration-box\s*{([^}]*)}/g, function(match, inner) {
        let n = inner.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.15\);/g, 'border: 1px solid #e0e0e0;');
        n = n.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.02\);/g, 'background: #f9f9f9;');
        return `.declaration-box {${n}}`;
    });

    html = html.replace(/\.declaration-box\s*label\s*{([^}]*)}/g, function(match, inner) {
        let n = inner.replace(/color:\s*#cbd5e1;/g, 'color: #333333;');
        return `.declaration-box label {${n}}`;
    });

    html = html.replace(/\.character-counter\s*{([^}]*)}/g, function(match, inner) {
        let n = inner.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.6\);/g, 'color: #888888;');
        return `.character-counter {${n}}`;
    });

    // Password Meter in register.html
    if (html.includes('password-meter')) {
        html = html.replace(/\.password-meter-container\s*{([^}]*)}/g, function(match, inner) {
            let n = inner.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g, 'background: #f5f5f5;');
            n = n.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.1\);/g, 'border: 1px solid #e0e0e0;');
            return `.password-meter-container {${n}}`;
        });

        html = html.replace(/\.req-item\s*{([^}]*)}/g, function(match, inner) {
            let n = inner.replace(/color:\s*var\(--text-muted\);/g, 'color: #888888;');
            return `.req-item {${n}}`;
        });
        
        html = html.replace(/\.req-item\.met\s*{([^}]*)}/g, function(match, inner) {
            let n = inner.replace(/color:\s*var\(--green\);/g, 'color: #22c55e;');
            return `.req-item.met {${n}}`;
        });
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated inline styles in ${path.basename(filePath)}`);
}

// Execute updates
['login.css', 'register.css'].forEach(file => updateCssFile(path.join(dir, file)));
['partnershipsignup.html', 'register.html', 'login.html'].forEach(file => updateHtmlFile(path.join(dir, file)));
