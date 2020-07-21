import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';

import { styles } from './RibList.styles';

export const RibList = (props) => {
  const { Libelle, Date, Montant, recipe, spent } = props;
  return (
    <View Image>
      <View>
        <Image
          source={{
            uri: 'http://robohash.org/set_set1/bgset_bg2/kQqaIfGqxsjFoNIT',
          }}
        />
      </View>
      <View>
        {/* <Text>{Libelle}</Text>
        <Text note numberOfLines={1}>
          {`Date: ${Date}, RIB: ${RIB} Montant: ${Montant} recipe: ${recipe} spent: ${spent}`}
        </Text> */}

        <View style={styles.headList}>
          <View style={styles.titleView} />
          <Text style={styles.titleText}>{Date}</Text>
          <View style={styles.titleView} />
          <Text style={styles.titleText}>{Libelle}</Text>
          <View style={styles.titleView} />
          <Text style={styles.titleText}>{Montant}</Text>
          <View style={styles.titleView} />
          <Text style={styles.titleText}>{recipe}</Text>
          <View style={styles.titleView} />
          <Text style={styles.titleText}>{spent}</Text>
        </View>
      </View>
      <View style={styles.separate} />
        {/* <Text>{Montant + Devise}</Text>
      </View> */}
    </View>
  );
};
