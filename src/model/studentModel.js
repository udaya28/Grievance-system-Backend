const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const studentDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Enter first name'],
    minlength: [3, 'first name should be greater than 3'],
  },
  secondName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [3, 'first name should be greater than 3'],
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

studentDetailsSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

studentDetailsSchema.pre('updateOne', async function (next) {
  if (this._update.password !== undefined) {
    const salt = await bcrypt.genSalt();
    this._update.password = await bcrypt.hash(this._update.password, salt);
  }
  next();
});

const studentDetails = mongoose.model('students', studentDetailsSchema);

module.exports = studentDetails;
