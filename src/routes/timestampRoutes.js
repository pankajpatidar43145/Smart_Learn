const express = require("express");
const router = express.Router();
const timestampController = require("../controllers/timestampController");

// Route for adding a new timestamp
router.post("/addTimestamp", timestampController.addTimestamp);

// Route for fetching all Timestamps
router.get("/getAllTimestamps", timestampController.getAllTimestamps);

router.get("/getTimestampsByEmail", timestampController.getTimestampsByEmail);

router.get("/getVideoDataByIndex", timestampController.getVideoDataByIndex);

module.exports = router;
