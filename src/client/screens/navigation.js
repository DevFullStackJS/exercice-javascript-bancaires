import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CreateCompteScreen from '../screens/Compte/create';
import HomeScreen from '../screens/Home';

const Tab = createBottomTabNavigator();

export default function App(props) {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={() => <HomeScreen {...props} />} />
        <Tab.Screen name="CreateCompteScreen" component={() => <CreateCompteScreen {...props} />} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
