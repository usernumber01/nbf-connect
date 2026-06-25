const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/kalav/Desktop/krishna/project/site 2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacement = `<div class="social-icons">
                        <a href="https://www.youtube.com/@NationalBharatForce" class="social-link" title="YouTube" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
                        <a href="https://www.instagram.com/nbf.connect/" class="social-link" title="Instagram" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/nbf-connect-7037a6414/" class="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://x.com/nbfconnect" class="social-link" title="X (Twitter)" target="_blank" rel="noopener noreferrer"><i class="fab fa-x-twitter"></i></a>
                        <a href="https://www.instagram.com/nbf.connect/" class="social-link" title="Facebook" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
                    </div>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const regex = /<div class="social-icons">[\s\S]*?<\/div>/;
    if (regex.test(content)) {
        content = content.replace(regex, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
