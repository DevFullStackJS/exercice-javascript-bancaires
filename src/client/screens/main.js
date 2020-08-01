/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { connect } from 'react-redux';

import mapStateToProps from '../services/redux/mapStateToProps';
import mapDispatchToProps from '../services/redux/mapDispatchToProps';

import AppNavigation from './navigation';
import AuthStack from './Auth';

class AppMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  // async componentDidMount() {}

  render() {
    const { user } = this.props.users;

    if (user && user.token) {
      return <AppNavigation {...this.props} />;
    }
    return <AuthStack />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppMain);

// import React from "react";
// import { View, Text } from "react-primitives";
// import MediaQuery from "react-native-web-responsive";

// const ResponsiveExample = () => {
//   return (
//     <View>
//       <Text>Device Test!</Text>
//       <MediaQuery minWidth={1224}>
//         <Text>You are a desktop or laptop</Text>
//         <MediaQuery minWidth={1824}>
//           <Text>You also have a huge screen</Text>
//         </MediaQuery>
//       </MediaQuery>
//       <MediaQuery maxWidth={1224}>
//         <Text>You are a tablet or mobile phone</Text>
//       </MediaQuery>
//       <MediaQuery orientation="portrait">
//         <Text>You are portrait</Text>
//       </MediaQuery>
//       <MediaQuery orientation="landscape">
//         <Text>You are landscape</Text>
//       </MediaQuery>
//       <MediaQuery minPixelRatio={2}>
//         <Text>You are retina</Text>
//       </MediaQuery>
//     </View>
//   );
// }

// export default ResponsiveExample;
