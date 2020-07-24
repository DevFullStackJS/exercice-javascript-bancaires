import React from 'react';
import { FlatList, View, Text, Dimensions, Button } from 'react-native';

import { RibList } from '../../components/ItemList/RibList';
import { styles } from './index.styles';

export default class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSold: 0,
    };
  }

  async componentDidMount() {
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
    const { rib, hideRIBInfos, ribId } = this.props;
    const { totalSold } = this.state;
    const { width } = Dimensions.get('window');

    return (
      <>
        <View style={styles.sectionStyle}><Text style={styles.titleText}>{`RIB: ${ribId}`}</Text></View>
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
        <View>
          <Button
            title='Cancel'
            onPress={hideRIBInfos}
          />
        </View>
      </>
    );
  }
}
