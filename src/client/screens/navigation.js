import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CreateCompteScreen from './Compte';
import HomeScreen from './Home';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Opération" component={HomeScreen} />
        <Tab.Screen name="Compte" component={CreateCompteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
