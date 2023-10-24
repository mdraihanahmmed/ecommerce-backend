const express = require("express");

const router = express.Router();
const registrationController = require("../../controllers/registrationController.js");
const loginController = require("../../controllers/loginController.js");
const emailVarificationOtpMatch = require("../../controllers/emailVarificationOtpMatch.js");
const {
  becomeMerchant,
  merchantStatusController,
} = require("../../controllers/becomeMerchant.js");

router.post("/registration", registrationController);
router.post("/login", loginController);
router.post("/emailvarificationotpmatch", emailVarificationOtpMatch);
router.post("/becomemerchant", becomeMerchant);
router.post("/merchantstatus", merchantStatusController);

module.exports = router;
