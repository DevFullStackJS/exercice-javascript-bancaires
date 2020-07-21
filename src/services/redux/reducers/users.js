import constants from '../constants/crud';

const initialState = {
  users: [],
  user: {},
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case constants.signinUSER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default users;
