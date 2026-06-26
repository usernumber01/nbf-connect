const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const newQuickLinks = `<h4 class="footer-heading">Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="/index.html#home-hero">About NBF CONNECT</a></li>
                        <li><a href="/opportunities.html">Opportunities</a></li>
                        <li><a href="/index.html#how-it-works">How It Works</a></li>
                        <li><a href="/index.html#who-are-shurveers">Shurveers</a></li>
                        <li><a href="#footer">Contact Us</a></li>
                    </ul>`;

const newGovtPolicies = `<h4 class="footer-heading">Govt Policies</h4>
                    <ul class="footer-links">
                        <li><a href="/privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="/terms-and-conditions.html">Terms & Conditions</a></li>
                        <li><a href="/grievance.html">Grievance Redressal</a></li>
                        <li><a href="#">RTI Directory</a></li>
                    </ul>`;

const newResources = `<h4 class="footer-heading">Resources</h4>
                    <ul class="footer-links">
                        <li><a href="/resources.html#shurveer-tools">Career Guide</a></li>
                        <li><a href="/resources.html">Government Schemes</a></li>
                        <li><a href="/resources.html#shurveer-tools">Interview Prep</a></li>
                        <li><a href="/resources.html">FAQs</a></li>
                        <li><a href="/resources.html#partner-tools">Partner Downloads</a></li>
                    </ul>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    content = content.replace(/<h4 class="footer-heading">Quick Links<\/h4>[\s\S]*?<\/ul>/, newQuickLinks);
    
    // Some files might still have "Support" instead of "Govt Policies"
    content = content.replace(/<h4 class="footer-heading">(?:Govt Policies|Support)<\/h4>[\s\S]*?<\/ul>/, newGovtPolicies);

    content = content.replace(/<h4 class="footer-heading">Resources<\/h4>[\s\S]*?<\/ul>/, newResources);

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated footers in ${file}`);
    }
});
