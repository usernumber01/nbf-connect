const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/kalav/Desktop/krishna/project/site 2';
const filesToUpdate = ['index.html', 'partner.html'];

filesToUpdate.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // In index.html, button says "Become a Partner" or "Register as Partner"
    // In partner.html, button says "Register as Partner" (was changed from Become a Partner earlier)

    // Regex to match <a href="..." class="...">...Register as Partner...</a> or Become a Partner
    // Actually, just changing any button with that text.
    
    content = content.replace(/<a[^>]*href="[^"]*"[^>]*>[^<]*Become a Partner[^<]*<\/a>/gi, function(match) {
        return match.replace(/href="[^"]*"/i, 'href="partnershipsignup.html"');
    });

    content = content.replace(/<a[^>]*href="[^"]*"[^>]*>[^<]*Register as Partner[^<]*<\/a>/gi, function(match) {
        return match.replace(/href="[^"]*"/i, 'href="partnershipsignup.html"');
    });

    // Handle nested <i> tags like <i class="fas fa-building"></i> Become a Partner
    content = content.replace(/<a[^>]*href="[^"]*"[^>]*>.*?Become a Partner.*?<\/a>/gis, function(match) {
        return match.replace(/href="[^"]*"/i, 'href="partnershipsignup.html"');
    });

    content = content.replace(/<a[^>]*href="[^"]*"[^>]*>.*?Register as Partner.*?<\/a>/gis, function(match) {
        return match.replace(/href="[^"]*"/i, 'href="partnershipsignup.html"');
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`No matching buttons found in ${file} to update.`);
    }
});
