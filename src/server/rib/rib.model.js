const mongoose = require('mongoose');

const RibSchema = new mongoose.Schema({
  montant: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  libelle: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  devise: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  date: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 255,
  },
});

const Rib = mongoose.model('Rib', RibSchema);

module.exports = Rib;
