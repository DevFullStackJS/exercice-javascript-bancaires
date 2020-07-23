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

const getOperations = (datas, rib, period) => {
  const { max, min } = period;
  let lists = datas && datas.filter(op => op.RIB === rib && dateTransformation(op.Date) >= dateTransformation(min) && dateTransformation(op.Date) <= dateTransformation(max));
  lists = mapToList(orderList(lists));

  return lists;
}

const orderList = (list) => {
  let orderdedList = list.sort((a, b) => {
    return dateTransformation(a.Date) - dateTransformation(b.Date);
  });
  return orderdedList;
};

module.exports = getOperations;
