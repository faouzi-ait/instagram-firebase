import React, {useState} from 'react'
import { Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Dimensions, Alert } from 'react-native'
import { f, database, auth } from '../config/config'

import { IOSGlobal } from '../styles/IOSStyles'

const LoginScreen = ({ navigation, route }) => {
   const [isNew, setIsNew] = useState(false)
   const [username, setUsername] = useState()
   const [password, setPassword] = useState()
   const [name, setName] = useState()
   const [surname, setSurname] = useState()
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const loginUser = () => {
      if (!username || !password) {
         Alert.alert('Insta-clone', 'Please enter your details to login')
      } else {
         auth.signInWithEmailAndPassword(username, password)
            .then((res) => {
               console.log(res)
               navigation.navigate('Loading')
            }).catch(error => setError(error.message))
      }
   }

   const registerUser = async () => {
      if (!username || !password) {
         Alert.alert('Insta-clone', 'Enter your details to signup!')
      } else {
         setIsLoading(true)
   
         await auth.createUserWithEmailAndPassword(username, password)
         .then((res) => {
            // CREATE USER IN DATABASE FROM HERE
            // USE THE UID AS THE ID AND CREATE THE ATTRIBUTE
            database.ref('/users/' + res.user.uid).set({
               name: name,
               surname: surname,
               avatar: "https://i.pravatar.cc/300"
            });
            console.log('User registered successfully!')
            console.log(res.user.uid)
            navigation.navigate('Loading')
         }).catch(error => setError(error))
         
         setIsLoading(false)
         setUsername('')
         setPassword('')
      }
   }

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={IOSGlobal.login}>
            {!isNew && <Text style={{fontSize:30, marginBottom: 20}}> Login </Text>}
            {isNew && <Text style={{fontSize:30, marginBottom: 20}}> Register </Text>}
            
            <TextInput
               editable={true}
               placeholder={'Enter your email'}
               onChangeText={(val) => setUsername(val)}
               style={IOSGlobal.loginFields}
               value={username}
            />
            <TextInput
               editable={true}
               placeholder={'Enter your password'}
               onChangeText={(val) => setPassword(val)}
               style={IOSGlobal.loginFields}
               value={password}
            />

            {isNew &&
               <>
                  <TextInput
                     editable={true}
                     placeholder={'Enter your name'}
                     onChangeText={(val) => setName(val)}
                     style={IOSGlobal.loginFields}
                     value={name}
                  />
                  <TextInput
                     editable={true}
                     placeholder={'Enter your surname'}
                     onChangeText={(val) => setSurname(val)}
                     style={IOSGlobal.loginFields}
                     value={surname}
                  />
               </>
            }

            {/* DISPLAY IF EXISTING USER */}
            {!isNew && <TouchableOpacity
               style={[IOSGlobal.uploadBtn, { backgroundColor: "#0082D9", width: Dimensions.get('window').width - 20 }]}
               onPress={loginUser}
            >
               <Text style={[IOSGlobal.uploadBtnLabel]}>Login</Text>
            </TouchableOpacity>}

            {/* DISPLAY IF USER IS NEW */}
            {isNew && <TouchableOpacity
               style={[IOSGlobal.uploadBtn, { backgroundColor: "#0082D9", width: Dimensions.get('window').width - 20 }]}
               onPress={registerUser}
            >
               <Text style={[IOSGlobal.uploadBtnLabel]}>Register</Text>
            </TouchableOpacity>}
            {error !== '' && <Text style={{ marginTop: 20, fontSize: 20, color: "red" }}>Login failed, please try again</Text>}

            {isNew && <Text style={{ marginTop: 10, fontSize: 15, color: "blue" }} onPress={() => setIsNew(false)}>Already a member? click here!</Text>}
            {!isNew && <Text style={{ marginTop: 10, fontSize: 15, color: "blue" }} onPress={() => setIsNew(true)}>Not a member? register here!</Text>}
         </View>
      </TouchableWithoutFeedback>
   )

}

export default LoginScreen