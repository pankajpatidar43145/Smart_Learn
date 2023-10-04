const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Import bodyParser

// ...

// Import routes
const timestampRoutes = require("./routes/timestampRoutes");
const otpRoutes = require("./routes/otpRoutes");
const verifyRoutes = require("./routes/verifyRoutes");
const teacherDataRoutes = require("./routes/teacherDataRoutes");
const studentDataRoutes = require("./routes/studentDataRoutes");
const TempemailRoutes = require("./routes/TempemailRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const teacherauthRoutes = require("./routes/teacherauthRoutes");
const chatdataRoutes = require("./routes/chatdataRoutes");

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose
    .connect("mongodb+srv://pankajpatidar43145:wwul7sxylO4jReJi@smartlearn.i6ruapn.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");

        // Body parser middleware
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        // Use Timestamp routes
        app.use("/timestamps", timestampRoutes);
        app.use("/otpRoutes", otpRoutes);
        app.use("/verifyRoutes", verifyRoutes);
        app.use("/teacherdata", teacherDataRoutes);
        app.use("/studentdata", studentDataRoutes);
        app.use("/tempemail", TempemailRoutes);
        app.use("/contact", contactRoutes);
        app.use("/student", authRoutes);
        app.use("/teacher", teacherauthRoutes);
        app.use("/chatdata", chatdataRoutes);

        // Start the server
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB", error);
    });
