import constants from '../constants/crud';

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
        operations: action.payload,
      };
    default:
      return state;
  }
};

export default users;
