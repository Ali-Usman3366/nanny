const mongoose = require("mongoose");

const EmpAuthSchema = new mongoose.Schema({
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
  TRICN: {
    type: Number,
    required: true,
  },
  source_income: {
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
});

const EmpSchema = mongoose.model("Employee", EmpAuthSchema);
module.exports = EmpSchema;
