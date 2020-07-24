import React from 'react';
import Moment from 'moment';
import { View, FlatList, Button, Text } from 'react-native';
// import Moment from 'moment';

import SimplerDatePicker from '../../components/DatePiker';

// import ModalComponent from '../../components/Common/Modal';

import Background from '../../components/Common/background';
import Layout from '../Layout';
import { RibList } from '../../components/ItemList/RibList';
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
    // const rib = '18206002105487266700217';
    // await this.props.oneRibOperation({ min: '03/28/2017', max: '04/12/2017', rib });
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

  // getOperationDate = async () => {
  //   const { min, max } = this.state;
  //   const rib = '18206002105487266700217';
  //   await this.props.oneRibOperation({ min: dateTransformation(min), max: dateTransformation(max), rib });
  // }

  getOperationDate = async () => {
    const { min, max } = this.state;
    if (min && max) {
      const rib = '18206002105487266700217';
      await this.props.oneRibOperation({ min, max, rib });
    }
  }

  onClose = () => {
    this.setState({ modalVisible: false });
  }

  showRIBInfos = async () => {
    const { selectedRIB } = this.state;
    selectedRIB && this.setState({ showResult: true });
    await this.getOperationDate();
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
    const { logout, rib } = this.props;
    const { minDate, maxDate, minDate2, showResult, strictRIBList, selectedRIB, min, max } = this.state;

    return (
      <Background>
        <Layout {...this.props} title={'Home'} logout={logout}>
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
              <Operations hideRIBInfos={this.hideRIBInfos} ribId={selectedRIB} min={min} max={max} />
            )
          }
          {false && <FlatList
            scrollEnabled
            data={rib.operations}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <RibList {...item} />
            )}
          />}
          {/* <ModalComponent /> */}
        </Layout>
      </Background>
    );
  }
}
