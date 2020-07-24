const axios = require('axios');
const config = require('../../config');
const constants = require('../../config/constants');
const { getOperations, checkDate, errorMessage } = require('../utils');

const { urlApiRib } = config;
const { invalid_date, invalid_rib } = constants;

module.exports.list = async (_, res) => {
  const rib = await axios.get(urlApiRib);
  if (rib && rib.data) {
    return res.json({ rib: rib.data });
  }
  return res.json({ rib: {} });
};

module.exports.listOneRib = async (req, res) => {
  const { min, max, rib } = req.params;
  const date = checkDate({ min, max });
  if (!date) {
    return res.status(400).send(errorMessage(invalid_date));
  }
  // eslint-disable-next-line no-irregular-whitespace
  if (!rib || rib.length < 20) {
    return res.status(400).send(errorMessage(invalid_rib));
  }
  const ribs = await axios.get(urlApiRib);
  if (ribs && ribs.data && ribs.data.statut === 'OK') {
    return res.json({ ribs: getOperations(ribs.data.operations, rib, { min, max }) });
  }
  return res.json({ rib: [] });
};
