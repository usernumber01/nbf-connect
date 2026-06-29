const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Change 1
content = content.replace(
    /"Connecting disciplined youth with real opportunities and building a stronger, self-reliant Bharat."<br><br><strong>Ministry of Youth Affairs & Sports<\/strong>/,
    "NBF Connect — National Bharat Force Connect<br>India's first platform connecting disciplined youth<br>with real opportunities."
);

// Change 2
content = content.replace(
    /© 2026 NBF Connect \| All Rights Reserved\./,
    "© 2026 NBF Connect (National Bharat Force Connect) | All Rights Reserved. | Made in India"
);

// Remove duplicate Made in India
content = content.replace(
    /<div class="bottom-right">\s*<p>Made in India<\/p>\s*<\/div>/,
    `<div class="bottom-right"></div>`
);

// Change 3
content = content.replace(
    /<div class="footer-bottom">/,
    `<div style="font-size: 12px; color: #a0a0a0; text-align: center; max-width: 600px; margin: 0 auto 12px auto;">NBF = National Bharat Force — India's disciplined youth force comprising NCC, NSS, Scouts & Guides, NYKS and Civil Defence members.</div>\n            <div class="footer-bottom">`
);

// Change 4
content = content.replace(
    /<\/div>\s*<\/div>\s*<\/footer>/,
    `    </div>\n            <div style="font-size: 11px; color: rgba(160, 160, 160, 0.6); text-align: center; max-width: 700px; margin: 16px auto 0 auto;">NBF Connect is an independent youth empowerment platform operated by National Bharat Force Connect. Not affiliated with or endorsed by any government ministry, bank, or financial institution.</div>\n        </div>\n    </footer>`
);

// Change 5 & 6
content = content.replace(
    /<title>NBF Connect \| Connecting Disciplined Youth<\/title>\s*<meta name="description" content="NBF Connect connects disciplined youth from NCC, NSS, Scouts, and more with real opportunities.">/,
    `<title>NBF Connect — National Bharat Force Connect | Connecting Disciplined Youth with Real Opportunities</title>
    <meta name="description" content="NBF Connect (National Bharat Force Connect) is India's first platform connecting NCC, NSS, Scouts, NYKS and Civil Defence youth with verified jobs, internships, and volunteering opportunities.">
    <meta name="author" content="NBF Connect — National Bharat Force Connect">
    <meta name="application-name" content="NBF Connect">
    <meta name="keywords" content="NBF Connect, National Bharat Force, NCC jobs, NSS internships, disciplined youth India, Shurveer, youth employment India, Scout careers, NYKS opportunities">
    <meta property="og:title" content="NBF Connect — National Bharat Force Connect">
    <meta property="og:description" content="India's first platform connecting NCC, NSS, Scouts, NYKS and Civil Defence youth with real opportunities.">
    <meta property="og:site_name" content="NBF Connect — National Bharat Force Connect">
    <link rel="canonical" href="https://nbfconnect.in"/>`
);

// Change 7
content = content.replace(
    /<div class="gov-pill">WHAT IS NBF CONNECT<\/div>/,
    `<div class="gov-pill">WHAT IS NBF CONNECT</div>\n                    <span style="font-size: 12px; color: #C8861A; display: block; margin-bottom: 8px;">(NBF = National Bharat Force — India's disciplined youth force)</span>`
);

// Change 8
content = content.replace(
    /<a href="#" class="logo new-logo">/,
    `<a href="#" class="logo new-logo" title="NBF Connect — National Bharat Force Connect | India's Disciplined Youth Platform">`
);

// Change 9
content = content.replace(
    /<li><a href="\/privacy-policy\.html">Privacy Policy<\/a><\/li>/,
    `<li><a href="#footer">Privacy Policy (Coming Soon)</a></li>`
);
content = content.replace(
    /<li><a href="\/terms-and-conditions\.html">Terms & Conditions<\/a><\/li>/,
    `<li><a href="#footer">Terms & Conditions (Coming Soon)</a></li>`
);
content = content.replace(
    /<li><a href="\/grievance\.html">Grievance Redressal<\/a><\/li>/,
    `<li><a href="#footer">Grievance Redressal (Coming Soon)</a></li>`
);

// Change 10
content = content.replace(
    /This site is best viewed in Chrome, Firefox at 1024x768 resolution\./,
    `This site is best viewed in Chrome or Firefox. For support: support@nbfconnect.in`
);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Changes applied to index.html successfully!');
