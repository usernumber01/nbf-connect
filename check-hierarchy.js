const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');
files.forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    const matches = html.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi);
    if (matches) {
        console.log(`\n--- ${file} ---`);
        let lastLevel = 0;
        matches.forEach(match => {
            const level = parseInt(match.match(/<h([1-6])/i)[1], 10);
            if (level > lastLevel + 1 && lastLevel !== 0) {
                console.log(`JUMP DETECTED in ${file}: ${lastLevel} -> ${level} at ${match}`);
            }
            lastLevel = level;
        });
    }
});
