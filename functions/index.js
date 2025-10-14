const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

// Load .env file if it exists (for local development)
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not available or .env file not found - use Firebase config instead
}

// Initialize Firebase Admin
admin.initializeApp();

// Initialize SendGrid with API key from environment variable or Firebase config
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || functions.config().sendgrid?.key;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || functions.config().sendgrid?.from_email || 'noreply@nutrition-education.com';
const SENDGRID_ADMIN_EMAIL = process.env.SENDGRID_ADMIN_EMAIL || functions.config().sendgrid?.admin_email || 'admin@nutrition-education.com';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid initialized successfully');
  console.log('Using from email:', SENDGRID_FROM_EMAIL);
  console.log('Using admin email:', SENDGRID_ADMIN_EMAIL);
} else {
  console.warn('WARNING: SendGrid API key not found');
}

/**
 * Send email via SendGrid with optional attachment
 * Cloud Function callable from client
 */
exports.sendEmail = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to send email'
    );
  }

  const { to, subject, text, html, attachmentBase64, attachmentFilename, attachmentType } = data;

  // Validate required fields
  if (!to || !subject || (!text && !html)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing required email fields (to, subject, text/html)'
    );
  }

  // Get sender email from environment or use default
  const fromEmail = SENDGRID_FROM_EMAIL;

  try {
    const msg = {
      to,
      from: fromEmail,
      subject,
      text: text || '',
      html: html || text || '',
    };

    // Add attachment if provided
    if (attachmentBase64 && attachmentFilename) {
      msg.attachments = [
        {
          content: attachmentBase64,
          filename: attachmentFilename,
          type: attachmentType || 'application/pdf',
          disposition: 'attachment',
        },
      ];
    }

    await sgMail.send(msg);

    // Log the email sent
    console.log(`Email sent to ${to} with subject: ${subject}`);

    return {
      success: true,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email: ' + error.message);
  }
});

/**
 * Send welcome email when new user registers
 * Triggered automatically on user creation
 */
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  const email = user.email;
  const displayName = user.displayName || 'there';

  if (!email) {
    console.log('No email for user, skipping welcome email');
    return null;
  }

  const msg = {
    to: email,
    from: SENDGRID_FROM_EMAIL,
    subject: 'Welcome to Nutrition Education Platform!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #22c55e; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 24px; background: #22c55e; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Nutrition Education!</h1>
          </div>
          <div class="content">
            <h2>Hi ${displayName}!</h2>
            <p>Thank you for joining our Nutrition Education platform. We're excited to have you on board!</p>

            <p>Here's what you can do now:</p>
            <ul>
              <li>Browse our collection of healthy recipes</li>
              <li>Plan your weekly meals</li>
              <li>Learn about nutrition and healthy eating</li>
              <li>Rate and review recipes</li>
              <li>Generate shopping lists from your meal plans</li>
            </ul>

            <p style="text-align: center;">
              <a href="http://localhost:5173" class="button">Get Started</a>
            </p>

            <p>If you have any questions, feel free to contact us anytime.</p>

            <p>Stay healthy!<br>The Nutrition Education Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hi ${displayName}!

      Thank you for joining our Nutrition Education platform. We're excited to have you on board!

      Here's what you can do now:
      - Browse our collection of healthy recipes
      - Plan your weekly meals
      - Learn about nutrition and healthy eating
      - Rate and review recipes
      - Generate shopping lists from your meal plans

      Visit us at: http://localhost:5173

      Stay healthy!
      The Nutrition Education Team
    `,
  };

  try {
    if (SENDGRID_API_KEY) {
      await sgMail.send(msg);
      console.log(`Welcome email sent to ${email}`);
    } else {
      console.log('SendGrid API key not configured, skipping welcome email');
    }
    return null;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return null;
  }
});

/**
 * Send bulk emails to multiple users (admin only)
 * Cloud Function callable from admin dashboard
 */
exports.sendBulkEmail = functions.https.onCall(async (data, context) => {
  // Verify authentication and admin role
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  // Check if user is admin
  const userDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
  if (!userDoc.exists || userDoc.data().role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can send bulk emails');
  }

  const { recipients, subject, html, text } = data;

  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Recipients array is required');
  }

  if (!subject || (!text && !html)) {
    throw new functions.https.HttpsError('invalid-argument', 'Subject and message content required');
  }

  try {
    const messages = recipients.map((email) => ({
      to: email,
      from: SENDGRID_FROM_EMAIL,
      subject,
      text: text || '',
      html: html || text || '',
    }));

    await sgMail.send(messages);

    console.log(`Bulk email sent to ${recipients.length} recipients`);

    return {
      success: true,
      message: `Successfully sent ${recipients.length} emails`,
      count: recipients.length,
    };
  } catch (error) {
    console.error('Error sending bulk email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send bulk email: ' + error.message);
  }
});

/**
 * Send contact form submission email
 * Cloud Function callable from contact page
 */
exports.sendContactEmail = functions.https.onCall(async (data) => {
  const { name, email, message } = data;

  console.log('sendContactEmail called with:', { name, email });
  console.log('SendGrid API Key exists:', !!SENDGRID_API_KEY);
  console.log('Using from email:', SENDGRID_FROM_EMAIL);
  console.log('Sending to admin:', SENDGRID_ADMIN_EMAIL);

  if (!name || !email || !message) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Name, email, and message are required'
    );
  }

  try {
    // Send email to admin
    console.log('Sending email to admin...');
    const adminResponse = await sgMail.send({
      to: SENDGRID_ADMIN_EMAIL,
      from: SENDGRID_FROM_EMAIL,
      replyTo: email,
      subject: `Contact Form: Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    console.log('Admin email sent successfully');
    console.log('SendGrid response:', JSON.stringify(adminResponse[0]?.statusCode));

    // Send confirmation email to user
    console.log('Sending confirmation email to user...');
    const userResponse = await sgMail.send({
      to: email,
      from: SENDGRID_FROM_EMAIL,
      subject: 'Thank you for contacting us!',
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p>Best regards,<br>The Nutrition Education Team</p>
      `,
      text: `Thank you for your message!\n\nHi ${name},\n\nWe've received your message and will get back to you as soon as possible.\n\nYour message:\n${message}\n\nBest regards,\nThe Nutrition Education Team`,
    });

    console.log('Confirmation email sent successfully');
    console.log('SendGrid response:', JSON.stringify(userResponse[0]?.statusCode));

    return {
      success: true,
      message: 'Contact form submitted successfully',
    };
  } catch (error) {
    console.error('Error sending contact email - Full error:', JSON.stringify(error, null, 2));
    console.error('Error response:', error.response?.body);
    throw new functions.https.HttpsError('internal', 'Failed to send contact email: ' + error.message);
  }
});
