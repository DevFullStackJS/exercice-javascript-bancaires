import React from 'react';
import Moment from 'moment';
import { View, FlatList, Button, Text } from 'react-native';

import SimplerDatePicker from '../../components/DatePiker';

import Background from '../../components/Common/background';
import Layout from '../Layout';
import SelectItem from '../../components/ItemList/selectItem';
import Operations from '../Operation';

const PikerDate = (props) => (
  <View style={{ marginBottom: 40 }}>
    <SimplerDatePicker
      {...props}
      containerStyle={{
        flex: 1,
        flexDirection: 'row',
      }}
      yearStyle={{
        flex: 1,
        marginRight: 5,
      }}
      monthStyle={{
        flex: 1,
        marginRight: 5,
      }}
      dayStyle={{
        flex: 1,
      }}
      textStyle={{
        fontSize: 16,
      }}
    />
  </View>
);

// const dateTransformation = (d) => {
//   if (!d) return;
//   let nDate1 = d.split('-');
//   nDate1 = `${nDate1[2]}/${nDate1[1]}/${nDate1[0]}`;

//   return nDate1;
// };

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
      showResult: false,
      selectedRIB: '',
      strictRIBList: [],
    };
  }

  async componentDidMount() {
    await this.props.operations();
    this.getStrictList(this.props.rib.operations);
  }

  componentWillMount() {
    // Modal.setAppElement('body');
  }

  onDatePicked = (date) => {
    if (date) {
      this.setState({ min: date.format('YYYY-MM-DD') });
    }
  };

  onDatePickedMax = (date) => {
    if (date) {
      this.setState({ max: date.format('YYYY-MM-DD') });
    }
  };

  getOperationDate = async (selectedRIB) => {
    const { min, max } = this.state;
    if (min && max && selectedRIB) {
      await this.props.oneRibOperation({ min, max, rib: selectedRIB });
    }
  }

  onClose = () => {
    this.setState({ modalVisible: false });
  }

  callBack = (res) => {
    console.log({ res });
    this.setState({ showResult: true });
  }

  showRIBInfos = async () => {
    const { selectedRIB, min, max } = this.state;
    if (selectedRIB && min && max) {
      await this.props.oneRibOperation({ min, max, rib: selectedRIB }, this.callBack);
    }
  }

  hideRIBInfos = () => {
    this.setState({ showResult: false });
  }

  setRIBId = (selectedRIB) => {
    this.setState({ selectedRIB });
  }

  getStrictList = (lists) => {
    const ls = lists && lists.map(m => m.RIB);
    let strictRIBList = ls && ls.filter((v, i) => ls.indexOf(v) === i);
    strictRIBList = strictRIBList && strictRIBList.map(l => {
      console.log('l');
      return { RIB: l };
    });
    this.setState({ strictRIBList });
  }

  render() {
    const { logout } = this.props;
    const { minDate, maxDate, minDate2, showResult, strictRIBList, selectedRIB, min, max } = this.state;

    return (
      <Background>
        <Layout {...this.props} title={'Compagnie fiduciaire'} logout={logout}>
          {!showResult
            ? (
            <View style={{ flex: 1, justifyContent: 'space-between', padding: 20, margin: 10 }}>
              <View style={{ flex: 0.3, marginBottom: 30 }}>
              <Text>Select period date</Text>
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
              <View style={{ flex: 0.3 }}>
                {/* <Button
                  title='Liste Operations'
                  onPress={this.getOperationDate}
                /> */}
                  <Text>Select one RIB</Text>
                  <FlatList
                    scrollEnabled
                    // data={rib.operations}
                    data={strictRIBList}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                      <SelectItem {...item} setRIBId={this.setRIBId} />
                    )}
                  />
                </View>
                <View style={{ flex: 0.3 }}>
                  <Button
                    title='Find'
                    onPress={this.showRIBInfos}
                  />
                </View>
              </View>
            )
            : (
              <Operations { ...this.props } hideRIBInfos={this.hideRIBInfos} ribId={selectedRIB} min={min} max={max} />
            )
          }
          {/* <ModalComponent /> */}
        </Layout>
      </Background>
    );
  }
}
