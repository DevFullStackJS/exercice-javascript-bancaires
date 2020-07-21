import constants from '../constants/rib';
import ribSapp from '../../applicatif/rib';

export const oneRibOperation = (data, callBack) => async (dispatch) => {
  const payload = await ribSapp.oneRibOperation(constants.url.oneRibOperation, data);
  callBack && callBack(payload);
  if (payload) {
    return dispatch({
      type: ribSapp.oneRibOperation,
      payload,
    });
  }
};

export const operations = (callBack) => async (dispatch) => {
  const payload = await ribSapp.operations(constants.url.operations);
  callBack && callBack(payload);
  if (payload) {
    return dispatch({
      type: constants.operations,
      payload,
    });
  }
};
