const mongoose = require("mongoose");

const nannyAuthSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  phon_number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  documents: {
    type: Array,
  },
  education: {
    type: [Object],
  },
  experience: {
    type: [Object],
  },
});

const nannySchema = mongoose.model("Nanny", nannyAuthSchema);
module.exports = nannySchema;
