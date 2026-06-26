const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'register.html');
let content = fs.readFileSync(filePath, 'utf8');

const originalContent = content;

// Replace the corrupted circle
content = content.replace(/â— /g, '●');

if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed register.html');
}
