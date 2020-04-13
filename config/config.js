import firebase from 'firebase'

const firebaseConfig = {
   apiKey: "AIzaSyDjnApIX37642b0OgVwJWYgL21b2pkt00s",
   authDomain: "instaclone-41336.firebaseapp.com",
   databaseURL: "https://instaclone-41336.firebaseio.com",
   projectId: "instaclone-41336",
   storageBucket: "instaclone-41336.appspot.com",
   messagingSenderId: "406020784169",
   appId: "1:406020784169:web:3b5ce1db04062e590a9c38"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const f = firebase
export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()