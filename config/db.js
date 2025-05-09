const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema({
  name: String,
  relationship: String,
  phone: String,
  email: String
});

const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  emergencyContacts: [EmergencyContactSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
