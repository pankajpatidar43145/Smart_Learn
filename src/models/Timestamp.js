const mongoose = require("mongoose");

const TimestampSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  videoLink: {
    type: String,
    required: true,
  },

  videoDescription: {
    type: String,
    required: true,
  },

  timestamps: [
    {
      timestamp: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Timestamp", TimestampSchema);
