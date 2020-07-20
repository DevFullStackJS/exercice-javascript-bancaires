import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

export default class ViewIcon extends Component {
  render() {
    if (!this.props.navigation) {
      return;
    }

    const {openDrawer, canGoBack} = this.props.navigation;
    const {title} = this.props;

    return (
      <View>
        <View>
          <Button transparent onPress={() => canGoBack()}>
          <Text>ff</Text>
          </Button>
        </View>
        <View>
          <Text>{title}</Text>
        </View>
        <View>
          <Button transparent onPress={() => openDrawer()}>
            <Text>ff</Text>
          </Button>
        </View>
      </View>
    );
  }
}
