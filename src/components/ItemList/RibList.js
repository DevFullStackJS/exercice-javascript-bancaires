import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';

export const RibList = (props) => {
  const { RIB, Date, Libelle, Devise, Montant } = props;
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
        <Text>{Libelle}</Text>
        <Text note numberOfLines={1}>
          {`Date: ${Date}, RIB: ${RIB}`}
        </Text>
      </View>
      <View>
        <Text>{Montant + Devise}</Text>
      </View>
    </View>
  );
};
