const axios = require('axios');

const urlApiRib = 'https://agrcf.lib.id/exercice@dev/';

const dateTransformation = (d) => {
  let nDate1 = d.split('/');
  nDate1 = `${nDate1[1]}/${nDate1[0]}/${nDate1[2]}`;

  return new Date(nDate1).getTime();
};

const mapToList = (lists) => {
  return lists.map(list => {
    const montant = list.Montant.replace(",", ".");
    const recipe = Number(montant) >= 0 ? Number(montant) : 0;
    const spent = Number(montant) >= 0 ? 0 : Math.abs(Number(montant));
    return { ...list, recipe, spent }
  })
};

const orderList = (list) => {
  let orderdedList = list.sort((a, b) => {
    return dateTransformation(a.Date) - dateTransformation(b.Date);
  });
  return orderdedList;
};

const getOperations = (datas, rib, period) => {
  const { max, min } = period;
  let lists = datas && datas.filter(op => op.RIB === rib && dateTransformation(op.Date) >= dateTransformation(min) && dateTransformation(op.Date) <= dateTransformation(max));
  lists = mapToList(orderList(lists));

  return lists;
}


module.exports.list = async (req, res) => {
  const rib = await axios.get(urlApiRib);
  if (rib && rib.data) {
    return res.json({rib: rib.data});
  }
  return res.json({rib: {}});
};

module.exports.listOneRib = async (req, res) => {
  const {params, body} = req;
  if(!params.rib || !body.max, !body.min) {
    return res.json({rib: {}});
  }
  const rib = await axios.get(urlApiRib);
  console.log({params, body, rib});
  if (rib && rib.data && rib.data.statut === "OK") {
    return res.json({rib: getOperations(rib.data.operations, params.rib, body)});
  }
  return res.json({rib: {}});
};
