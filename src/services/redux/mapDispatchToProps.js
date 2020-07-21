import crud from './actions/crud';
import users from './actions/users';
import rib from './actions/rib';

const mapDispatchToProps = (dispatch) => ({
  getAllCrud: (payload, cb) => dispatch(crud.getAllCrud(payload, cb)),

  // Users
  signin: (payload, cb) => dispatch(users.signin(payload, cb)),
  signup: (payload, cb) => dispatch(users.signup(payload, cb)),

  // Rib
  oneRibOperation: (payload, cb) => dispatch(rib.oneRibOperation(payload, cb)),
  operations: (payload, cb) => dispatch(rib.operations(payload, cb)),
});

export default mapDispatchToProps;
