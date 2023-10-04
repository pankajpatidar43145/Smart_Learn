// routes/StudentDataRoutes.js

const express = require("express");
const router = express.Router();
const studentDataController = require("../controllers/studentDaController");

// Create a new Student data record
router.post("/create", studentDataController.createStudentData);

// Fetch Student data by email
router.get("/getstudentdata", studentDataController.getAllStudentData);

// Change password for a Student data record
router.post("/change-password/:email", studentDataController.changePassword);

router.post("/check-email-exists", studentDataController.checkEmailExists);

module.exports = router;
