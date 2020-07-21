// import { applyMiddleware, createStore, compose } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';

// import thunk from 'redux-thunk';
// import { Platform } from 'react-native';
// // import storage from 'redux-persist/lib/storage';
// import storage from '@react-native-community/async-storage';
// import rootReducer from './reducers';

// // Store In the previous sections, we defined the actions that represent the facts about "what happened"
// // and the reducers that update the state according to those actions.
// // The Store is the object that brings them together.

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['navigation'],
// };

// const pReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   pReducer,
//   compose(applyMiddleware(thunk)),
// );

// export const persistor = persistStore(store);

// export default store;

import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import storage from '@react-native-community/async-storage';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, compose(applyMiddleware(thunk)));

export const persistor = persistStore(store);

export default store;
