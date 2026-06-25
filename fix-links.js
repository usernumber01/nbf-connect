const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    // Regex matches href="filename.html" or href="filename.html#section"
    // It avoids matching http://, https://, /, or ./
    const regex = /href="([a-zA-Z0-9_-]+\.html(?:#[^"]*)?)"/g;
    let modified = content.replace(regex, 'href="/$1"');
    
    if (content !== modified) {
        fs.writeFileSync(path.join(dir, file), modified, 'utf-8');
        console.log(`Updated links in ${file}`);
    }
});
console.log('Link fixing complete.');
