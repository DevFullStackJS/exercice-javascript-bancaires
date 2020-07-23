import axios from 'axios';
import config from '../../config';
import constants from '../../config/constants';
import { getOperations, checkDate, errorMessage } from '../utils';

const { urlApiRib } = config;
const { invalid_date, invalid_rib } = constants;

export const list = async (_, res) => {
  const rib = await axios.get(urlApiRib);
  if (rib && rib.data) {
    return res.json({ rib: rib.data });
  }
  return res.json({ rib: {} });
};

export const listOneRib = async (req, res) => {
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
