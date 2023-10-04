const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TeacherData = require("../models/TeacherDa");

exports.login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await TeacherData.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Store your secret key in an environment variable
        const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key";

        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
            expiresIn: "1h", // Set the token expiration time as needed
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Login failed" });
    }
};