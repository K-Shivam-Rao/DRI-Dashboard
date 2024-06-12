const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
});

const Year = mongoose.model("Year", yearSchema);

module.exports = Year;
