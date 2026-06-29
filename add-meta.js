const fs = require('fs');
const path = require('path');

const metaData = {
  'index.html': `
    <meta name="description" content="NBF Connect — India's first platform connecting disciplined NCC, NSS, Scouts, NYKS and Civil Defence youth with real jobs, internships and opportunities across India. Register as a Shurveer today.">
    <meta name="keywords" content="NCC jobs, NSS internship, Scouts opportunity, NYKS placement, Civil Defence career, disciplined youth India, Shurveer, NBF Connect, National Bharat Force">
    <meta name="author" content="National Bharat Force">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="NBF Connect — Connecting Disciplined Youth">
    <meta property="og:description" content="India's first platform for NCC, NSS, Scouts, NYKS and Civil Defence youth. Find real jobs and internships. Register free.">
    <meta property="og:image" content="https://nbfconnect.in/hero-shurveer.jpg">
    <meta property="og:url" content="https://nbfconnect.in">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="NBF Connect">
    <meta property="og:locale" content="en_IN">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="NBF Connect — Disciplined Youth, Real Opportunities">
    <meta name="twitter:description" content="India's first platform for NCC, NSS, Scouts, NYKS and Civil Defence youth. Find real opportunities.">
    <meta name="twitter:image" content="https://nbfconnect.in/hero-shurveer.jpg">
    <link rel="canonical" href="https://nbfconnect.in/">
  `,
  'register.html': `
    <meta name="description" content="Register as a Shurveer on NBF Connect. Join India's largest platform for NCC, NSS, Scouts, NYKS and Civil Defence youth. Create your verified profile and access real opportunities.">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Register as Shurveer — NBF Connect">
    <meta property="og:description" content="Create your verified Shurveer profile on NBF Connect.">
    <meta property="og:url" content="https://nbfconnect.in/register.html">
    <link rel="canonical" href="https://nbfconnect.in/register.html">
  `,
  'login.html': `
    <meta name="description" content="Login to your NBF Connect Shurveer account. Access your dashboard, browse opportunities and track your applications.">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Login — NBF Connect">
    <meta property="og:url" content="https://nbfconnect.in/login.html">
    <link rel="canonical" href="https://nbfconnect.in/login.html">
  `,
  'partnershipsignup.html': `
    <meta name="description" content="Partner with NBF Connect to hire disciplined, verified youth from NCC, NSS, Scouts, NYKS and Civil Defence. Post your requirement free.">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Become a Partner — NBF Connect">
    <meta property="og:description" content="Hire verified, disciplined youth from India's largest disciplined youth network.">
    <meta property="og:url" content="https://nbfconnect.in/partnershipsignup.html">
    <link rel="canonical" href="https://nbfconnect.in/partnershipsignup.html">
  `,
  'opportunities.html': `
    <meta name="description" content="Browse real job, internship and volunteer opportunities on NBF Connect. Opportunities specially curated for NCC, NSS, Scouts, NYKS and Civil Defence youth across India.">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Opportunities for Shurveers — NBF Connect">
    <meta property="og:url" content="https://nbfconnect.in/opportunities.html">
    <link rel="canonical" href="https://nbfconnect.in/opportunities.html">
  `,
  'shurveerdashboard.html': `
    <meta name="robots" content="noindex, nofollow">
  `,
  'partner-dashboard.html': `
    <meta name="robots" content="noindex, nofollow">
  `,
  'admin.html': `
    <meta name="robots" content="noindex, nofollow">
  `,
  'privacy-policy.html': `
    <meta name="description" content="NBF Connect Privacy Policy. How we collect, use and protect your personal data. IT Act 2000 compliant. KALAVENA VAMSHI KRISHNA, Founder, National Bharat Force, Hyderabad.">
    <meta name="robots" content="index, follow">
  `,
  'terms-and-conditions.html': `
    <meta name="description" content="NBF Connect Terms and Conditions. Rules for Shurveers and Partners using the NBF Connect platform. Governed by laws of India.">
    <meta name="robots" content="index, follow">
  `,
  'grievance.html': `
    <meta name="description" content="NBF Connect Grievance Redressal. Submit complaints to Grievance Officer KALAVENA VAMSHI KRISHNA. Response within 30 days as per IT Act 2000.">
    <meta name="robots" content="index, follow">
  `
};

const dir = __dirname;
Object.keys(metaData).forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove existing overlapping tags to avoid duplicates
  content = content.replace(/<meta name="description"[^>]*>/gi, '');
  content = content.replace(/<meta name="keywords"[^>]*>/gi, '');
  content = content.replace(/<meta name="author"[^>]*>/gi, '');
  content = content.replace(/<meta name="robots"[^>]*>/gi, '');
  content = content.replace(/<meta property="og:[^>]*>/gi, '');
  content = content.replace(/<meta name="twitter:[^>]*>/gi, '');
  content = content.replace(/<link rel="canonical"[^>]*>/gi, '');
  
  // Inject new tags before </head>
  const insertIndex = content.indexOf('</head>');
  if (insertIndex !== -1) {
    content = content.slice(0, insertIndex) + metaData[file] + '\n' + content.slice(insertIndex);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
  }
});
