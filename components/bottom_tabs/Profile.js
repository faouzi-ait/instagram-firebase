import React, { useState, useEffect } from 'react'

import { Text, View, Image, ScrollView, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity,Keyboard, Alert, Dimensions } from 'react-native'
import { Container, Header, Title } from 'native-base';
import ProfileTop from '../profileSections/ProfileTop'
import ButtonComponent from '../profileSections/ButtonsComponent'

import { IOSGlobal } from '../../styles/IOSStyles'
import { Android } from '../../styles/AndroidStyles'

import { f, database } from '../../config/config'

const Profile = ({ navigation, route }) => {
   const [name, setName] = useState();
   const [surname, setSurname] = useState();
   const [loggedIn, setIsLoggedIn] = useState(true);
   const [currenUser, setCurrentUser] = useState({});
   const [editing, setEditing] = useState(false);
   const [photoList, setPhotoList] = useState([]);

   useEffect(() => {
      checkIfLoggedIn();
   }, [])

   function checkIfLoggedIn() {
      f.auth().onAuthStateChanged(user => {
         if (user) {
            setIsLoggedIn(true)
            setCurrentUser(user)
            getPhotosFromFirebase()
         } else {
            setIsLoggedIn(false)
         }
      })
   }

   function SignUserOut() {
      Alert.alert(
         'Log User Out?',
         '',
         [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => f.auth().signOut() },
         ],
         { cancelable: false }
      )
   }

   function getPhotosFromFirebase() {
      database.ref('users').child(f.auth().currentUser.uid).child('photos').once('value').then(snapshot => {
         let usersList = '';
         const localPhotoList = [];

         if (snapshot.val()) {
            usersList = snapshot.val();
         }

         for (let photo in usersList) {
            localPhotoList.push(usersList[photo].url)
         }
         setPhotoList(localPhotoList)
      }).catch(error => console.log(error));
   }

   async function updateProfile() {
      if (name !== '') {
         await database.ref('users').child(f.auth().currentUser.uid).child('name').set(name);
      }

      if (surname !== '') {
         await database.ref('users').child(f.auth().currentUser.uid).child('surname').set(surname);
      } 

      Keyboard.dismiss()
      setName('')
      setSurname('')
      setEditing(false)
   }

   return (
      <Container>
         <Header style={{ alignItems: "center" }}>
            <Title>Profile</Title>
         </Header>

         <ProfileTop currenUser={currenUser} />
         
         {!editing ?
            <>
               <View style={IOSGlobal.profileMiddle}>
                  <ButtonComponent f={SignUserOut} label="Logout" />
               </View>
               <View style={IOSGlobal.profileMiddle}>
                  <ButtonComponent f={() => setEditing(edit => edit = !edit)} label="Edit Profile" />
               </View>
               <View style={IOSGlobal.profileMiddle}>
                  <ButtonComponent f={() => navigation.navigate("Upload")} label="Upload Photos +" />
               </View>

               <View style={[IOSGlobal.profilePhotoList]}>
                  {photoList && photoList.length ?
                     <ScrollView>
                        {photoList.map(item =>
                           <View>
                              <Image
                                 style={{ width: Dimensions.get('window').width - 20, height: 330, marginBottom: 5 }}
                                 source={{ uri: item }}
                              />
                           </View>
                        )}
                     </ScrollView>
                     :
                     <Text>No Photos to display</Text>
                  }
               </View>
            </>
            :
            <>
               <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{marginBottom: 0}}>
                  <View style={{ flex: 1 }}>
                     <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 16 }}>Enter a comment:</Text>
                     <TextInput
                        editable={true}
                        placeholder={'Enter a your name'}
                        onChangeText={(val) => setName(val)}
                        style={[IOSGlobal.uploadInput, { width: Dimensions.get('window').width - 20, alignSelf: 'center', height: 35}]}
                        value={name}
                     />
                     <TextInput
                        editable={true}
                        placeholder={'Enter a your surname'}
                        onChangeText={(val) => setSurname(val)}
                        style={[IOSGlobal.uploadInput, { width: Dimensions.get('window').width - 20, alignSelf: 'center', height: 35}]}
                        value={surname}
                     />
                     <TouchableOpacity
                        style={[IOSGlobal.uploadBtn, { backgroundColor: "#0082D9", width: Dimensions.get('window').width - 20, alignSelf: 'center' }]}
                        onPress={updateProfile}
                     >
                        <Text style={IOSGlobal.uploadBtnLabel}>Update Profile</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={[IOSGlobal.uploadBtn, { backgroundColor: "red", width: Dimensions.get('window').width - 20, alignSelf: 'center' }]}
                        onPress={() => setEditing(false)}
                     >
                        <Text style={IOSGlobal.uploadBtnLabel}>Cancel</Text>
                     </TouchableOpacity>
                  </View>
               </TouchableWithoutFeedback>
            </>
         }
      </Container>
   )
}

export default Profile
