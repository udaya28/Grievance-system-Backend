const mongoose = require('mongoose');

const studentDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  jointYear: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  rollNumber: {
    type: String,
    require: true,
  },
  dateOfBirth: {
    type: String,
    require: true,
  },
});

const studentDetails = mongoose.model('students',studentDetailsSchema);

module.exports = studentDetails;
