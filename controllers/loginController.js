const emailValidation = require("../helpers/emailValidation");
const User = require("../model/users.js");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.send({ error: "enter an email" });
  } else if (!emailValidation(email)) {
    return res.send({ error: "enter a valid email" });
  } else if (!password) {
    return res.send({ error: "enter password" });
  } else {
    let exist_email = await User.find({ email });

    console.log("eitaaaaa", exist_email);

    if (exist_email.length > 0) {
      bcrypt.compare(password, exist_email[0].password, function (err, result) {
        if (result) {
          res.send({
            success: "Registration Successfull",
            fullName: exist_email.fullName,
            email: exist_email.email,
          });
        } else {
          res.json({ error: "password not match!" });
        }
      });
    } else {
      res.json({ error: "email not found" });
    }
  }
};

module.exports = loginController;
