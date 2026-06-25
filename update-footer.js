const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/kalav/Desktop/krishna/project/site 2';
const partnerPath = path.join(dir, 'partner.html');
const loginPath = path.join(dir, 'login.html');
const registerPath = path.join(dir, 'register.html');

const partnerContent = fs.readFileSync(partnerPath, 'utf8');

// Extract footer from partner.html
const footerRegex = /<footer class="premium-footer" id="footer">[\s\S]*?<\/footer>/;
const match = partnerContent.match(footerRegex);

if (match) {
    let partnerFooter = match[0];
    // Change <a href="#" class="footer-logo"> to <a href="index.html" class="footer-logo">
    partnerFooter = partnerFooter.replace('<a href="#" class="footer-logo">', '<a href="index.html" class="footer-logo">');

    // Update login.html
    let loginContent = fs.readFileSync(loginPath, 'utf8');
    loginContent = loginContent.replace(footerRegex, partnerFooter);
    fs.writeFileSync(loginPath, loginContent, 'utf8');
    console.log('Updated login.html');

    // Update register.html
    let registerContent = fs.readFileSync(registerPath, 'utf8');
    registerContent = registerContent.replace(footerRegex, partnerFooter);
    fs.writeFileSync(registerPath, registerContent, 'utf8');
    console.log('Updated register.html');
} else {
    console.error('Footer not found in partner.html');
}
