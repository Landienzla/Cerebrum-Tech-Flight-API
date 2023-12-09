import nodemailer from "nodemailer";

export const verificationEmailTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    .container {
      padding: 20px;
      text-align: center;
      font-family: Arial, sans-serif;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 20px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Email Verification</h1>
    <p>Hello,</p>
    <p>Thank you for registering. Please click the link below to verify your email address.</p>
    <a href="{{verificationLink}}" class="button">Verify Email</a>
    <p>or </p>
    <p>use this code "{{verificationCode}}" </p>
    <p>This code will be expire in 24 hours</p>
  </div>
</body>

</html>`;

async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS, // Use environment variable for Gmail address
      pass: process.env.GMAIL_PASSWORD, // Use environment variable for Gmail password or App Password
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_ADDRESS, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    // text: text, // plain text body
    html: text, // html body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

export default sendEmail;
