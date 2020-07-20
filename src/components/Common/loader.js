import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Loader = ({style = {}}) => {
  return (
    <View style={{...style}}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loader;
