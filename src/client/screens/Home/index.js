import React from 'react';
import Moment from 'moment';
import { View, FlatList, Button, Text } from 'react-native';

import { home_title, select_period, select_rib, find, from, to } from '../../../config/constants';

import SimplerDatePicker from '../../components/DatePiker';
import Background from '../../components/Common/background';
import Layout from '../Layout';
import SelectItem from '../../components/ItemList/selectItem';
import Operations from '../Operation';
import styles from './index.style';

const PikerDate = (props) => (
  <View style={styles.pickerDateContainer}>
    <SimplerDatePicker
      {...props}
      containerStyle={styles.simpleDPcontainer}
      yearStyle={styles.yearStyle}
      monthStyle={styles.monthStyle}
      dayStyle={styles.dayStyle}
      textStyle={styles.textStyle}
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
    await this.props.getComptes();
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
      let mx = max;
      let mn = min;
      if (new Date(max).getTime() < new Date(min).getTime()) {
        mx = min;
        mn = max;
      }
      await this.props.oneRibOperation({ min: mn, max: mx, rib: selectedRIB }, this.callBack);
    }
  }

  hideRIBInfos = () => {
    this.setState({ showResult: false });
  }

  setRIBId = (selectedRIB) => {
    this.setState({ selectedRIB });
  }

  getStrictList = (lists) => {
    // const { list } = this.props.comptes;
    // list && console.log({ list });
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
        <Layout {...this.props} title={home_title} logout={logout}>
          {!showResult
            ? (
            <View style={styles.formContainer}>
              <View style={styles.datesContainer}>
                <View style={styles.titleLabel}>
                  <Text style={styles.textLabel}>{select_period}</Text>
                </View>
                <Text style={styles.periodLabel}>{from}</Text>
                <PikerDate
                  minDate={minDate}
                  maxDate={maxDate}
                  onDatePicked={this.onDatePicked}
                />
                <Text style={styles.periodLabel}>{to}</Text>
                <PikerDate
                  minDate={minDate2}
                  maxDate={maxDate}
                  onDatePicked={this.onDatePickedMax}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <View style={styles.titleLabel}>
                  <Text style={styles.textLabel}>{select_rib}</Text>
                </View>
                <FlatList
                  scrollEnabled
                  data={strictRIBList}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => (
                    <SelectItem {...item} setRIBId={this.setRIBId} />
                  )}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Button
                  title={find}
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
