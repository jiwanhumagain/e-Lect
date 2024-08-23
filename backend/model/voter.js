const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  passportNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
});

const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;
