const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace Wikimedia Flag with emoji
html = html.replace(/<img src="https:\/\/upload\.wikimedia\.org[^>]+>/g, '🇮🇳');

// 2. Add <main id="main-content">
// Find where to insert <main>
// After mobile-menu closing div and before home-hero section
html = html.replace(
    /<\/div>\s*<!-- Hero Section -->/,
    '</div>\n\n    <main id="main-content">\n    <!-- Hero Section -->'
);

// Close </main> before premium-footer
html = html.replace(
    /<!-- Premium Footer Section -->/,
    '</main>\n\n    <!-- Premium Footer Section -->'
);

// 3. Fix heading order h4 -> h3
html = html.replace(/<h4 class="org-title">(.*?)<\/h4>/g, '<h3 class="org-title">$1</h3>');
html = html.replace(/<h4 class="opp-title">(.*?)<\/h4>/g, '<h3 class="opp-title">$1</h3>');
html = html.replace(/<h4 class="step-title-text">(.*?)<\/h4>/g, '<h3 class="step-title-text">$1</h3>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully');
