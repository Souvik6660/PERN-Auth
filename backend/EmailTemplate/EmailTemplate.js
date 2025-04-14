export const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification - News Nexus India</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #007BFF;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.8;
          }
          .verification-code {
              display: block;
              margin: 20px 0;
              font-size: 22px;
              color: #007BFF;
              background: #e7f1ff;
              border: 1px dashed #007BFF;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              font-weight: bold;
              letter-spacing: 2px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          .footer p.system-note {
              margin-top: 10px;
              font-style: italic;
              font-size: 11px;
              color: #999;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verify Your Email</div>
          <div class="content">
              <p>Welcome to <strong>News Nexus India</strong> , To complete your registration, please verify your email address by entering the code below:</p>
              <span class="verification-code">{verificationCode}</span>
              <p>If you did not sign up for an account, no further action is required. If you have any questions, our support team is here to help.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} News Nexus India Official. All rights reserved.</p>
              <p class="system-note">This is a system-generated message. Please do not reply to this email.</p>
          </div>
      </div>
  </body>
  </html>
`;
