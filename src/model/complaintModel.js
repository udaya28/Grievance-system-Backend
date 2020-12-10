const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  timeStamp:{
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  complaint:{
    type: String,
    required: true,
  },
  response:{
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
});

const complaint = mongoose.model('complaints',complaintSchema);

module.exports = complaint;
