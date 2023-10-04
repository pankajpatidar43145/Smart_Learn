// controllers/teacherDataController.js

const TeacherData = require("../models/TeacherDa");

// Create a new teacher data record
exports.createTeacherData = async (req, res) => {
  try {
    const { name, email, department, password } = req.body;
    const teacherData = new TeacherData({ name, email, department, password });
    const savedTeacherData = await teacherData.save();
    res.status(201).json(savedTeacherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to create teacher data" });
  }
};

// Fetch teacher data by email
exports.getAllTeacherData = async (req, res) => {
  try {
    const allTeacherData = await TeacherData.find();
    if (allTeacherData.length > 0) {
      res.status(200).json(allTeacherData);
    } else {
      res.status(404).json({ error: "No teacher data found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teacher data" });
  }
};

// Change password for a teacher data record
exports.changePassword = async (req, res) => {
  try {
    const email = req.params.email;
    const { password } = req.body;

    const teacher = await TeacherData.findOne({ email }); // Use your TeacherData model

    if (teacher) {
      teacher.password = password;
      const updatedTeacher = await teacher.save();
      res.status(200).json(updatedTeacher);
    } else {
      res.status(404).json({ error: "Teacher data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to change password" });
  }
};

// Check email existence for a Teacher data record
exports.checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;

    const existingTeacher = await TeacherData.findOne({ email });

    if (existingTeacher) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to check email existence" });
  }
};
