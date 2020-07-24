module.exports.errorMessage = message => ({ error: { message } });

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

module.exports.checkDate = ({ min, max }) => {
  if (max && min) {
    const nDate1 = new Date(min).getTime();
    const nDate2 = new Date(max).getTime();
    return typeof nDate1 === 'number' && typeof nDate2 === 'number' && nDate1 > 9000 && nDate2 > 9000;
  }

  return false;
};

module.exports.getOperations = (datas, rib, period) => {
  const { max, min } = period;
  let lists = datas && datas.filter(
    op => op.RIB === rib
    && dateTransformation(op.Date) >= new Date(min).getTime()
    && dateTransformation(op.Date) <= new Date(max).getTime(),
  );
  lists = mapToList(orderList(lists));

  return lists;
};
