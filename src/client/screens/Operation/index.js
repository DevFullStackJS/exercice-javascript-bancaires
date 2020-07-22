import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, Dimensions } from 'react-native';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import Layout from '../Layout';
import { RibList } from '../../components/ItemList/RibList';
import { styles } from './index.styles';

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
    const { oneRibOperation } = this.props.rib;
    const totalSold = oneRibOperation ? this.checkSolde(oneRibOperation) : 0;
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
    const { width } = Dimensions.get('window');

    return (
      <Layout {...this.props} title={'Opération'} logout={logout}>
        <View style={styles.sectionStyle}><Text style={styles.titleText}>RIB:18206002105487266700217</Text></View>
        <View style={[styles.sectionStyle, { justifyContent: 'space-between', padding: 10 }]}>
          <View style={{ width: width / 6 }}>
            <Text style={[styles.titleText, { textAlign: 'left' }]}>Date</Text>
          </View>
          <View style={{ width: width / 5 }}>
            <Text style={styles.titleText}>Libelle</Text>
          </View>
          <View style={{ width: width / 6 }}>
            <Text style={[styles.titleText, { textAlign: 'right' }]}>Montant</Text>
          </View>
          <View style={{ width: width / 6 }}>
            <Text style={[styles.titleText, { textAlign: 'right' }]}>Recettes</Text>
          </View>
          <View style={{ width: width / 6 }}>
            <Text style={[styles.titleText, { textAlign: 'right' }]}>Dépenses</Text>
          </View>
        </View>
        <FlatList
          scrollEnabled
          data={rib.oneRibOperation}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <RibList {...item} />
          )}
        />
        <View style={styles.sectionStyle}>
          <View style={styles.showTotal} />
          <Text style={styles.titleText}>SOLDE:   {totalSold}</Text>
        </View>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Operation);
