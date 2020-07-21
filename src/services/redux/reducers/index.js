import { combineReducers } from 'redux';
import crud from './crud';
import users from './users';
import rib from './rib';

const reducers = combineReducers({
  crud,
  users,
  rib,
});

export default reducers;
