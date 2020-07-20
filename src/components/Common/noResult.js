import React from 'react';
import {View, Text} from 'react-native';

const Noresult = ({style = {}}) => {
  return (
    <View style={{...style}}>
      <Text style={{}}>{'No Result'}</Text>
    </View>
  );
};

export default Noresult;
