import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import AppHeader from '../../components/Headers';

const styles = StyleSheet.create({
  layout_container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

function Layout(props) {
  const { loading, title } = props;

  return (
    <SafeAreaView style={styles.layout_container}>
      {!loading && props.children && <AppHeader {...props} title={title} />}
      {props.children}
    </SafeAreaView>
  );
}

// export default Layout;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
