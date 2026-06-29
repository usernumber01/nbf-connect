const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi);
    if (match) {
        console.log(`Line ${i + 1}: ${match.join(' ')}`);
    } else {
        const openMatch = line.match(/<h[1-6][^>]*>/gi);
        if (openMatch) {
            console.log(`Line ${i + 1}: ${openMatch.join(' ')}`);
        }
    }
}
