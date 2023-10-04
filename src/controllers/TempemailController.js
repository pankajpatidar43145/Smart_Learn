// controllers/emailController.js
const Tempemail = require("../models/Tempemail");
const jwt = require("jsonwebtoken");
// Create a new email
exports.createEmail = (req, res) => {
    try {
        const { email } = req.body;

        // Replace 'your-secret-key' with your actual secret key for token signing
        const secretKey = "your-secret-key";

        // Create a token with the email as payload
        const token = jwt.sign({ email }, secretKey);

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create email token" });
    }
};

exports.getAllEmails = async(req, res) => {
    try {
        const emails = await Tempemail.find(); // Retrieve all emails from the database
        res.status(200).json(emails); // Return the emails as a JSON response
    } catch (err) {
        console.error("Error fetching emails:", err);
        res.status(500).json({ error: "Failed to fetch emails" });
    }
};

exports.deleteAllEmails = async(req, res) => {
    try {
        const deleteResult = await Tempemail.deleteMany({});

        if (deleteResult.deletedCount === 0) {
            // No emails were found to delete
            res.status(404).json({ message: "No emails found to delete" });
        } else {
            // Emails were successfully deleted
            res.status(204).send();
        }
    } catch (err) {
        console.error("Error deleting emails:", err);
        res.status(500).json({ error: "Failed to delete emails" });
    }
};