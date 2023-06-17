const User = require("../model/users.js");

let emailVarificationOtpMatch = async (req, res) => {
  const { email, randomOtp } = req.body;

  let findOtp = await User.find({ email });

  if (findOtp.length > 0) {
    if (randomOtp == findOtp[0].randomOtp) {
      const removeOtpAfterMatch = await User.findOneAndDelete(
        { email },
        { $unset: { randomOtp: "" } },
        { new: true }
      );

      res.json({ success: "OTP match" });
    } else {
      res.json({ error: "OTP not match" });
    }
  } else {
    res.json({ error: "email is not found!" });
  }

  //   console.log("new hit", findOtp);
};

module.exports = emailVarificationOtpMatch;
