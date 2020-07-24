import constants from '../constants/rib';
import users from '../constants/users';

const initialState = {
  operations: [],
  oneRibOperation: [],
};

const rib = (state = initialState, action) => {
  switch (action.type) {
    case constants.operations:
      return {
        ...state,
        operations: action.payload,
      };
    case constants.oneRibOperation:
      return {
        ...state,
        oneRibOperation: action.payload,
      };
    case users.logout:
      return initialState;
    default:
      return state;
  }
};

export default rib;
