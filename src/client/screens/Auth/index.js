import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import Sigin from './Sigin';
import Background from '../../components/Common/background';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: {},
      operations: [],
    };
  }

  signIn = async (data, callBack) => {
    this.props.signin(data, callBack);
  }

  signUp = async (data, callBack) => {
    this.props.signup(data, callBack);
  }

  render() {
    return (
      <Background>
        <View style={{ flex: 1 }}>
          <Sigin {...this.props} signIn={this.signIn} signUp={this.signUp} />
        </View>
      </Background>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
