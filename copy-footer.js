const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/kalav/Desktop/krishna/project/site 2';
const indexHtmlPath = path.join(dir, 'index.html');
const signupHtmlPath = path.join(dir, 'partnershipsignup.html');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const signupHtml = fs.readFileSync(signupHtmlPath, 'utf8');

// Extract footer from index.html
const footerMatch = indexHtml.match(/<footer class="premium-footer"[^>]*>[\s\S]*?<\/footer>/i);

if (footerMatch) {
    const footerHtml = footerMatch[0];
    
    // Check if footer already exists in partnershipsignup.html
    if (signupHtml.includes('<footer class="premium-footer"')) {
        console.log("Footer already exists in partnershipsignup.html.");
    } else {
        // Append footer right before <!-- Scripts -->
        const targetPoint = '    <!-- Scripts -->';
        if (signupHtml.includes(targetPoint)) {
            const updatedHtml = signupHtml.replace(targetPoint, footerHtml + '\n\n' + targetPoint);
            fs.writeFileSync(signupHtmlPath, updatedHtml, 'utf8');
            console.log("Footer added to partnershipsignup.html successfully.");
        } else {
            console.log("Could not find insertion point '    <!-- Scripts -->' in partnershipsignup.html.");
        }
    }
} else {
    console.log("Footer not found in index.html");
}
