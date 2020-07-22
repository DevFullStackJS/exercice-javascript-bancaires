import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';

import Loading from '../Common/loader';

const isCheckToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;

const ListScrollView = (props) => {
  const { children, index, getAfter, list, page, loading } = props;
  const [isCheckTo, setToBottom] = useState(index || 5);
  const [isLoading, setToloading] = useState(false);
  const [isVide, isVideToloading] = useState(false);

  const isL =
    isLoading || loading || (!isVide && (!list || (list && list.length === 0)));

  useEffect(() => {
    const timer = setTimeout(() => {
      isVideToloading(isL && list && list.length === 0);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isL, list]);

  return (
    <ScrollView
      onScrollBeginDrag={() => {
        setToloading(true);
      }}
      onScrollEndDrag={async ({ nativeEvent }) => {
        if (list && isCheckToBottom(nativeEvent) && isCheckTo < list.length) {
          setToBottom(isCheckTo + page);
          getAfter && getAfter(isCheckTo + page);
        }
        setTimeout(() => setToloading(false), 1000);
      }}>
      {isL ? (
        <Loading
          style={{
            bottom: 230,
            left: Dimensions.get('window').width / 2 - 5,
            flex: 1,
            justifyContent: 'center',
            position: 'absolute',
          }}
        />
      ) : null}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            maxWidth: 678,
            width: '100%',
            paddingHorizontal: 15,
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
          }}>
          {children}
        </View>
      </View>
      <View style={{ height: 270 }} />
    </ScrollView>
  );
};

export default ListScrollView;
