import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import AppHeader from '../../components/Headers';

const styles = StyleSheet.create({
  layout_container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

function Layout(props) {
  const { loading, title, logout } = props;

  return (
    <SafeAreaView style={styles.layout_container}>
      {!loading && props.children && <AppHeader {...props} title={title} logout={logout} />}
      {props.children}
    </SafeAreaView>
  );
}

export default Layout;
