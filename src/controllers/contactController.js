// formController.js

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "teacherstudent07779@gmail.com",
    pass: "ojkpvxwprpxgcntb",
  },
});

const recipientEmail = "teacherstudent07779@gmail.com";

const sendEmail = async (fullName, email, message) => {
  const mailOptions = {
    from: "teacherstudent07779@gmail.com",
    to: recipientEmail,
    subject: "New Form Submission",
    text: `Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const handleFormSubmission = async (req, res) => {
  const { fullName, email, message } = req.body;

  try {
    if (!fullName || !email || !message) {
      return res.status(400).json({ error: "All fields are necessary" });
    }

    // Send email
    await sendEmail(fullName, email, message);

    // Return a success response
    return res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { handleFormSubmission };
