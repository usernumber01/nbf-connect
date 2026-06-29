const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Replace the exact footer text
    const oldFooterText = /This site is best viewed in Chrome or Firefox\. For support: nbfconnecthyd@gmail\.com/g;
    const newFooterText = 'Support: <a href="mailto:support@nbfconnect.in" style="color:#a0a0a0; text-decoration:none;">support@nbfconnect.in</a> | General: <a href="mailto:hello@nbfconnect.in" style="color:#a0a0a0; text-decoration:none;">hello@nbfconnect.in</a> | Careers: <a href="mailto:careers@nbfconnect.in" style="color:#a0a0a0; text-decoration:none;">careers@nbfconnect.in</a><br>Admin: <a href="mailto:admin@nbfconnect.in" style="color:#a0a0a0; text-decoration:none;">admin@nbfconnect.in</a> | Contact: <a href="mailto:contact@nbfconnect.in" style="color:#a0a0a0; text-decoration:none;">contact@nbfconnect.in</a>';
    
    // Fallback if the first replace doesn't match the exact string but just the email
    content = content.replace(oldFooterText, newFooterText);
    
    // 2. Replace any remaining nbfconnecthyd@gmail.com with support@nbfconnect.in (like in privacy policy, verify email, etc)
    content = content.replace(/nbfconnecthyd@gmail\.com/g, 'support@nbfconnect.in');
    
    // 3. Update "Contact Us" link in the footer
    content = content.replace(/<a href="#footer">Contact Us<\/a>/g, '<a href="mailto:contact@nbfconnect.in">Contact Us</a>');
    content = content.replace(/<a href="\/index\.html#footer">Contact Us<\/a>/g, '<a href="mailto:contact@nbfconnect.in">Contact Us</a>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated emails in ${file}`);
});
