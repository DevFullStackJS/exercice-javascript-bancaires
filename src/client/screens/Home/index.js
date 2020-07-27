import React from 'react';
import Moment from 'moment';
import { View, FlatList, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

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
      containerStyle={StyleSheet.flatten(styles.simpleDPcontainer)}
      yearStyle={StyleSheet.flatten(styles.yearStyle)}
      monthStyle={StyleSheet.flatten(styles.monthStyle)}
      dayStyle={StyleSheet.flatten(styles.dayStyle)}
      textStyle={StyleSheet.flatten(styles.textStyle)}
    />
  </View>
);

export const RibList = ({ strictRIBList, setRIBId, selectedItem, selectedRIB }) => (
  <>
    <View style={styles.titleLabel}>
      <Text style={styles.textLabel}>{select_rib}</Text>
    </View>
    <FlatList
      scrollEnabled
      data={strictRIBList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <SelectItem
          {...item}
          setRIBId={setRIBId}
          selectedItem={selectedItem}
          selectedRIB={selectedRIB}
        />
      )}
    />
  </>
);

class Home extends React.Component {
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
      loding: false,
      getRibByRole: [],
      selectedItem: [],
    };
  }

  async componentDidMount() {
    await this.props.operations();
    this.getStrictList(this.props.rib.operations);
    const { users } = this.props;
    const getRibByRole = users && users.user && users.user.role === 1 ? [{ RIB: users.user.rib[0].split('//')[1] }] : [];
    this.setState({ getRibByRole });
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
    this.setState({ showResult: true, res });
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
      this.setState({ loding: true });
      await this.props.oneRibOperation({ min: mn, max: mx, rib: selectedRIB }, this.callBack);
    }
  }

  hideRIBInfos = () => {
    this.setState({ showResult: false, loding: false, selectedRIB: '' });
  }

  setRIBId = (selectedRIB) => {
    const { selectedItem } = this.state;
    this.setState({ selectedRIB, selectedItem: [...selectedItem, selectedRIB] });
  }

  getStrictList = (lists) => {
    const ls = lists && lists.map(m => m.RIB);
    let strictRIBList = ls && ls.filter((v, i) => ls.indexOf(v) === i);
    strictRIBList = strictRIBList && strictRIBList.map(l => ({ RIB: l }));
    this.setState({ strictRIBList });
  }

  render() {
    const { logout } = this.props;
    const { minDate, maxDate, minDate2, showResult, strictRIBList, selectedRIB, loding, getRibByRole, selectedItem } = this.state;
    const ribToshow = getRibByRole && getRibByRole.length > 0 ? getRibByRole : strictRIBList;

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
                <RibList
                  strictRIBList={ribToshow}
                  setRIBId={this.setRIBId}
                  selectedItem={selectedItem}
                  selectedRIB={selectedRIB}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                { !loding
                ? <Button
                    title={find}
                    onPress={this.showRIBInfos}
                  />
                : <ActivityIndicator size={'large'} />}
              </View>
            </View>
            )
            : (
              <Operations { ...this.props } hideRIBInfos={this.hideRIBInfos} ribId={selectedRIB} />
            )
          }
        </Layout>
      </Background>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
