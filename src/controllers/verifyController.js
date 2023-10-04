const Otp = require("../models/Otp"); // Replace with the correct path to your OTP model file

// Controller function to store OTP
exports.storeOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const savedOtp = await Otp.create({ email, otp });
    res.status(201).json(savedOtp);
  } catch (error) {
    res.status(500).json({ error: "Failed to store OTP" });
  }
};

// Controller function to verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedOtp = await Otp.findOne({ email, otp });

    if (storedOtp) {
      const createdAt = storedOtp.createdAt;
      const currentTime = new Date();
      const timeDifference = (currentTime - createdAt) / (1000 * 60 * 60); // Calculate time difference in hours

      if (timeDifference <= 24) {
        // OTP is valid for 24 hours (1 day)
        res.status(200).json({ message: "OTP verified successfully" });
      } else {
        res.status(400).json({ error: "OTP has expired" });
      }
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};
