const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  ribs: [{
    type: String,
    required: true,
    minlength: 20,
    maxlength: 255,
  }],
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
});

// const User = mongoose.model('User', UserSchema);

module.exports = mongoose.models.Users || mongoose.model('Users', UserSchema);

// module.exports = User;
