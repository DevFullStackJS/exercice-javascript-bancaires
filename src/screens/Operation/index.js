import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import Layout from '../Layout';
import { RibList } from '../../components/ItemList/RibList';

class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    const rib = '18206002105487266700217';
    await this.props.oneRibOperation({ min: '28/03/2017', max: '12/04/2017', rib });
  }

  render() {
    const { logout, rib } = this.props;
    return (
      <Layout {...this.props} title={'Operation'} logout={logout}>
        <FlatList
          scrollEnabled
          data={rib.oneRibOperation}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <RibList {...item} />
          )}
        />
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Operation);
