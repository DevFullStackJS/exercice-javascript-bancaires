import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { styles } from './RibList.styles';

export const RibList = (props) => {
  const { Libelle, Date, Montant, recipe, spent } = props;
  return (
    <View>
      <View>
        <View style={styles.headList}>
          <View style={styles.leftContainer}>
            <Text style={[styles.titleText, styles.leftAlignment]}>{Date}</Text>
          </View>
          <View style={styles.leftContainer}>
            <Text numberOfLines={1} style={styles.titleText}>{Libelle}</Text>
          </View>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{Montant}</Text>
          </View>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{recipe}</Text>
          </View>
          <View style={styles.rigthContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{spent}</Text>
          </View>
        </View>
      </View>
      <View style={styles.separate} />
    </View>
  );
};
