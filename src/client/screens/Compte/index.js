import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import Sigin from './create';
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
    // await this.props.getComptes();
    this.getStrictList(this.props.rib.operations);
  }

  signUp = async (data, callBack) => {
    this.props.signup(data, callBack);
  }

  getStrictList = (lists) => {
    // const { list } = this.props.comptes;
    // console.log({ list });
    const ls = lists && lists.map(m => m.RIB);
    let strictRIBList = ls && ls.filter((v, i) => ls.indexOf(v) === i);
    strictRIBList = strictRIBList && strictRIBList.map(l => {
      console.log('l');
      return { RIB: l };
    });
    this.setState({ strictRIBList });
  }

  setRIBId = (selectedRIB) => {
    this.setState({ selectedRIB });
  }

  render() {
    const { strictRIBList, selectedRIB } = this.state;
    return (
      <Background>
        <View style={{ flex: 1 }}>
          <Sigin
            {...this.props}
            signUp={this.signUp}
            strictRIBList={strictRIBList}
            setRIBId={this.setRIBId}
            selectedRIB={selectedRIB}
          />
        </View>
      </Background>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
