import constants from '../constants/rib';
import ribSapp from '../../applicatif/rib';

export const oneRibOperation = (data, callBack) => async (dispatch) => {
  const res = await ribSapp.oneRibOperation(`${constants.url.oneRibOperation}${data.rib}`, data);
  callBack && callBack(res);
  if (res && res.data && res.data.rib) {
    return dispatch({
      type: constants.oneRibOperation,
      payload: res.data.rib,
    });
  }
};

export const operations = (callBack) => async (dispatch) => {
  const res = await ribSapp.operations(constants.url.operations);
  callBack && callBack(res);
  if (res && res.data && res.data.rib) {
    return dispatch({
      type: constants.operations,
      payload: res.data.rib.operations,
    });
  }
};

export default { operations, oneRibOperation };
