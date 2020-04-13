import React from 'react'
import { View, Text } from 'react-native'

import { IOSGlobal } from '../styles/IOSStyles'

const LoadingFeedScreen = () => {
   return (
      <View style={IOSGlobal.loading}>
         <Text>Loading stuff...</Text>
      </View>
   )
}

export default LoadingFeedScreen
