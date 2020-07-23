import React from 'react';
import Moment from 'moment';
import { View, FlatList, Button } from 'react-native';

import SimplerDatePicker from '../../components/DatePiker';

// import ModalComponent from '../../components/Common/Modal';

import Layout from '../Layout';
import { RibList } from '../../components/ItemList/RibList';

const PikerDate = (props) => (
  <View style={{ marginBottom: 40 }}>
    <SimplerDatePicker
      {...props}
      containerStyle= {{
        flex: 1,
        flexDirection: 'row',
      }}
      yearStyle= {{
        flex: 1,
        marginRight: 5,
      }}
      monthStyle= {{
        flex: 1,
        marginRight: 5,
      }}
      dayStyle= {{
        flex: 1,
      }}
      textStyle= {{
        fontSize: 16,
      }}
    />
  </View>
);

const dateTransformation = (d) => {
  if (!d) return;
  let nDate1 = d.split('-');
  nDate1 = `${nDate1[2]}/${nDate1[1]}/${nDate1[0]}`;

  return nDate1;
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      minDate: Moment().subtract(10, 'years'),
      minDate2: Moment().subtract(10, 'years'),
      maxDate: Moment().add(1, 'days'),
      min: new Date(),
      max: new Date(),
      modalVisible: false,
    };
  }

  async componentDidMount() {
    await this.props.operations();
    // const rib = '18206002105487266700217';
    // await this.props.oneRibOperation({ min: '28/03/2017', max: '12/04/2017', rib });
  }

  componentWillMount() {
    // Modal.setAppElement('body');
  }

  onDatePicked = (date) => {
    if (date && date._i) {
      console.log(date._i);
      this.setState({ min: date._i });
    }
  };

  onDatePickedMax = (date) => {
    if (date && date._i) {
      this.setState({ max: date._i });
    }
  };

  getOperationDate = async () => {
    const { min, max } = this.state;
    const rib = '18206002105487266700217';
    await this.props.oneRibOperation({ min: dateTransformation(min), max: dateTransformation(max), rib });
  }

  onClose = () => {
    console.log('dfsdfsdf');
    this.setState({ modalVisible: false });
  }

  render() {
    const { logout, rib } = this.props;
    const { minDate, maxDate, minDate2 } = this.state;

    return (
      <Layout {...this.props} title={'Home'} logout={logout}>
        <View>
          <PikerDate
            minDate={minDate}
            maxDate={maxDate}
            onDatePicked={this.onDatePicked}
          />
          <PikerDate
            minDate={minDate2}
            maxDate={maxDate}
            onDatePicked={this.onDatePickedMax}
          />
        </View>
        <Button
          title='Liste Operations'
          onPress={this.getOperationDate}
        />
        <FlatList
          scrollEnabled
          data={rib.operations}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <RibList {...item} />
          )}
        />
        {/* <ModalComponent /> */}
      </Layout>
    );
  }
}
