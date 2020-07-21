import constants from '../constants/users';
import usersSapp from '../../applicatif/users';

export const signin = (data, callBack) => async (dispatch) => {
  const payload = await usersSapp.signin(constants.url.siginn, data);
  callBack && callBack(payload);
  if (payload) {
    return dispatch({
      type: constants.signinUSER,
      payload,
    });
  }
};

export const signup = (data, callBack) => async (dispatch) => {
  const payload = await usersSapp.signup(constants.url.signup, data);
  callBack && callBack(payload);
  if (payload) {
    return dispatch({
      type: constants.sigunUSER,
      payload,
    });
  }
};
