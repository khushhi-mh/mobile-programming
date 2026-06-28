import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../Dashboard';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}