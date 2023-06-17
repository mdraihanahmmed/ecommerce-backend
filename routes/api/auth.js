const express = require("express");

const router = express.Router();
const registrationController = require("../../controllers/registrationController.js");
const loginController = require("../../controllers/loginController.js");
const emailVarificationOtpMatch = require("../../controllers/emailVarificationOtpMatch.js");

router.post("/registration", registrationController);
router.post("/login", loginController);
router.post("/emailvarificationotpmatch", emailVarificationOtpMatch);

module.exports = router;
