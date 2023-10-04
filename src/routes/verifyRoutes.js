const express = require("express");
const router = express.Router();
const otpController = require("../controllers/verifyController.js");

// Route to store OTP
router.post("/storeotp", otpController.storeOTP);

// Route to verify OTP
router.post("/verifyotp", otpController.verifyOTP);

module.exports = router;
