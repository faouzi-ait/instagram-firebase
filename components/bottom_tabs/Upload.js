import React, { useState, useEffect } from 'react'

import { Text, View, TouchableOpacity, ActivityIndicator, TextInput, Keyboard, TouchableWithoutFeedback, Alert, Dimensions } from 'react-native'
import { Container, Header, Title } from 'native-base';
import { f, database, storage } from '../../config/config'

// Permissions must be allowed prior to accessing resources
// ImagePicker is function used to access the image resources
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { uuidv4 } from '../../utils/Utilities'

import { IOSGlobal } from '../../styles/IOSStyles'

const Upload = ({ navigation, route }) => {
   const [uploading, setUploading] = useState(false);
   const [progress, setProgress] = useState(0);
   const [imageSelected, setImageSelected] = useState(false);
   const [imageObj, setImageObj] = useState({});
   const [permissionsStatus, setPermissionsStatus] = useState();
   const [permissionsStatusRoll, setPermissionsStatusRoll] = useState();
   const [caption, setCaption] = useState()

   async function _checkPermissions() {
      const { status } = await Permissions.getAsync(Permissions.CAMERA);
      if (status !== 'granted') {
         setPermissionsStatus(status)
      }

      const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      setPermissionsStatusRoll(statusRoll)
   }

   async function getNewImages() {
      _checkPermissions()

      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: 'Images',
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1
      });

      if (!result.cancelled) {
         setImageObj({
            imageSelected: true,
            imageId: uuidv4(),
            uri: result.uri,
         })
      } else {
         console.log('Cancelled')
         setImageObj({
            imageSelected: false
         })
      }
   }

   function uploadImage() {
      if (caption != '') {
         Keyboard.dismiss()
         sendImageToStorage(imageObj.uri)
         setCaption('')
      } else {
         alert('Please type in a caption')
      }
   }

   async function sendImageToStorage(uri) {
      const userId = f.auth().currentUser.uid;
      const imageId = imageObj.imageId;

      const re = /(?:\.([^.]+))?$/;
      const ext = re.exec(uri)[1]

      setUploading(true)

      const response = await fetch(uri);
      const blob = await response.blob()
      const FilePath = imageId + '.' + ext;

      let uploadTask = storage.ref('users/' + userId + '/img').child(FilePath).put(blob)

      uploadTask.on('state_changed', snapshot => {
         let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
         console.log('Upload is ' + progress + ' % complete')
         setProgress(progress)
      }, err => {
         console.log(err)
      }, () => {
         setProgress(100)
         uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
            console.log(downloadUrl)
            createDatabaseUserEntry(downloadUrl, caption)
         })
      })
   }

   function createDatabaseUserEntry(downloadUrl, caption) {
      const userId = f.auth().currentUser.uid
      const currentDate = Date.now()
      const timestamp = Math.floor(currentDate / 1000);
      const imageUrl = downloadUrl;

      const photoObj = {
         author: userId,
         caption: caption,
         posted: timestamp,
         url: downloadUrl
      }

      // ADD TO MAIN FEED
      database.ref('/photos/' + imageObj.imageId).set(photoObj)

      // ADD TO USER PHOTO OBJECT
      database.ref('/users/' + userId + '/photos/' + imageObj.imageId).set(photoObj)

      alert('Image Uploaded')

      setProgress(0)
      setUploading(false)

      setTimeout(() => {
         setImageObj({
            uri: '',
            imageSelected: false
         })
      }, 2000);
   }

   function getCaptionText(text) {
      setCaption(text)
   }

   function cancelImageUpload() {
      setImageObj({
         imageSelected: false,
         imageId: null,
         uri: null
      })
      navigation.navigate('Upload')
   }

   function navigateBackAfterCancel() {
      Alert.alert(
         'Cancel Upload?',
         '',
         [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => cancelImageUpload() },
         ],
         { cancelable: false }
      )
   }

   return (
      <Container>
         <Header style={{ alignItems: "center" }}>
            <Title>Upload</Title>
         </Header>

         <View style={IOSGlobal.centerAlignContent}>
            {imageObj.imageSelected ?
               (
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                     <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 10, paddingVertical: 20 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Caption:</Text>
                        <TextInput
                           editable={true}
                           placeholder={'Enter a caption'}
                           maxLength={150}
                           multiline={true}
                           numberOfLines={4}
                           onChangeText={getCaptionText}
                           style={IOSGlobal.uploadInput}
                           value={caption}
                        />
                        <TouchableOpacity
                           style={[IOSGlobal.uploadBtn, { backgroundColor: "#0082D9" }]}
                           onPress={uploadImage}
                        >
                           <Text style={IOSGlobal.uploadBtnLabel}>Upload & Publish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={[IOSGlobal.uploadBtn, { backgroundColor: "red" }]}
                           onPress={navigateBackAfterCancel}
                        >
                           <Text style={IOSGlobal.uploadBtnLabel}>Cancel</Text>
                        </TouchableOpacity>
                        {uploading ? (
                           <View>
                              <Text style={{ marginVertical: 14, fontSize: 16, alignSelf: "center" }}>{progress !== 100 ? `Uploading ${progress}%` : ""}</Text>
                              {progress !== 100 ? (
                                 <ActivityIndicator size="small" color="blue" />
                              ) : (
                                    // WHERE WE SEND THE DATA TO FIREBASE
                                    <View style={{ marginVertical: 14, fontSize: 16, alignSelf: "center" }}>
                                       {imageObj.imageSelected && <Text>Upload Complete!</Text>}
                                    </View>
                                 )}
                           </View>
                        ) : (
                              <View></View>
                           )}
                     </View>
                  </TouchableWithoutFeedback>
               ) :
               (
                  <View style={IOSGlobal.centerAlignContent}>
                     <Text style={{ fontWeight: "normal", fontSize: 30 }}>Upload</Text>
                     <TouchableOpacity
                        style={IOSGlobal.uploadBtn}
                        onPress={getNewImages}
                     >
                        <Text style={{ color: "#fff" }}>Select Photo</Text>
                 
                     </TouchableOpacity>
                  </View>
               )}
         </View>
      </Container>
   )
}
export default Upload