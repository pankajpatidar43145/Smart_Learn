const express = require("express");
const teacherauthController = require("../controllers/teacherauthController");

const router = express.Router();

// Login route
router.post("/teacherlogin", teacherauthController.login);

module.exports = router;