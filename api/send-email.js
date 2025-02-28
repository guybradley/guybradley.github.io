// Email sending functionality using MailerSend API
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

module.exports = async (req, res) => {
  try {
    // Get form data from request
    const { userData } = req.body;
    
    if (!userData || !userData.name || !userData.email || !userData.project) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Initialize MailerSend with API key
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    // Set sender and recipient details
    const sentFrom = new Sender(
      process.env.EMAIL_FROM_ADDRESS || "website@soulcountry.app", 
      process.env.EMAIL_FROM_NAME || "SoulCountry Website"
    );
    
    const recipients = [
      new Recipient(
        process.env.EMAIL_TO || "info@soulcountry.app", 
        process.env.EMAIL_TO_NAME || "SoulCountry Digital"
      )
    ];

    // Build email content
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(`New Website Inquiry from ${userData.name}`)
      .setHtml(`
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">New Client Inquiry from Website</h2>
          
          <p style="margin: 15px 0;"><strong>Name:</strong> ${userData.name}</p>
          <p style="margin: 15px 0;"><strong>Email:</strong> <a href="mailto:${userData.email}">${userData.email}</a></p>
          
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Project Description</h3>
            <p style="margin-bottom: 0;">${userData.project}</p>
          </div>
          
          ${userData.details ? `
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Additional Details</h3>
            <p style="margin-bottom: 0;">${userData.details}</p>
          </div>` : ''}
          
          ${userData.additional ? `
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Other Information</h3>
            <p style="margin-bottom: 0;">${userData.additional}</p>
          </div>` : ''}
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px;">
            <em>Submitted via website chat on ${new Date().toLocaleString()}</em>
          </p>
        </div>
      `)
      .setText(`
New Client Inquiry from Website

Name: ${userData.name}
Email: ${userData.email}

Project Description:
${userData.project}

${userData.details ? `Additional Details:\n${userData.details}\n\n` : ''}
${userData.additional ? `Other Information:\n${userData.additional}\n\n` : ''}

Submitted via website chat on ${new Date().toLocaleString()}
      `);

    // Send email
    const response = await mailerSend.email.send(emailParams);
    
    // Send success response
    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email with MailerSend:', error);
    
    // Send error response
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};