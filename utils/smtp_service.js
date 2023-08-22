const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Hostinger SMTP server
  port: +process.env.SMTP_PORT, // Port for sending mail
  secure: true, // Use SSL (false for TLS)
  auth: {
    user: process.env.SMTP_USER, // Your email address
    pass: process.env.SMTP_PASS, 
  },
});


function sendAlertMail({ subject, text, to, html }){
  const mailOptions = {
    from: 'wogood@bilsjekk.in', // Sender address
    to: 'Me@mutaz.no', // Recipient address
    subject: subject,
    text: text,
    html: html
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = {
  sendAlertMail
}