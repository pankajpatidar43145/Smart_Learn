// routes/teacherDataRoutes.js

const express = require("express");
const router = express.Router();
const teacherDataController = require("../controllers/teacherDaController");

// Create a new teacher data record
router.post("/create", teacherDataController.createTeacherData);

// Fetch teacher data by email
router.get("/getteacherdata", teacherDataController.getAllTeacherData);

// Change password for a teacher data record
router.post("/change-password/:email", teacherDataController.changePassword);

router.post("/check-email-exists", teacherDataController.checkEmailExists);

module.exports = router;
