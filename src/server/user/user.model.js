const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // name: String,
  // rib: String,
  // password: String,
  // email: String,
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  rib: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 255,
    // unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
