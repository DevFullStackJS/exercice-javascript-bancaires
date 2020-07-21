import React from 'react';
import Moment from 'moment';
import { View, Text, FlatList, Button } from 'react-native';

import SimplerDatePicker from '../../components/DatePiker';

import Layout from '../Layout';
import { RibList } from '../../components/ItemList/RibList';

const PikerDate = (props) => (
  <View style={{ marginBottom: 40 }}>
    <SimplerDatePicker {...props} />
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
      minDate: Moment().subtract(5, 'years'),
      minDate2: Moment().subtract(5, 'years'),
      maxDate: Moment().add(1, 'days'),
      min: new Date(),
      max: new Date(),
    };
  }

  async componentDidMount() {
    // await this.props.operations();
    const rib = '18206002105487266700217';
    // max: "21/07/2020"
    // min: "01/01/2020"
    // rib: "18206002105487266700217"
    await this.props.oneRibOperation({ min: '28/03/2017', max: '12/04/2017', rib });
  }

  onDatePicked = (date) => {
    if (date && date._i) {
      console.log(date._i);
      this.setState({ min: date._i, minDate2: date });
    }
  };

  onDatePickedMax = (date) => {
    if (date && date._i) {
      this.setState({ max: date._i, maxDate: date });
    }
  };

  getOperationDate = async () => {
    const { min, max } = this.state;
    const rib = '18206002105487266700217';
    // await this.props.oneRibOperation({ min: '28/03/2017', max: '12/04/2017', rib });
    // 2020-07-22
    await this.props.oneRibOperation({ min: dateTransformation(min), max: dateTransformation(max), rib });
  }

  render() {
    const { logout, rib } = this.props;
    const { minDate, maxDate, minDate2 } = this.state;
    // this.props.rib.operations
    // this.props.rib.oneRibOperation

    return (
      <Layout {...this.props} title={'Home'} logout={logout}>
        <View>
          <Text>Welecom TP RN !!!</Text>
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
          data={rib.oneRibOperation}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <RibList {...item} />
          )}
        />
      </Layout>
    );
  }
}
