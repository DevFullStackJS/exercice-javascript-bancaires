import React from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import AppHeader from '../../components/Headers';

const styles = StyleSheet.create({
  layout_container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

function Layout(props) {
  const {loading, title} = props;

  return (
    <View style={styles.layout_container}>
      {!loading && props.children && <AppHeader {...props} title={title} />}
      {props.children}
    </View>
  );
}

export default Layout;
