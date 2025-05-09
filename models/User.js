// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,resetCode: String,
    resetCodeExpire: Date,
    
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
