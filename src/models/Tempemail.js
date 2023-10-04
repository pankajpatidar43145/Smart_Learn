const mongoose = require("mongoose");

const TempemailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tempemail", TempemailSchema);
