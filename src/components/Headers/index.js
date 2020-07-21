import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

export default class ViewIcon extends Component {
  render() {
    const { title, logout, notLogout } = this.props;

    return (
      <View>
        <View>
          <Text>{title}</Text>
        </View>
        {!notLogout && <Button title='Logout' onPress={() => logout()} />}
      </View>
    );
  }
}
