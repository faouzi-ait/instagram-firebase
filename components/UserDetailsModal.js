import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Header, Title, Right, Left, Body } from 'native-base';
import { database } from '../config/config'

import { IOSGlobal } from '../styles/IOSStyles'
import Constants from "expo-constants";

console.disableYellowBox = true

const UserDetailsModal = ({ navigation, route }) => {
   const [userParam, setUserParam] = useState();
   const [fetchedUser, setFetchedUser] = useState({});
   const [userPhotos, setUserPhotos] = useState([]);

   useEffect(() => {
      checkParam()
      fetchUser(userParam)
      fetchPhotos(userParam)
   }, [userParam])

   function checkParam() {
      if (route.params.user) {
         setUserParam(route.params.user)
      }
   }

   async function fetchUser(userId) {
      const userObj = {}

      await database.ref('users')
         .child(userId)
         .child('surname')
         .once('value')
         .then(snapshot => {
            const exist = snapshot.val() !== null
            if (exist) {
               userObj["username"] = snapshot.val()
            }
         }).catch(err => console.log(err))

      await database.ref('users')
         .child(userId)
         .child('name')
         .once('value')
         .then(snapshot => {
            const exist = snapshot.val() !== null
            if (exist) {
               userObj["name"] = snapshot.val()
            }
         }).catch(err => console.log(err))

      await database.ref('users')
         .child(userId)
         .child('avatar')
         .once('value')
         .then(snapshot => {
            const exist = snapshot.val() !== null
            if (exist) {
               userObj["avatar"] = snapshot.val()
            }
         }).catch(err => console.log(err))
      setFetchedUser(userObj)
   }

   async function fetchPhotos(userParam) {
      const localPhotoList = [];

      await database.ref('users')
         .child(userParam)
         .child('photos')
         .once('value')
         .then(snapshot => {
            let photos = ''

            if (snapshot.val()) {
               photos = snapshot.val();
            }

            for (let photo in photos) {
               localPhotoList.push(photos[photo].url)
            }

         }).catch(err => console.log(err))
      setUserPhotos(localPhotoList)
   }

   return (
      <>
         <Header>
            <Left style={{ justifyContent: "center" }}>
               <TouchableOpacity transparent
                  onPress={() => navigation.goBack()}
               >
                  <Text style={{ fontSize: 35, color: "#0082D9", paddingLeft: 10 }}>&#8592;</Text>
               </TouchableOpacity>
            </Left>
            <Body>
               <Title>Profile</Title>
            </Body>
            <Right></Right>
         </Header>

         <View style={[IOSGlobal.profileUser, { marginTop: Constants.statusBarHeight, paddingTop: 0, }]}>
            <Image
               style={IOSGlobal.profilePicture}
               source={{
                  uri: fetchedUser.avatar
               }}
            />
            <View>
               <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {fetchedUser.username}
               </Text>
               <Text style={{ fontSize: 15 }}>
                  {fetchedUser.name}
               </Text>
            </View>
         </View>

         <View style={[IOSGlobal.profilePhotoList]}>
            {userPhotos.length ?
               <ScrollView>
                  {userPhotos.map((item, i) =>
                     <View key={i}>
                        <Image
                           style={{ width: Dimensions.get('window').width - 20, height: 330, marginBottom: 5 }}
                           source={{ uri: item }}
                        />
                     </View>
                  )}
               </ScrollView>
               :
               <Text>Loading Photos...</Text>
            }
         </View>
      </>
   )
}

export default UserDetailsModal
