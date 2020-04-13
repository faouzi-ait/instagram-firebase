import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

// 1- IMPORT THE NAVIGATOR FUNCTIONS
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// 2- IMPORT THE COMPONENTS PAGES
import Profile from './bottom_tabs/Profile'
import Feed from './bottom_tabs/Feed'
import Upload from './bottom_tabs/Upload'
import UserDetailsModal from '../components/UserDetailsModal'
import UserComments from '../components/UserComments'

// 3- CREATE THE STACK NAVIGATOR
const RootStack = createStackNavigator();
const BottomStack = createBottomTabNavigator();

const BottomTabs = () => {
   return (
      <BottomStack.Navigator
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
               let iconName;

               if (route.name === "Profile") {
                  iconName = focused
                     ? "ios-information-circle"
                     : "ios-information-circle-outline";
               } else if (route.name === "Feed") {
                  iconName = focused ? "ios-list-box" : "ios-list";
               } else if (route.name === "Upload") {
                  iconName = focused ? "ios-checkbox" : "ios-checkbox-outline";
               }
               return (
                  <View style={{ width: 24, height: 24, margin: 5 }}>
                     {/* <Ionicons name={iconName} size={size} color={color} /> */}
                  </View>
               );
            }
         })}
         tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "grey"
         }}
      >
         <BottomStack.Screen name="Feed" component={Feed} />
         <BottomStack.Screen name="Profile" component={Profile} />
         <BottomStack.Screen name="Upload" component={Upload} />
      </BottomStack.Navigator>
   )
}

const MainScreen = () => {

   return (
      <RootStack.Navigator headerMode="none" mode="modal" initialRouteName="Bottom">
         <RootStack.Screen name="Bottom" component={BottomTabs} />
         <RootStack.Screen name="UserDetail" component={UserDetailsModal} />
         <RootStack.Screen name="UserComments" component={UserComments} />
      </RootStack.Navigator>
   )
}

export default MainScreen
