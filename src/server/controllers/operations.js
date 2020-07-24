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
  const { params, body } = req;
  const date = checkDate({ params, body });
  if (!date) {
    return res.status(400).send(invalid_date);
  }
  // eslint-disable-next-line no-irregular-whitespace
  if (!params.rib || params.rib.length < 20) {
    return res.status(400).send(errorMessage(invalid_rib));
  }
  const rib = await axios.get(urlApiRib);
  if (rib && rib.data && rib.data.statut === 'OK') {
    return res.json({ rib: getOperations(rib.data.operations, params.rib, body) });
  }
  return res.json({ rib: [] });
};
