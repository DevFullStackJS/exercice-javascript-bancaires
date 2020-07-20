const mongoose = require('mongoose');

const RibSchema = new mongoose.Schema({
  // name: String,
  // rib: String,
  // password: String,
  // email: String,
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  rib: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }
});

const Rib = mongoose.model('Rib', RibSchema);

module.exports = Rib;
