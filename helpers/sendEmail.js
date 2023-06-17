const nodemailer = require("nodemailer");

async function sendEmail(email, verify, template) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "raihan.cit.bd@gmail.com",
      pass: "yhcfvwibinrjiyov",
    },
  });

  let info = await transporter.sendMail({
    from: "raihan.cit.bd@gmail.com",
    to: email,
    subject: "please verify your email",
    html: template(verify),
  });
}

module.exports = sendEmail;
