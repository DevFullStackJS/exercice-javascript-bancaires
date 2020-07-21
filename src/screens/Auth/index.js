import React from 'react';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import Layout from '../Layout';
import Sigin from './Sigin';

import { post, get } from '../../services/technique/api';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: {},
      operations: [],
    };
  }

  async componentDidMount() {
    // this.testApi();
  }

  testApiGet = async () => {
    const { token } = this.state.data;
    const url = 'rib';
    const res = await get(url, token);

    console.log({ res });
  }

  testApiGet = async () => {
    const { token } = this.state.data;
    const url = 'rib/list';
    const res = await get(url, token);

    console.log({ res });
  }

  testApiGetOneRib = async () => {
    const { token } = this.state.data;

    const rib = '18206002105487266700217';
    const url = `rib/list/${rib}`;
    const data = {
      min: '28/03/2017',
      max: '12/04/2017',
    };

    const res = await post(url, data, token);

    // if (res && res.data && res.data.rib) {
    //   const list = res.data.rib.operations;
    //   const operations = getOperations(list, "30002005500000157845Z02", { min: '10/04/2001', max: '11/04/2017' });
    //   console.log({ operations });
    // }
    // const data = {
    //   name: 'req.body.name',
    //   password: 'req112.body.password',
    //   email: 'req123@body.email',
    //   rib: '18206002105487266700299',
    // };

    console.log({ res });
  }

  signIn = async (data) => {
    // const data = { password, email};
    // const url = 'users/login';
    // const res = await post(url, data, 'token');
    // console.log({ res });
    // if (res && res.data && res.data.data) {
    //   this.setState({ data: res.data.data });
    //   const test = await get('rib/test', res.data.data.token);
    //   console.log({ test });
    // }

    this.props.signin(data);
  }

  render() {

    const { user } = this.props.users;
    console.log({ user });

    return (
      <Layout {...this.props} title={'Home'}>
        <Sigin {...this.props} signIn={this.signIn} />
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
