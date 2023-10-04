const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");

// Route for sending OTP via email
router.post("/send-otp", otpController.sendOTP);

// Route for verifying OTP
router.post("/verify-otp", otpController.verifyOTP);

module.exports = router;
