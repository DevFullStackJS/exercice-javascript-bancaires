import React from 'react';
import { FlatList, View, Text, Button } from 'react-native';

import { operation_trad } from '../../../config/constants';

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
    const totalRecipe = this.getTotal(ops, operation_trad.recipe_atr);
    const totalSpent = this.getTotal(ops, operation_trad.spent_atr);
    return totalRecipe - totalSpent;
  }

  getTotal = (result, p) => result.reduce((acc, cur) => acc + cur[p], 0);

  render() {
    const { rib, hideRIBInfos, ribId } = this.props;
    const { totalSold } = this.state;

    return (
      <>
        <View style={styles.sectionStyle}>
          <Text style={styles.titleText}>{`${operation_trad.rib} ${ribId}`}</Text>
        </View>
        <View style={[styles.sectionStyle, styles.theadStyle]}>
          <View style={styles.leftContainer}>
            <Text style={[styles.titleText, styles.leftAlignment]}>{operation_trad.date}</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text style={styles.titleText}>{operation_trad.libelle}</Text>
          </View>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{operation_trad.montant}</Text>
          </View>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{operation_trad.recepe}</Text>
          </View>
          <View style={styles.rigthContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{operation_trad.spent}</Text>
          </View>
        </View>
        { rib.oneRibOperation && rib.oneRibOperation.length !== 0
          ? <>
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
                <Text style={styles.titleText}>{`${operation_trad.sold} ${totalSold}`}</Text>
              </View>
            </>
          : <View style={styles.empty_operation}>
              <Text style={styles.empty_text}>{operation_trad.no_op_saved}</Text>
            </View>}
        <View>
          <Button
            title={operation_trad.cancel}
            onPress={hideRIBInfos}
          />
        </View>
      </>
    );
  }
}
