// routes.js

const express = require("express");
const router = express.Router();
const { handleFormSubmission } = require("../controllers/contactController"); // Import the controller

// Define a route for form submissions
router.post("/contactus", handleFormSubmission);

module.exports = router;
