import React from 'react';
import {View, Text} from 'react-native';

import Layout from '../Layout';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {}

  render() {
    return (
      <Layout {...this.props} title={'Home'}>
        <View>
          <Text>Welecom TP RN !!!</Text>
        </View>
      </Layout>
    );
  }
}
