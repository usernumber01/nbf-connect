const fs = require('fs');

const fontLinks = `    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">`;

const files = ['grievance.html', 'privacy-policy.html', 'terms-and-conditions.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add font links if they don't exist
    if (!content.includes('fonts.googleapis.com')) {
        content = content.replace(/<link rel="stylesheet" href="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/font-awesome.*?">/, match => match + '\n' + fontLinks);
    }

    // Replace font-family
    content = content.replace(/font-family:\s*'Segoe UI', system-ui, sans-serif;/g, "font-family: 'Inter', sans-serif;");

    // Replace garbled characters
    content = content.replace(/ðŸ“§/g, '📧');
    content = content.replace(/ðŸ“ /g, '📍');
    content = content.replace(/â ±ï¸ /g, '⏱️');
    content = content.replace(/ðŸ• /g, '🕒');
    content = content.replace(/ðŸ“‹/g, '📋');
    content = content.replace(/âœ…/g, '✅');
    content = content.replace(/Â©/g, '©');
    content = content.replace(/â€“/g, '–'); // en-dash
    content = content.replace(/â€”/g, '—'); // em-dash

    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
});
