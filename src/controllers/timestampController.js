const Timestamp = require("../models/Timestamp");

// Controller for adding a new timestamp
exports.addTimestamp = async (req, res) => {
  try {
    const { email, videoLink, videoDescription, timestamps } = req.body;

    // Check for required fields
    if (!email || !videoLink || !videoDescription) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new Timestamp document
    const newTimestamp = new Timestamp({
      email,
      videoLink,
      videoDescription,
      timestamps: timestamps || [],
    });

    // Save the document to the database
    const savedTimestamp = await newTimestamp.save();

    // Respond with the saved document
    res.status(201).json(savedTimestamp);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for fetching all Timestamps
exports.getAllTimestamps = async (req, res) => {
  try {
    const allTimestamps = await Timestamp.find();
    res.status(200).json(allTimestamps);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getTimestampsByEmail = async (req, res) => {
  try {
    const { email } = req.query; // Assuming you pass the email as a query parameter

    // Find timestamps that match the provided email
    const timestamps = await Timestamp.find({ email });

    res.status(200).json(timestamps);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for fetching video data by index
exports.getVideoDataByIndex = async (req, res) => {
  try {
    const { email, index } = req.query; // Get the email and index from the query parameters

    // Fetch data for the specified email
    const videoDataWithEmail = await Timestamp.find({ email });

    if (!videoDataWithEmail || videoDataWithEmail.length === 0) {
      // Handle the case where data for the specified email is not found
      return res.status(404).json({ error: "Data not found for the email" });
    }

    // Check if the index is valid
    if (index >= 0 && index < videoDataWithEmail.length) {
      // Get the data at the specified index
      const videoDataAtIndex = videoDataWithEmail[index];
      res.status(200).json(videoDataAtIndex);
    } else {
      // Handle the case where the index is out of bounds
      res.status(404).json({ error: "Data not found at the specified index" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
