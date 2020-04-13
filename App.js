import React, { useState, useEffect } from 'react';

import { Text, View, YellowBox } from 'react-native';
import { f, database, auth, storage } from './config/config'

// 1- IMPORT THE NAVIGATOR FUNCTIONS
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// 2- IMPORT THE COMPONENTS PAGES
import LoadingPage from './components/LoadingScreen'
import LoginScreen from './components/LoginScreen'
import MainScreen from './components/MainScreen'

// 3- CREATE THE STACK NAVIGATOR
const MainStack = createStackNavigator();

console.disableYellowBox = true;

export default function App() {

  useEffect(() => {
    YellowBox.ignoreWarnings([
      'Non-serializable values were found in the navigation state',
    ]);
  })

  return (
    <NavigationContainer>
      <MainStack.Navigator headerMode="none" initialRouteName="Loading">
        <MainStack.Screen name="Loading" component={LoadingPage} />
        <MainStack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
        <MainStack.Screen name="Main" component={MainScreen} options={{ gestureEnabled: false }} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
