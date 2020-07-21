/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { connect } from 'react-redux';

import mapStateToProps from '../services/redux/mapStateToProps';
import mapDispatchToProps from '../services/redux/mapDispatchToProps';

import Home from './Home';
import AuthStack from './Auth';

class AppMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  // async componentDidMount() {}

  render() {
    const { user } = this.props.users;
    console.log({ user });

    if (user && user.token) {
      return <Home {...this.props} />;
    }
    return <AuthStack />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppMain);
