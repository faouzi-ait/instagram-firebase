import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { IOSGlobal } from '../styles/IOSStyles'

export function checkIfPlural(s) {
   if (s == 1) {
      return ' ago'
   } else {
      return 's ago'
   }
}

export function timeConverter(timestamp) {
   let a = new Date(timestamp * 1000);
   let seconds = Math.floor((new Date() - a) / 1000)

   let interval = Math.floor(seconds / 31536000)
   if (interval >= 1) {
      return interval + ' year' + checkIfPlural(interval)
   }

   interval = Math.floor(seconds / 2592000)
   if (interval >= 1) {
      return interval + ' month' + checkIfPlural(interval)
   }

   interval = Math.floor(seconds / 86400)
   if (interval >= 1) {
      return interval + ' day' + checkIfPlural(interval)
   }

   interval = Math.floor(seconds / 3600)
   if (interval >= 1) {
      return interval + ' hour' + checkIfPlural(interval)
   } else
      interval = Math.floor(seconds / 60)
   if (interval <= 1) {
      return 'Just now ';
   } else {
      return interval + ' minute' + checkIfPlural(interval)
   }
}

export function GenerateImage({ navigation, item, index, user }) {
   return (
      <View style={IOSGlobal.placeholder} key={index}>
         <View style={IOSGlobal.items}>
            <Text style={[IOSGlobal.linkBtn, { backgroundColor: "lightgrey", borderWidth: 0 }]}>{timeConverter(item.posted)}</Text>
            <TouchableOpacity
               onPress={() => navigation.navigate("UserDetail", { user: user })}
            >
               <Text style={[IOSGlobal.linkBtn]}>@{item.author.substring(0, 6)}</Text>
            </TouchableOpacity>
         </View>
         <View>
            <Image
               source={{ uri: item.url }}
               style={{ resizeMode: 'cover', width: '100%', height: 275 }}
            />
         </View>
         <View>
            <Text style={IOSGlobal.caption}>{item.caption}</Text>
            <TouchableOpacity
               style={IOSGlobal.comments}
               onPress={() => navigation.navigate("UserComments", { photoId: item.id })}
            >
               <Text style={IOSGlobal.linkBtn}>Show Comments</Text>
            </TouchableOpacity>
         </View>
      </View>)
}

export function uuidv4() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   });
}
