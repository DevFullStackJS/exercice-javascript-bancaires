// import React, { Component } from 'react';
// import { Text, TouchableHighlight, View, Platform, Modal } from 'react-native';
// import ModalWeb from 'modal-react-native-web';

// const ModalWebMobile = Platform.OS === 'web' ? ModalWeb : Modal;

// export default class ModalComponent extends Component {
//   state = {
//     modalVisible: false,
//   };

//   setModalVisible(visible) {
//     this.setState({ modalVisible: visible });
//   }

//   render() {
//     return (
//       <View style={{ marginTop: 22 }}>
//         <ModalWebMobile
//           animationType="slide"
//           transparent={false}
//           visible={this.state.modalVisible}
//           // eslint-disable-next-line no-undef
//           appElement={Platform.OS === 'web' && document && document.getElementById('root')}
//           // onDismiss={() => {
//             // alert('Modal has been closed.');
//           // }}
//         >
//           <View style={{ marginTop: 22 }}>
//             <View>
//               <Text>Hello World!</Text>

//               <TouchableHighlight
//                 onPress={() => {
//                   this.setModalVisible(!this.state.modalVisible);
//                 }}>
//                 <Text>Hide Modal</Text>
//               </TouchableHighlight>
//             </View>
//           </View>
//         </ModalWebMobile>

//         <TouchableHighlight
//           onPress={() => {
//             this.setModalVisible(true);
//           }}>
//           <Text>Show Modal</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }
