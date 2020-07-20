/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import store, {persistor} from './services/redux/store';

import Home from './screens/Home';
import AuthStack from './screens/Auth';

const App = (props) => {
  const {loggingIn} = props;

  if (loggingIn) {
    return <Home {...props} />;
  }
  return <AuthStack />;
};



const AppMain = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppMain;
