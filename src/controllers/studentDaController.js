// controllers/StudentDataController.js

const StudentData = require("../models/StudentDa");

// Create a new Student data record
exports.createStudentData = async (req, res) => {
  try {
    const { name, email, department, password } = req.body;
    const studentData = new StudentData({ name, email, department, password });
    const savedStudentData = await studentData.save();
    res.status(201).json(savedStudentData);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Student data" });
  }
};

// Fetch Student data by email
exports.getAllStudentData = async (req, res) => {
  try {
    const allStudentData = await StudentData.find();
    if (allStudentData.length > 0) {
      res.status(200).json(allStudentData);
    } else {
      res.status(404).json({ error: "No Student data found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Student data" });
  }
};

// Change password for a Student data record
exports.changePassword = async (req, res) => {
  try {
    const email = req.params.email;
    const { password } = req.body;

    const student = await StudentData.findOne({ email }); // Use your existing model

    if (student) {
      student.password = password;
      const updatedStudent = await student.save();
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ error: "Student data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to change password" });
  }
};

exports.checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;

    const existingStudent = await StudentData.findOne({ email });

    if (existingStudent) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to check email existence" });
  }
};
