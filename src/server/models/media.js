const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  size: {
    type: Number,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model('Media', MediaSchema);
