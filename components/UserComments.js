import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image, TouchableWithoutFeedback, Keyboard, Alert, Dimensions } from 'react-native'
import { Container, Header, Title, Right, Left, Body } from 'native-base';
import { timeConverter, uuidv4 } from '../utils/Utilities'

import { f, database } from '../config/config'

import { IOSGlobal } from '../styles/IOSStyles'

const UserComments = ({ navigation, route }) => {
   const [currentUser, setCurrentUser] = useState();
   const [userAvatar, setUserAvatar] = useState();
   const [photoParam, setPhotoParam] = useState();
   const [getComment, setGetComment] = useState();
   const [addComment, setAddComment] = useState(false);
   const [commentList, setCommentList] = useState([]);

   useEffect(() => {
      checkParam()
      setCurrentUser(f.auth().currentUser.uid);
      fetchCommentList(photoParam);
      getUserAvatar(f.auth().currentUser.uid)
   }, [photoParam])

   function checkParam() {
      if (route.params) {
         setPhotoParam(route.params.photoId)
      }
   }

   async function fetchCommentList(photoId) {
      const localPhotoList = []
      await database.ref('comments').child(photoId).once('value').then(snapshot => {
         let data = '';

         if (snapshot.val()) {
            data = snapshot.val();
         }

         for (let comment in data) {
            localPhotoList.push(data[comment])
         }
      }).catch(error => console.log(error));
      setCommentList(localPhotoList)
   }

   // MUST BE FIXED UP TO GET THE AVATAR FROM THE EMAIL NOT THE CURRENT USER ID
   async function getUserAvatar(userId) {
      await database.ref('users').child(userId).child('avatar').once('value').then(snapshot => {
         let data = '';

         if (snapshot.val()) {
            data = snapshot.val();
         }
         setUserAvatar(data)
      }).catch(error => console.log(error));
   }

   async function submitNewComment() {
      const a = Date.now()
      const timestamp = Math.floor(a / 1000)
      const commentId = uuidv4()

      if (getComment === '') {
         Alert.alert('Insta_clone', 'Please type in a comment before submiting')
         return false
      } 
      
      await database.ref('/comments/' + photoParam + '/' + commentId).set({
         author: currentUser,
         avatar: userAvatar,
         comment: getComment,
         posted: timestamp
      });
      
      Keyboard.dismiss()
      setGetComment('')
   }

   return (
      <Container>
         <Header>
            <Left style={{ justifyContent: "center" }}>
               <TouchableOpacity transparent
                  onPress={() => navigation.goBack()}
               >
                  <Text style={{ fontSize: 35, color: "#0082D9", paddingLeft: 10 }}>&#8592;</Text>
               </TouchableOpacity>
            </Left>
            <Body>
               <Title>Comments</Title>
            </Body>
            <Right >
               <TouchableOpacity onPress={() => setAddComment(c => c = !c)} style={IOSGlobal.addComment}>
                  <View>
                     <Text style={{ fontSize: 35, color: "#0082D9" }}>{!addComment ? "+" : "-"}</Text>
                  </View>
               </TouchableOpacity>
            </Right>
         </Header>
         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            {!addComment ?
               <ScrollView>
                  {commentList ? commentList.map((item, i) =>
                     <View style={{ marginBottom: 10, marginLeft: 0, flexDirection: "row", alignContent: "center", justifyContent: "flex-start", width: Dimensions.get('window').width - 10 }} key={i}>
                        <Image
                           source={{ uri: userAvatar }}
                           style={{ width: 60, height: 60, borderRadius: 30 }}
                        />
                        <View style={{ justifyContent: "center", marginLeft: 15 }}>
                           <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>{item.author.substring(0, 7)} - {timeConverter(item.posted)}</Text>
                           <Text>{item.comment}</Text>
                        </View>
                     </View>
                  ) : <Text>No Comments to display</Text>}
               </ScrollView>
               :
               <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={{ flex: 1}}>
                     <Text style={{alignSelf: "center", fontWeight: "bold", fontSize: 16}}>Enter a comment:</Text>
                     <TextInput
                        editable={true}
                        placeholder={'Enter a Comments'}
                        maxLength={150}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(val) => setGetComment(val)}
                        style={IOSGlobal.uploadInput}
                        value={getComment}
                     />
                     <TouchableOpacity
                        style={[IOSGlobal.uploadBtn, { backgroundColor: "#0082D9" }]}
                        onPress={submitNewComment}
                     >
                        <Text style={IOSGlobal.uploadBtnLabel}>Upload & Publish</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={[IOSGlobal.uploadBtn, { backgroundColor: "red" }]}
                        onPress={() => setAddComment(false)}
                     >
                        <Text style={IOSGlobal.uploadBtnLabel}>Cancel</Text>
                     </TouchableOpacity>
                  </View>
               </TouchableWithoutFeedback>
            }
         </View>
      </Container >
   )
}

export default UserComments