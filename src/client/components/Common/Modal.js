import React, { Component } from 'react';
import { Text, TouchableHighlight, View, Platform, Modal, StyleSheet } from 'react-native';
import ModalWeb from 'modal-react-native-web';

const ModalWebMobile = Platform.OS === 'web' ? ModalWeb : Modal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(68, 75, 84, 0.9)',
    marginTop: 22,
  },
});

export default class ModalComponent extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.modal}>
        <ModalWebMobile
          animationType="slide"
          // transparent
          visible={this.state.modalVisible}
          // eslint-disable-next-line no-undef
          appElement={Platform.OS === 'web' && document && document.getElementById('root')}
          // onDismiss={() => {
            // alert('Modal has been closed.');
          // }}
        >
          <View style={ {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 50,
            alignItems: 'center',
            alignContent: 'center',
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            paddingTop: 10,
            paddingBottom: 10,
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            // marginTop: 22,
            }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ModalWebMobile>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
