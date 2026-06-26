const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/â€”/g, '—');
    content = content.replace(/â€“/g, '–');
    content = content.replace(/â† /g, '←');
    content = content.replace(/â†’/g, '→');
    content = content.replace(/â— /g, '●');
    content = content.replace(/âœ“/g, '✓');
    content = content.replace(/âœ…/g, '✅');
    content = content.replace(/â‚¹/g, '₹');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed garbled text in ${file}`);
    }
});
