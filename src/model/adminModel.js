const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
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

adminSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.pre('updateOne', async function (next) {
  if (this._update.password !== undefined) {
    const salt = await bcrypt.genSalt();
    this._update.password = await bcrypt.hash(this._update.password, salt);
  }
  next();
});

const AdminDetails = mongoose.model('admins', adminSchema);

module.exports = AdminDetails;
