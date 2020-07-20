const Rib = require('./rib.model');
const axios = require('axios');

const urlApiRib = 'https://agrcf.lib.id/exercice@dev/';

module.exports.check = async (req, res, next) => {
  const rib = await Rib.findById(req.params.id);
  if (!rib) {
    throw Error('Rib not found');
  }

  next();
};

module.exports.create = async (req, res) => {
  const rib = new Rib(req.body);
  await rib.save();

  res.json(rib);
};

module.exports.remove = async (req, res) => {
  await Rib.findByIdAndRemove(req.params.id);

  res.json(req.params.id);
};

module.exports.list = async (req, res) => {
  const rib = await axios.get(urlApiRib);
  if (rib && rib.data) {
    return res.json({rib: rib.data});
  }
  return res.json({rib: {}});
};

module.exports.update = async (req, res) => {
  const rib = await Rib.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  }).exec();

  res.json(rib);
};

module.exports.view = async (req, res) => {
  const rib = await Rib.findById(req.params.id);

  res.json(rib);
};
