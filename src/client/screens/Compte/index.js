import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import { home_title } from '../../../config/constants';

import Create from './create';
import Layout from '../Layout';
import Background from '../../components/Common/background';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: {},
      operations: [],
      selectedRIB: '',
      strictRIBList: [],
    };
  }

  async componentDidMount() {
    await this.props.operations();
    this.getStrictList(this.props.rib.operations);
  }

  signUp = async (data, callBack) => {
    this.props.signup(data, callBack);
  }

  getStrictList = (lists) => {
    const ls = lists && lists.map(m => m.RIB);
    let strictRIBList = ls && ls.filter((v, i) => ls.indexOf(v) === i);
    strictRIBList = strictRIBList && strictRIBList.map(l => ({ RIB: l }));
    this.setState({ strictRIBList });
  }

  setRIBId = (selectedRIB) => {
    this.setState({ selectedRIB });
  }

  render() {
    const { logout, users } = this.props;
    const { strictRIBList, selectedRIB } = this.state;

    return (
      <Background>
        <Layout {...this.props} title={home_title} logout={logout}>
          <View style={{ flex: 1 }}>
            <Create
              {...this.props}
              signUp={this.signUp}
              strictRIBList={strictRIBList}
              setRIBId={this.setRIBId}
              selectedRIB={selectedRIB}
              user={users.user || {}}
            />
          </View>
        </Layout>
      </Background>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
