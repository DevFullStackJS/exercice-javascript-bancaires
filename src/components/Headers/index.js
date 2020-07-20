import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

export default class ViewIcon extends Component {
  render() {
    const {title} = this.props;

    return (
      <View>
        <View>
          <Text>{title}</Text>
        </View>
      </View>
    );
  }
}
