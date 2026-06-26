const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const originalContent = content;
    
    // Replace the corrupted strings explicitly
    content = content.replace(/ðŸ ›ï¸  à¤°à¤¾à¤·à¥ à¤Ÿà¥ à¤°à¥€à¤¯ à¤­à¤¾à¤°à¤¤ à¤¬à¤²/g, '🛡️ राष्ट्रीय भारत बल');
    content = content.replace(/à¤°à¤¾à¤·à¥ à¤Ÿà¥ à¤°à¥€à¤¯ à¤­à¤¾à¤°à¤¤ à¤¬à¤² \| NATIONAL BHARAT FORCE/g, 'राष्ट्रीय भारत बल | NATIONAL BHARAT FORCE');
    content = content.replace(/>à¤¹à¤¿à¤‚à¤¦à¥€</g, '>हिंदी<');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed ' + file);
    }
});
