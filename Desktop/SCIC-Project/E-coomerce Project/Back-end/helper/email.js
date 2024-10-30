const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
});

const sendEmailWithNodemailer = async (emailData) => {
  try {
    const mailOptions = {
      from: smtpUsername,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Messege Sent: $", info.response);
  } catch (error) {
    console.error('Error occured when sending email', error)
    throw error
  }
};

module.exports = sendEmailWithNodemailer;
