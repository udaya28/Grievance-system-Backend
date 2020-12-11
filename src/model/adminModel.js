const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
  type: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

const AdminDetails = mongoose.model('admins', adminSchema);

module.exports = AdminDetails;
