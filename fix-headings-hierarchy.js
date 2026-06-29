const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Fix H1 -> H3 jump by making nbf-value-title and nbf-quote H2
html = html.replace(/<h3 class="nbf-value-title">(.*?)<\/h3>/g, '<h2 class="nbf-value-title">$1</h2>');
html = html.replace(/<h3 class="nbf-quote">(.*?)<\/h3>/gs, '<h2 class="nbf-quote">$1</h2>');

// Footer headings are currently H4. But they follow an H3.
// To be perfectly sequential (or just in case), let's make footer headings H2 since footer is a major section.
// Actually, I'll leave them as H4 if the user specifically asked for H1->H2->H3->H4.
// Let's just make sure there are no skips.

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully');
