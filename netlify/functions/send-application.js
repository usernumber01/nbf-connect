const { Resend } = require('resend');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { 
      applicantName, applicantEmail, 
      opportunityTitle, orgName 
    } = JSON.parse(event.body);
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'NBF Connect <support@nbfconnect.in>',
      to: applicantEmail,
      subject: 'Application Received: ' + opportunityTitle,
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
            .badge { display: inline-block; background: #f0fff4; 
              border: 1px solid #a8e6bb; color: #1e7e3a; 
              padding: 8px 20px; border-radius: 20px; 
              font-weight: 600; margin-bottom: 20px; }
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
              <div class="badge">✅ Application Submitted</div>
              <h2 style="color:#1a3a5c;margin-top:0">
                You Applied Successfully!
              </h2>
              <p style="color:#444;line-height:1.7">
                Hi ${applicantName},<br><br>
                Your application for <strong>${opportunityTitle}</strong> 
                at <strong>${orgName}</strong> has been received 
                successfully.
              </p>

              <div style="background:#f9f9f9;border-radius:8px;
                padding:20px;margin:20px 0;border-left:4px solid #e05a1e">
                <p style="margin:0;font-size:13px;color:#444">
                  <strong>What happens next:</strong><br><br>
                  The employer will review your profile and application. 
                  You will receive an email update when your application 
                  status changes. This usually takes 3-7 working days.
                </p>
              </div>

              <p style="color:#444;line-height:1.7">
                You can track your application status anytime in your 
                <a href="https://nbfconnect.in/dashboard.html" 
                  style="color:#e05a1e;font-weight:600">
                  NBF Connect Dashboard
                </a>.
              </p>

              <p style="color:#888;font-size:13px;margin-top:24px">
                Your discipline and dedication will make the difference.<br>
                — Team NBF Connect
              </p>
            </div>
            <div class="footer">
              <p>© 2026 National Bharat Force | NBF Connect</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Application email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
