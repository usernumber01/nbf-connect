const fs = require('fs');
const path = require('path');

// Fix Â© in index.html first
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/Â©/g, '©');
fs.writeFileSync('index.html', indexHtml, 'utf8');

// Extract premium footer from index.html
const footerRegex = /<footer class="premium-footer" id="footer">[\s\S]*?<\/footer>/;
const match = indexHtml.match(footerRegex);
if (!match) {
    console.error("Could not find premium footer in index.html");
    process.exit(1);
}
const premiumFooterHtml = match[0];

// Fix footer.css missing margin: 0 auto
let footerCss = fs.readFileSync('footer.css', 'utf8');
if (!footerCss.includes('margin: 0 auto;')) {
    footerCss = footerCss.replace(/\.premium-footer \.container \{[\s\S]*?\}/, match => {
        if (!match.includes('margin:')) {
            return match.replace('}', '    margin: 0 auto;\n}');
        }
        return match;
    });
    fs.writeFileSync('footer.css', footerCss, 'utf8');
    console.log("Added margin: 0 auto to footer.css");
}

// Update all html files
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace footer
    // Case 1: already has premium-footer
    if (content.match(/<footer class="premium-footer" id="footer">[\s\S]*?<\/footer>/)) {
        content = content.replace(/<footer class="premium-footer" id="footer">[\s\S]*?<\/footer>/, premiumFooterHtml);
    } 
    // Case 2: has old footer
    else if (content.match(/<footer[\s\S]*?<\/footer>/)) {
        content = content.replace(/<footer[\s\S]*?<\/footer>/, premiumFooterHtml);
    } 
    // Case 3: has no footer but has </body>
    else if (content.includes('</body>')) {
        content = content.replace('</body>', premiumFooterHtml + '\n</body>');
    }

    // Add link to footer.css if missing
    if (!content.includes('footer.css')) {
        content = content.replace('</head>', '    <link rel="stylesheet" href="footer.css">\n</head>');
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Synced footer in ${file}`);
    }
});
