// routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const emailController = require("../controllers/TempemailController");

// Create a new email
router.post("/addtempemail", emailController.createEmail);
// Delete all emails
router.get("/deletetempemail", emailController.deleteAllEmails);

router.get("/gettempemail", emailController.getAllEmails);

module.exports = router;
