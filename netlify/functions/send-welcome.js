const { Resend } = require('resend');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { name, email } = JSON.parse(event.body);
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Send welcome email to Shurveer
    await resend.emails.send({
      from: 'NBF Connect <support@nbfconnect.in>',
      to: email,
      subject: '🎖️ Welcome to NBF Connect, ' + name + '!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; 
              background: #f5f5f0; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; 
              background: white; }
            .header { background: #1a3a5c; padding: 32px 40px; 
              text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .header span { color: #e05a1e; }
            .body { padding: 40px; }
            .body h2 { color: #1a3a5c; margin-top: 0; }
            .body p { color: #444; line-height: 1.7; }
            .steps { background: #f9f9f9; border-radius: 8px; 
              padding: 20px 24px; margin: 20px 0; }
            .step { display: flex; gap: 12px; margin-bottom: 12px; 
              align-items: flex-start; }
            .step-num { background: #e05a1e; color: white; 
              border-radius: 50%; width: 24px; height: 24px; 
              display: flex; align-items: center; 
              justify-content: center; font-size: 12px; 
              font-weight: bold; flex-shrink: 0; }
            .btn { display: inline-block; background: #e05a1e; 
              color: white; padding: 14px 32px; border-radius: 8px; 
              text-decoration: none; font-weight: 600; 
              margin: 20px 0; }
            .footer { background: #1a3a5c; padding: 24px 40px; 
              text-align: center; }
            .footer p { color: #aab8c8; font-size: 12px; margin: 4px 0; }
            .footer a { color: #FF9933; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NBF <span>Connect</span></h1>
              <p style="color:#aab8c8;margin:8px 0 0;font-size:14px">
                राष्ट्रीय भारत बल | National Bharat Force
              </p>
            </div>
            <div class="body">
              <h2>Welcome, ${name}! 🎖️</h2>
              <p>You have successfully joined <strong>NBF Connect</strong> 
              — India's first platform dedicated to connecting disciplined 
              NCC, NSS, Scouts, NYKS and Civil Defence youth with real 
              opportunities.</p>
              
              <div class="steps">
                <p style="font-weight:600;color:#1a3a5c;margin:0 0 12px">
                  Your next steps:
                </p>
                <div class="step">
                  <div class="step-num">1</div>
                  <p style="margin:0;color:#444">
                    <strong>Verify your email</strong> — check your inbox 
                    for a verification link from Firebase
                  </p>
                </div>
                <div class="step">
                  <div class="step-num">2</div>
                  <p style="margin:0;color:#444">
                    <strong>Complete your profile</strong> — add your 
                    org type, skills, and upload your certificate
                  </p>
                </div>
                <div class="step">
                  <div class="step-num">3</div>
                  <p style="margin:0;color:#444">
                    <strong>Browse opportunities</strong> — find jobs, 
                    internships and events matching your profile
                  </p>
                </div>
              </div>

              <a href="https://nbfconnect.in/dashboard.html" 
                class="btn">
                Go to Your Dashboard →
              </a>

              <p style="font-size:13px;color:#888;margin-top:24px">
                Your Discipline Is Your Superpower.<br>
                — Team NBF Connect
              </p>
            </div>
            <div class="footer">
              <p>© 2026 National Bharat Force | NBF Connect</p>
              <p>
                <a href="https://nbfconnect.in/privacy-policy.html">
                  Privacy Policy
                </a> · 
                <a href="https://nbfconnect.in/grievance.html">
                  Grievance
                </a>
              </p>
              <p style="margin-top:8px;font-size:11px">
                1-8-1, Saroornagar, Dilsukhnagar, 
                Hyderabad, Telangana 500035
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // 2. Send admin alert
    await resend.emails.send({
      from: 'NBF Connect <support@nbfconnect.in>',
      to: process.env.ADMIN_EMAIL,
      subject: '🆕 New Shurveer Registered: ' + name,
      html: `
        <h2>New Shurveer Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', 
          { timeZone: 'Asia/Kolkata' })}</p>
        <p>
          <a href="https://console.firebase.google.com">
            View in Firebase Console
          </a>
        </p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Welcome email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
