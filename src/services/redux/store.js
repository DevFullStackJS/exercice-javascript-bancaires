import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';

// Store In the previous sections, we defined the actions that represent the facts about "what happened"
// and the reducers that update the state according to those actions.
// The Store is the object that brings them together.

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['navigation'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  pReducer,
  compose(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);

export default store;
