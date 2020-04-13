import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const ButtonsComponent = ({ f, label }) => {
   return (
      <TouchableOpacity
         onPress={f}
         style={{ paddingTop: 12.5, paddingBottom: 12.5 }}
      >
         <Text style={{ fontSize: 18, alignSelf: "center" }}>{label}</Text>
      </TouchableOpacity>
   )
}

export default ButtonsComponent
