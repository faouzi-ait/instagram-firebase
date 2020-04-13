import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

export const IOSGlobal = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  centerAlignContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  placeholder: {
    width: '100%',
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 5,
    overflow: 'hidden',
  },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 5,
    paddingRight: 5
  },
  caption: {
    paddingTop: 7,
    paddingLeft: 5,
    alignSelf: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 12
  },
  comments: {
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 6
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999
  },
  profile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey"
  },
  loginFields: {
    marginBottom: 10,
    height: 35,
    fontSize: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    width: Dimensions.get('window').width - 20
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  profileUser: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileMiddle: {
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey"
  },
  profilePhotoList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    backgroundColor: "#FFF"
  },
  userDetails: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  linkBtn: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 3,
    padding: 8,
    paddingRight: 12,
    paddingLeft: 12,
  },
  uploadBtn: {
    backgroundColor: "rgb(30,144,255)",
    padding: 10,
    borderRadius: 3,
    marginTop: 5
  },
  uploadInput: {
    marginVertical: 10,
    height: 100,
    width: Dimensions.get('window').width - 10,
    padding: 5,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#ccc',
    color: 'black',
    opacity: .8
  },
  uploadBtnLabel: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center"
  },
  uploadImage: {
    marginTop: 10,
    resizeMode: "cover",
    width: "100%",
    height: 275
  },
  addComment: { 
    width: 50, 
    paddingBottom: 10, 
    alignItems: "center"
  }
});
