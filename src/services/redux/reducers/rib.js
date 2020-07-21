import constants from '../constants/rib';

const initialState = {
  operations: [],
  oneRibOperation: [],
};

const users = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default users;
