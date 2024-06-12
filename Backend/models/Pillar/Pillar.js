const mongoose = require("mongoose");

const PillarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  currentBudget: {
    type: Number,
    required: true,
  },
  additionalBudget: {
    type: Number,
    required: true,
  },
  details: [
    {
      subName: {
        type: String,
        required: true,
      },
      subValue: {
        type: Number,
        required: true,
      },
      subCurrentBudget: {
        type: Number,
        required: true,
      },
      subAdditionalBudget: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Pillar = mongoose.model("Pillar", PillarSchema);

module.exports = Pillar;
