const bcrypt = require("bcrypt");
const emailValidation = require("../helpers/emailValidation");
const Users = require("../model/users.js");
const sendEmail = require("../helpers/sendEmail.js");
const otpTemplate = require("../helpers/otpTemplate.js");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

let registrationController = async (req, res) => {
  const { fullName, email, password, avatar, facebookID, linkedinID } =
    req.body;

  if (!fullName) {
    return res.send({ error: "enter fullname" });
  } else if (!email) {
    return res.send({ error: "enter an email" });
  } else if (!emailValidation(email)) {
    return res.send({ error: "enter a valid email" });
  } else if (!password) {
    return res.send({ error: "enter password" });
  } else {
    let duplicateEmail = await Users.find({ email });

    if (duplicateEmail.length > 0) {
      return res.send({ error: "email already exist!" });
    }
  }

  bcrypt.hash(password, 10, async function (err, hash) {
    const user = new Users({
      fullName,
      email,
      password: hash,
      avatar,
      facebookID,
      linkedinID,
    });
    user.save();
    const generator2 = aleaRNGFactory(Date.now());
    const randomNumber = generator2.uInt32().toString().substring(0, 4);
    const reandoOtpStore = await Users.findOneAndUpdate(
      { email },
      { $set: { randomOtp: randomNumber } },
      { new: true }
    );
    sendEmail(email, randomNumber, otpTemplate);
    // setTimeout(async () => {
    //   console.log("otp deleted");
    //   const reandoOtpStore = await Users.findOneAndUpdate(
    //     { email },
    //     { $unset: { randomOtp: "" } },
    //     { new: true }
    //   );
    // }, 5000);
    res.send({
      success: "Registration Successfull, please check your email!",
      fullName: user.fullName,
      email: user.email,
    });
  });
};

module.exports = registrationController;
