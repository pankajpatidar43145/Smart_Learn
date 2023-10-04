const mongoose = require("mongoose");

const ChatdataSchema = mongoose.Schema({
    senderemail: {
        type: String,
        required: true,
    },

    receiveremail: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Chatdata", ChatdataSchema);