import React, { useState, useEffect } from 'react'

import { FlatList } from 'react-native'
import { Container, Header, Title } from 'native-base';

import LoadingFeedScreen from '../LoadingFeedScreen'
import { GenerateImage } from '../../utils/Utilities'
import { database } from '../../config/config'

import { IOSGlobal } from '../../styles/IOSStyles'

const Feed = ({ navigation, route }) => {
   const [photo_feed, setPhoto_feed] = useState([])
   const [refresh, setRefresh] = useState(false);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      loadFeed()
   }, [])

   function loadFeed() {
      let data = {};
      let feedList = [];

      setPhoto_feed([]);
      setRefresh(true);
      setLoading(true);

      database.ref('photos').once('value').then(snapshot => {
         if (snapshot.val()) {
            data = snapshot.val();
         }

         for (let photo in data) {
            database.ref('users').child(data[photo].author).child('surname').once('value').then(snapshotUser => {
               feedList.push({
                  id: photo,
                  url: data[photo].url,
                  caption: data[photo].caption,
                  posted: data[photo].posted,
                  author: data[photo].author
               });
               setPhoto_feed(feedList)
            }).catch(error => console.log(error));
         }
      }).catch(error => console.log(error));
      setTimeout(() => {
         setLoading(false)
      }, 1250);
      setRefresh(false);
   }

   function loadNew() {
      loadFeed()
   }

   return (
      <Container>
         <Header style={{ alignItems: "center" }}>
            <Title>Feed</Title>
         </Header>

         {loading
            ? (
               <LoadingFeedScreen />
            )
            : (<FlatList
               refreshing={refresh}
               onRefresh={loadNew}
               data={photo_feed}
               keyExtractor={(item, index) => index.toString()}
               style={{ flex: 1, backgroundColor: '#fff' }}
               renderItem={({ item, index }) => (
                  <GenerateImage
                     navigation={navigation}
                     item={item}
                     index={index}
                     user={item.author}
                  />
               )}
            />)}
      </Container>
   )
}

export default Feed
