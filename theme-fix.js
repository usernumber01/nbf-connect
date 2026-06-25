const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/kalav/Desktop/krishna/project/site 2';

function fixBackHomeAndLinks(filePath) {
    if (!fs.existsSync(filePath)) return;
    let css = fs.readFileSync(filePath, 'utf8');

    // Fix .back-home
    css = css.replace(/\.back-home\s*{([^}]*)}/g, function(match, inner) {
        let n = inner.replace(/background:\s*rgba\(6,\s*13,\s*26,\s*0\.85\);/g, 'background: #ffffff;');
        n = n.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.08\);/g, 'border: 1px solid #e0e0e0;');
        n = n.replace(/color:\s*var\(--text-secondary\);/g, 'color: #333333;');
        return `.back-home {${n}}`;
    });

    css = css.replace(/\.back-home:hover\s*{([^}]*)}/g, function(match, inner) {
        let n = inner.replace(/background:\s*rgba\(244,\s*159,\s*28,\s*0\.08\);/g, 'background: #fff4ed;');
        return `.back-home:hover {${n}}`;
    });

    // Fix .login-form-section before (the gradient line)
    css = css.replace(/background:\s*linear-gradient\(to\s*bottom,\s*transparent,\s*rgba\(244,\s*159,\s*28,\s*0\.15\),\s*transparent\);/g, 'background: linear-gradient(to bottom, transparent, rgba(224, 90, 30, 0.2), transparent);');

    // Make social buttons background white
    css = css.replace(/\.btn-social\s*{([^}]*)}/g, function(match, inner) {
        let n = inner.replace(/background:\s*var\(--bg-input\);/g, 'background: #ffffff;');
        return `.btn-social {${n}}`;
    });
    css = css.replace(/\.btn-social:hover\s*{([^}]*)}/g, function(match, inner) {
        let n = inner.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.04\);/g, 'background: #f9f9f9;');
        n = n.replace(/color:\s*var\(--text-primary\);/g, 'color: #1a3a5c;');
        n = n.replace(/border-color:\s*rgba\(255,\s*255,\s*255,\s*0\.2\);/g, 'border-color: #cccccc;');
        return `.btn-social:hover {${n}}`;
    });

    fs.writeFileSync(filePath, css, 'utf8');
    console.log(`Fixed back-home in ${path.basename(filePath)}`);
}

['login.css', 'register.css'].forEach(file => fixBackHomeAndLinks(path.join(dir, file)));
