import React from 'react';
import { View, Text, FlatList } from 'react-native';

import Layout from '../Layout';
import { RibList } from '../../components/ItemList/RibList';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    // await this.props.operations();
    const rib = '18206002105487266700217';
    await this.props.oneRibOperation({ min: '28/03/2017', max: '12/04/2017', rib });
  }

  render() {
    const { logout, rib } = this.props;

    console.log(rib.oneRibOperation);
    return (
      <Layout {...this.props} title={'Home'} logout={logout}>
        <View>
          <Text>Welecom TP RN !!!</Text>
        </View>
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
