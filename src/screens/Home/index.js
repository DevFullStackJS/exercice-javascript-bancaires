import React from 'react';
import {View, Text} from 'react-native';

import Layout from '../Layout';

import { post } from '../../services/technique/api';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    // const data = {
    //   name: 'req.body.name',
    //   password: 'req.body.password',
    //   email: 'req@body.email',
    //   rib: '18206002105487266700217'
    // }
    // const url = 'users';
    // const res = await post(url, data, 'token');
  }

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
