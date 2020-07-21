import React from 'react';
import { View, Dimensions } from 'react-native';

import ListScrollView from './ScrollViewLayout';
import Noresult from '../Common/noResult';

const ListView = (props) => {
  const { list, index, setSlice, ItemView } = props;

  const isNotVoid = list && Array.isArray(list);
  return (
    <ListScrollView getAfter={setSlice} list={list} page={5} index={index}>
      <View>
        {isNotVoid &&
          list.slice(0, index).map((item) => <ItemView key={item._id} {...item} />)}
      </View>
      {!isNotVoid && (
        <View style={{ paddingTop: Dimensions.get('window').height / 2 }}>
          <Noresult />
        </View>
      )}
    </ListScrollView>
  );
};

export default ListView;
