const nodemailer = require("nodemailer");
const axios = require("axios");
const EMAIL_SENDER = "teacherstudent07779@gmail.com"; // Replace with your Gmail email address
const EMAIL_SENDER_PASSWORD = "ojkpvxwprpxgcntb"; // Replace with your App Password

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_SENDER,
    pass: EMAIL_SENDER_PASSWORD,
  },
});

// Function to generate a random 4-digit numerical OTP
function generateNumericOTP() {
  const min = 100000; // Minimum value (inclusive)
  const max = 999999; // Maximum value (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Controller function to send OTP via email
exports.sendOTP = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Generate a 4-digit numerical OTP
  const otp = generateNumericOTP();

  const mailOptions = {
    from: EMAIL_SENDER,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for email verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to send OTP" });
    }

    // Return the OTP in the response
    return res.status(200).json({ message: "OTP sent successfully", otp });
  });
};


// Controller function to verify OTP (You should add your OTP verification logic here)
exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  // Here you should compare the provided OTP with the one sent to the user's email.
  // You can store the OTP in a database or a temporary storage and then compare it.

  // For this example, we'll just simulate a successful verification.
  const isOtpValid = true;

  if (isOtpValid) {
    return res.status(200).json({ message: "OTP is valid" });
  } else {
    return res.status(400).json({ message: "OTP is invalid" });
  }
};
