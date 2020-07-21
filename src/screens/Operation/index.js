import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text } from 'react-native';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import Layout from '../Layout';
import { RibList } from '../../components/ItemList/RibList';

class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSold: 0,
    };
  }

  async componentDidMount() {
    const rib = '18206002105487266700217';
    await this.props.oneRibOperation({ min: '28/03/2017', max: '12/04/2017', rib });
    const totalSold = this.checkSolde(this.props.rib.oneRibOperation);
    this.setState({ totalSold });
  }

  checkSolde = (ops) => {
    const totalRecipe = this.getTotal(ops, 'recipe');
    const totalSpent = this.getTotal(ops, 'spent');
    return totalRecipe - totalSpent;
  }

  getTotal = (result, p) => result.reduce((acc, cur) => acc + cur[p], 0);

  render() {
    const { logout, rib } = this.props;
    const { totalSold } = this.state;

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
        <View>
          <Text>Solde: {totalSold}</Text>
        </View>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Operation);
