const fs = require('fs');
const path = require('path');

const dir = __dirname;

const filesToRename = [
    { old: 'partner.html', new: 'partner.html' },
    { old: 'partner.css', new: 'partner.css' }
];

filesToRename.forEach(f => {
    const oldPath = path.join(dir, f.old);
    const newPath = path.join(dir, f.new);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed ${f.old} to ${f.new}`);
    }
});

function replaceInFile(filePath) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
        if (!filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('.vscode') && !filePath.includes('netlify')) {
            fs.readdirSync(filePath).forEach(file => replaceInFile(path.join(filePath, file)));
        }
    } else {
        const ext = path.extname(filePath);
        if (['.html', '.css', '.js'].includes(ext)) {
            let content = fs.readFileSync(filePath, 'utf8');
            let newContent = content
                .replace(/partner\.html/g, 'partner.html')
                .replace(/partner\.css/g, 'partner.css')
                .replace(/Partners/g, 'Partners')
                .replace(/Partner/g, 'Partner')
                .replace(/partners/g, 'partners')
                .replace(/partner/g, 'partner')
                .replace(/PARTNERS/g, 'PARTNERS')
                .replace(/PARTNER/g, 'PARTNER');
            
            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Updated ${filePath}`);
            }
        }
    }
}

replaceInFile(dir);
console.log('Done.');
