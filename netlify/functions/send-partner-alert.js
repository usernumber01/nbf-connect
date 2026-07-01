const { Resend } = require('resend');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { 
      contactPerson, designation, email, 
      phone, alternateContact, hearAboutUs 
    } = JSON.parse(event.body);
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Confirmation to partner
    await resend.emails.send({
      from: 'NBF Connect <support@nbfconnect.in>',
      to: email,
      subject: 'Partnership Request Received — NBF Connect',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; 
              background: #f5f5f0; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; 
              background: white; }
            .header { background: #1a3a5c; padding: 32px 40px; 
              text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .header span { color: #e05a1e; }
            .body { padding: 40px; }
            .detail-row { display: flex; padding: 10px 0; 
              border-bottom: 1px solid #f0f0f0; }
            .detail-label { color: #888; font-size: 13px; 
              min-width: 160px; }
            .detail-val { color: #222; font-weight: 500; 
              font-size: 13px; }
            .footer { background: #1a3a5c; padding: 24px 40px; 
              text-align: center; }
            .footer p { color: #aab8c8; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NBF <span>Connect</span></h1>
            </div>
            <div class="body">
              <h2 style="color:#1a3a5c">
                Partnership Request Received ✅
              </h2>
              <p style="color:#444;line-height:1.7">
                Dear ${contactPerson},<br><br>
                Thank you for reaching out to NBF Connect. 
                We have received your partnership request and our team will 
                review it within <strong>24 hours</strong>.
              </p>

              <div style="background:#f9f9f9;border-radius:8px;
                padding:20px;margin:20px 0">
                <p style="font-weight:600;color:#1a3a5c;margin:0 0 12px">
                  Your submission summary:
                </p>
                <div class="detail-row">
                  <span class="detail-label">Contact Person</span>
                  <span class="detail-val">${contactPerson}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Designation</span>
                  <span class="detail-val">${designation}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email</span>
                  <span class="detail-val">${email}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone</span>
                  <span class="detail-val">${phone}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Alternate Contact</span>
                  <span class="detail-val">${alternateContact || 'N/A'}</span>
                </div>
              </div>

              <p style="color:#444;line-height:1.7">
                A team member will contact you at 
                <strong>${phone}</strong> or this email address 
                to discuss next steps.<br><br>
                Questions? Reply to this email or contact us at 
                <a href="mailto:support@nbfconnect.in" 
                  style="color:#e05a1e">
                  support@nbfconnect.in
                </a>
              </p>
            </div>
            <div class="footer">
              <p>© 2026 National Bharat Force | NBF Connect</p>
              <p>Hyderabad, Telangana, India</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // 2. Alert to admin
    await resend.emails.send({
      from: 'NBF Connect <support@nbfconnect.in>',
      to: process.env.ADMIN_EMAIL,
      subject: '🤝 New Partner Request from ' + contactPerson,
      html: `
        <h2>New Partnership Request</h2>
        <p><strong>Contact:</strong> ${contactPerson}</p>
        <p><strong>Designation:</strong> ${designation}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Alternate Contact:</strong> ${alternateContact || 'N/A'}</p>
        <p><strong>Heard About Us:</strong> ${hearAboutUs}</p>
        <p><strong>Time:</strong> 
          ${new Date().toLocaleString('en-IN', 
            { timeZone: 'Asia/Kolkata' })}
        </p>
        <p>
          <a href="https://console.firebase.google.com">
            View in Firebase Console → partners collection
          </a>
        </p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Partner alert error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
