const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(/<h4 class="footer-heading">Quick Links<\/h4>\s*<ul class="footer-links">([\s\S]*?)<\/ul>/);
    if (match) {
        console.log(`=== ${file} ===`);
        console.log(match[1].trim());
    }
});
