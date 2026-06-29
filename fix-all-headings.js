const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    let originalHtml = html;

    // 1. Change <h4 class="footer-heading"> to <h2 class="footer-heading"> in ALL files
    html = html.replace(/<h4 class="footer-heading">(.*?)<\/h4>/g, '<h2 class="footer-heading">$1</h2>');

    // 2. Specific file fixes:
    if (file === 'admin.html') {
        html = html.replace(/<h3>User Growth<\/h3>/g, '<h2>User Growth</h2>');
        html = html.replace(/<h3>Recent Registrations<\/h3>/g, '<h2>Recent Registrations</h2>'); // Just in case there are other H3s
    }
    
    if (file === 'grievance.html') {
        html = html.replace(/<h3>Grievance Officer<\/h3>/g, '<h2>Grievance Officer</h2>');
        html = html.replace(/<h3>Grievance Resolution Process<\/h3>/g, '<h2>Grievance Resolution Process</h2>');
        html = html.replace(/<h3>Contact Us<\/h3>/g, '<h2>Contact Us</h2>');
    }
    
    if (file === 'partner.html') {
        // 2 -> 4 jumps
        html = html.replace(/<h4>Leadership Trained<\/h4>/g, '<h3>Leadership Trained</h3>');
        html = html.replace(/<h4>Educational Institutions<\/h4>/g, '<h3>Educational Institutions</h3>');
        html = html.replace(/<h4>Corporates & Brands<\/h4>/g, '<h3>Corporates & Brands</h3>');
        html = html.replace(/<h4>Government & NGOs<\/h4>/g, '<h3>Government & NGOs</h3>');
    }
    
    if (file === 'privacy-policy.html' || file === 'terms-and-conditions.html') {
        html = html.replace(/<h3>Table of Contents<\/h3>/g, '<h2>Table of Contents</h2>');
        html = html.replace(/<h3>1\./g, '<h2>1.');
        html = html.replace(/<h3>2\./g, '<h2>2.');
        html = html.replace(/<h3>3\./g, '<h2>3.');
        html = html.replace(/<h3>4\./g, '<h2>4.');
        html = html.replace(/<h3>5\./g, '<h2>5.');
        html = html.replace(/<h3>6\./g, '<h2>6.');
        html = html.replace(/<h3>7\./g, '<h2>7.');
        html = html.replace(/<h3>8\./g, '<h2>8.');
        html = html.replace(/<h3>9\./g, '<h2>9.');
        html = html.replace(/<h3>10\./g, '<h2>10.');
        html = html.replace(/<\/h3>/g, '</h2>'); // this might be broad but safe for legal pages if they only have H1 and H3s
    }
    
    if (file === 'resources.html') {
        html = html.replace(/<h4 class="program-name">(.*?)<\/h4>/g, '<h3 class="program-name">$1</h3>');
    }
    
    if (file === 'schedule-discussion.html') {
        html = html.replace(/<h3>What to expect in this call<\/h3>/g, '<h2>What to expect in this call</h2>');
    }

    if (html !== originalHtml) {
        fs.writeFileSync(file, html, 'utf8');
        console.log(`Updated headings in ${file}`);
    }
});
