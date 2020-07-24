import React from 'react';
import {
  View,
  // Image,
  Text,
  Dimensions,
} from 'react-native';

import { styles } from './RibList.styles';

const { width } = Dimensions.get('window');

export const RibList = (props) => {
  const { Libelle, Date, Montant, recipe, spent } = props;
  return (
    <View>
      <View>
        <View style={[styles.headList, { justifyContent: 'space-between', padding: 10, margin: 8 }]}>
          <View style={{ width: width / 5 }}>
            <Text style={[styles.titleText, { textAlign: 'left' }]}>{Date}</Text>
          </View>
          <View style={{ width: width / 5 }}>
            <Text numberOfLines={1} style={styles.titleText}>{Libelle}</Text>
          </View>
          <View style={{ width: width / 6 }}>
            <Text style={[styles.titleText, { textAlign: 'right' }]}>{Montant}</Text>
          </View>
          <View style={{ width: width / 6 }}>
            <Text style={[styles.titleText, { textAlign: 'right' }]}>{recipe}</Text>
          </View>
          <View style={{ width: width / 7 }}>
            <Text style={[styles.titleText, { textAlign: 'right' }]}>{spent}</Text>
          </View>
        </View>
      </View>
      <View style={styles.separate} />
    </View>
  );
};
