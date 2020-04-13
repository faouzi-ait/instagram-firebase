import React from 'react'
import { View, Text, Image } from 'react-native'

import { IOSGlobal } from '../../styles/IOSStyles'

const ProfileTop = ({ currenUser }) => {
   return (
      <View style={IOSGlobal.profileUser}>
         {currenUser && currenUser.photoUrl ?
            <Image
               style={IOSGlobal.profilePicture}
               source={{
                  uri: currenUser.photoUrl,
               }}
            />
            :
            <Image
               style={IOSGlobal.profilePicture}
               source={{
                  uri: 'http://i.pravatar.cc/300',
               }}
            />
         }
         <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Name</Text>
            <Text style={{ fontSize: 16 }}>
               {currenUser.email && currenUser.email.split("@")[0].split(".")[0]}
               {" "}
               {currenUser.email && currenUser.email.split("@")[0].split(".")[1]}
            </Text>
         </View>
      </View>
   )
}

export default ProfileTop
