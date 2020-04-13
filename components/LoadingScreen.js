import React, { useState, useEffect } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { f, database, auth, storage } from '../config/config'

const LoadingPage = ({ navigation, route }) => {

   useEffect(() => {
      checkIfUserLoggedIn(f)
   }, [])

   function checkIfUserLoggedIn(f) {
      f.auth().onAuthStateChanged(user => {
         if (user) {
            navigation.navigate('Main', { user })
         } else {
            navigation.navigate('Login')
         }
      })
   }

   return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size='large' />
         <Text style={{ marginTop: 10 }}> Loading... </Text>
      </View>
   )
}

export default LoadingPage
