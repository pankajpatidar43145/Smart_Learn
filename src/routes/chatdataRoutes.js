const express = require("express");
const router = express.Router();
const chatdataController = require("../controllers/chatdataController"); // Adjust the path to your controller

// Route to post chat data
router.post("/chatdata", chatdataController.postChatData);

// Route to fetch data by receiver email
router.get(
    "/chatdata/:receiveremail/:senderemail",
    chatdataController.getChatDataByReceiverAndSender
);

// Route to fetch data by sender email
router.get(
    "/chatdatadata/:senderemail/:receiveremail",
    chatdataController.getChatDataBySenderAndReceiver
);

module.exports = router;