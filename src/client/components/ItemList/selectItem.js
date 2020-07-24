import React from 'react';
import {
  View,
  Text,
  // Dimensions,
  TouchableOpacity,
} from 'react-native';

// const { width } = Dimensions.get('window');

export default class SelectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setSelectedColor: 'white',
    };
  }

  onHandleRIB = (rib) => {
    this.setState({ setSelectedColor: 'beige' });
    this.props.setRIBId(rib);
  }

  render() {
    const { RIB } = this.props;
    const { setSelectedColor } = this.state;

    return (
      <View>
        <View style={{ backgroundColor: `${setSelectedColor}`, padding: 5 }}>
          <TouchableOpacity
            onPress={ () => this.onHandleRIB(RIB) }
            hitSlop={{
                top: 20, bottom: 20, left: 50, right: 20,
            }}
          >
            <Text>{RIB}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ padding: 4 }} />
      </View>
    );
  }
  }
