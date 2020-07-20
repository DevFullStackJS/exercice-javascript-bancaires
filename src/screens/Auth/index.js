import React from 'react';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import Layout from '../Layout';
import Sigin from './Sigin';

// import { post } from '../../services/technique/api';

class Home extends React.Component {
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

    console.log(this.props);
    return (
      <Layout {...this.props} title={'Home'}>
        <Sigin {...this.props} />
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
