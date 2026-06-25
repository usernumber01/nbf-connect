const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/kalav/Desktop/krishna/project/site 2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Upgrade FontAwesome to 6.5.1 to support fa-x-twitter
    if (content.includes('6.4.0/css/all.min.css')) {
        content = content.replace(/6\.4\.0\/css\/all\.min\.css/g, '6.5.1/css/all.min.css');
        changed = true;
    }

    // Just in case it was fa-twitter and they want it changed to fa-x-twitter (though I did this in previous step)
    // The previous step already put <i class="fab fa-x-twitter"></i>
    
    // 2. Remove the yellow heart next to "Made in India"
    const heartRegex = /<p>Made in India\s*<i class="fas fa-heart[^>]*><\/i><\/p>/g;
    if (heartRegex.test(content)) {
        content = content.replace(heartRegex, '<p>Made in India</p>');
        changed = true;
    }
    
    // Some files might have it without the p tag or slightly different spacing
    const heartRegex2 = /Made in India\s*<i class="fas fa-heart[^>]*><\/i>/g;
    if (heartRegex2.test(content)) {
        content = content.replace(heartRegex2, 'Made in India');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
