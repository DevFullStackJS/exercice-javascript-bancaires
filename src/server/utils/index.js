export const errorMessage = messaga => ({ error: { messaga } });

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

export const checkDate = (period) => {
  const { max, min } = period;
  if (max && min) {
    let nDate1 = min.split('/');
    nDate1 = `${nDate1[1]}/${nDate1[0]}/${nDate1[2]}`;
    let nDate2 = min.split('/');
    nDate2 = `${nDate1[1]}/${nDate1[0]}/${nDate1[2]}`;
    if (new Date(nDate1).getTime() && new Date(nDate2).getTime()) {
      return true;
    }
  }

  return false;
};

export const getOperations = (datas, rib, period) => {
  const { max, min } = period;
  let lists = datas && datas.filter(
    op => op.RIB === rib
    && dateTransformation(op.Date) >= dateTransformation(min)
    && dateTransformation(op.Date) <= dateTransformation(max),
  );
  lists = mapToList(orderList(lists));

  return lists;
};
