const axios = require('axios');

const urlApiRib = 'https://agrcf.lib.id/exercice@dev/';

const dateTransformation = (d) => {
  let nDate1 = d.split('/');
  nDate1 = `${nDate1[1]}/${nDate1[0]}/${nDate1[2]}`;

  return new Date(nDate1).getTime();
};

const mapToList = (lists) => lists.map(list => {
    const montant = list.Montant.replace(',', '.');
    const recipe = Number(montant) >= 0 ? Number(montant) : 0;
    const spent = Number(montant) >= 0 ? 0 : Math.abs(Number(montant));
    return { ...list, recipe, spent };
  });

const orderList = (list) => {
  const orderdedList = list.sort((a, b) => dateTransformation(a.Date) - dateTransformation(b.Date));
  return orderdedList;
};

const getOperations = (datas, rib, period) => {
  const { max, min } = period;
  let lists = datas && datas.filter(
    op => op.RIB === rib
    && dateTransformation(op.Date) >= dateTransformation(min)
    && dateTransformation(op.Date) <= dateTransformation(max),
  );
  lists = mapToList(orderList(lists));

  return lists;
};

module.exports.list = async (req, res) => {
  const rib = await axios.get(urlApiRib);
  if (rib && rib.data) {
    return res.json({ rib: rib.data });
  }
  return res.json({ rib: {} });
};

module.exports.testApi = async (req, res) => {
  const dbUrl = process.env.DB_CONNECT;
  const TOKEN_SECRET = process.env.TOKEN_SECRET;
  res.json({ message: 'It works!', dbUrl, TOKEN_SECRET });
};

module.exports.listOneRib = async (req, res) => {
  const { params, body } = req;
  // eslint-disable-next-line no-irregular-whitespace
  if (!params.rib || !body.max || !body.min) {
    return res.status(400).send('Invalid date or Rib');
  }
  const rib = await axios.get(urlApiRib);
  if (rib && rib.data && rib.data.statut === 'OK') {
    return res.json({ rib: getOperations(rib.data.operations, params.rib, body) });
  }
  return res.json({ rib: {} });
};
