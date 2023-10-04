const Chatdata = require("../models/chatdata"); // Adjust the path to your model

// Controller function to post chat data
const postChatData = async(req, res) => {
    try {
        const chatData = new Chatdata(req.body);
        const savedData = await chatData.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to fetch data by receiver email
const getChatDataByReceiverAndSender = async(req, res) => {
    try {
        const { receiveremail, senderemail } = req.params;

        const data = await Chatdata.find({
            $or: [
                { receiveremail: receiveremail, senderemail: senderemail },
                { receiveremail: senderemail, senderemail: receiveremail },
            ],
        });

        // Add isSender property to each message
        const messagesWithSenderInfo = data.map((message) => ({
            ...message.toObject(),
            isSender: message.senderemail === senderemail,
        }));

        res.status(200).json(messagesWithSenderInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to fetch data by sender email
const getChatDataBySenderAndReceiver = async(req, res) => {
    try {
        const { senderemail, receiveremail } = req.params;

        const data = await Chatdata.find({
            $or: [{ senderemail: senderemail, receiveremail: receiveremail }],
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postChatData,
    getChatDataByReceiverAndSender,
    getChatDataBySenderAndReceiver,
};