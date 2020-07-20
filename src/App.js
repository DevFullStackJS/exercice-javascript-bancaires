/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

// import Loading from './components/Loading';
import Home from './screens/Home';
import AuthStack from './screens/Auth';

const App = (props) => {
  const {loggingIn} = props;

  if (loggingIn) {
    return <Home {...props} />;
  }
  return <AuthStack />;
};

export default App;
