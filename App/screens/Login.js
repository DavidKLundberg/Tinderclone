import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import * as Permissions from "expo-permissions";

import * as Facebook from "expo-facebook";
import { loginUrl, messageUrl, imageUrl, personalUrl } from "../components/Urls";
import { connect } from "react-redux";
import {
  getLocationAsync,
  updateLocation,
  registerForPushNotificationsAsync
} from "../components/registerPermissions";
import { FontAwesome } from "@expo/vector-icons";
import {
  ageOfInterest,
  name,
  hasUserPayed,
  isFemale,
  radius,
  gender,
  location,
  birthday,
  age,

  userPersonalityType,
  interestedInMale,

  aboutMe,
  interestedInFemale,

  owner,
  id,
  image1,
  storeHasChanged,
  addImageToArray,
  addImageIdToArray,
  interestedInOther,
  partnerPersonalityTypeOne
} from "../components/Redux/actions/personalAction";
import { chatUser, chatMessage } from "../components/Redux/actions/chatRoomAction";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      spamControl: false
    };
  }
 componentDidMount(){
  Facebook.initializeAsync("373611170163327", "VProject");
  if(this.props.personalDataReducer.owner != -99){
    this.props.navigation.navigate("mainStack");

  }
  
 }

  getAge(birthday) {
    console.log(birthday);
    var diff_ms = Date.now() - birthday.getTime();
    var age_dt = new Date(diff_ms);
    var userAge = Math.abs(age_dt.getUTCFullYear() - 1970);
    console.log(userAge + "USERAGE");
    return userAge;
  }
//  <Text style={styles.label}>C<Text style={[styles.label, styles.underline]}>lic</Text>k</Text>

  render() {
    let isLoggedIn = this.props.personalDataReducer.id;
  
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/homer.png")}
          style={styles.logo}
        />
        <Text style={styles.label}>Perfect Pair</Text>
        <FontAwesome.Button
          name="facebook-square"
          backgroundColor="#3b5998"
          onPress={
            (login = async () => {
              let firstName = name;
              this.setState({ spamControl: true });

              let currentLocation = await getLocationAsync();
              if (currentLocation !== "Not Granted") {
                let latLong = {
                  type: "Point",
                  coordinates: [
                    currentLocation.coords.latitude,
                    currentLocation.coords.longitude
                  ]
                };
                this.props.dispatch(location(latLong));

                if (isLoggedIn == -99) {
                  try {
                    const {
                      type,
                      token
                    } = await Facebook.logInWithReadPermissionsAsync(
                     
                      {
                        permissions: [
                          "public_profile",
                          "user_birthday",
                          "user_gender"
                        ]
                      }
                    );
                    console.log(token + "    token before re sponse");
                    if (type === "success") {
                      // Get the user's name using Facebook's Graph API
                      const response = await fetch(
                        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,gender,picture.type(large)`
                      );
                      //  const getPicture = await fetch("http://graph.facebook.com/${token}/picture?redirect=0"
                      //     )
                      //   console.log("getpicture " + getPicture.url + "\n\n\n"+ Object.keys(getPicture)+ "\n\n\n"+ getPicture._bodyBlob._data + Object.keys(getPicture._bodyBlob._data))
                      let user = await response.json();
                      console.log(
                        "USER \n\n\n " +
                          user +
                          Object.keys(user) +
                          user.id +
                          "\n\n\n  USER"
                      );
                      console.log(
                        "FB USER : " +
                          "\n " +
                          user +
                          "\n " +
                          Object.keys(user) +
                          "\n height   " +
                          user.picture.data.height +
                          "\n url   " +
                          user.picture.data.url +
                          "\n width   " +
                          user.picture.width
                      );
                      //send authtoken to server to authenticate, server sends back info
                      let firstAndLastName = user.name.split(" ");
                      let fbAge = new Date(user.birthday);
                      let calculatedAge = this.getAge(fbAge);
                      if (calculatedAge < 18) {
                        Alert.alert(
                          "Sadly you are too young, feel free to comeback after you are 18"
                        );
                        return;
                      }
                      //about logged in user and it gets put in redux storage
                      fetch(loginUrl, {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
          
                          "Content-Type": "application/json; charset=UTF-8",
                          "WWW-Authenticate": this.props.personalDataReducer.owner
                        },
                        body: JSON.stringify({
                          access_token: token
                        })
                      })
                        .then(response => response.json())
                        .then(data => {
                          console.log("DATA.KEY : " + data.key);
                          console.log("DATA.KEY : " + JSON.stringify(data));
                   

                 

                            console.log("pushToken2"+this.props.personalDataReducer.pushToken)


                          //If this is the first time user logs in
                          if (data.Personal[0].name == undefined) {
                            this.props.dispatch(storeHasChanged(true));
                            this.props.dispatch(firstName(firstAndLastName[0]));
                            console.log("IN LOGIN.js remove image jha");
                            //this.props.dispatch(image1(user.picture.data.url))
                            this.props.dispatch(owner(data.key));
                            this.props.dispatch(birthday(user.birthday));
                            this.props.dispatch(age(calculatedAge));
                            console.log("\n\n\n" + user.gender);
                            let genderNumber = 0;
                            if (user.gender == "male") {
                              genderNumber =1 ;
                            } else if (user.gender == "female") {
                              genderNumber =2 ;
                            } else {
                              genderNumber =3 ;
                            }
                            this.props.dispatch(gender(genderNumber));
                            this.props.navigation.navigate("PrivacyScreen");
                            fetch(personalUrl+ this.props.personalDataReducer.id+"/", {
                              method: "PATCH",
                              headers: {
                                Accept: "application/json",
                    
                                "Content-Type": "application/json; charset=UTF-8",
                                "WWW-Authenticate": this.props.personalDataReducer.owner
                              },
                              body: JSON.stringify({
                                name:firstAndLastName[0],
                                age:calculatedAge,
                                birthday:user.birthday,
                                gender:genderNumber,
                              })
                            })
                            registerForPushNotificationsAsync(this.props.personalDataReducer.owner,this.props.personalDataReducer.id)

                            this.setState({ spamControl: false });
                          } else {
                            //storehaschanged is to flag if server values and store differs,
                            //since this is data from the server, it hasn't. Which is why
                            //its not called here
                            this.props.dispatch(birthday(user.birthday));
                            this.props.dispatch(age(calculatedAge));
                            if (user.gender == "male") {
                              this.props.dispatch(gender(1));
                            } else if (user.gender == "female") {
                              this.props.dispatch(gender(2));
                            } else {
                              this.props.dispatch(gender(3));
                            }
                            this.props.dispatch(owner(data.key));
                            this.props.dispatch(
                              firstName(data.Personal[0].name)
                            );
                            this.props.dispatch(
                              ageOfInterest([
                                data.Personal[0].minAgeOfInterest,
                                data.Personal[0].maxAgeOfInterest
                              ])
                            );
                        
                            this.props.dispatch(
                              radius(data.Personal[0].radius)
                            );
                            console.log(JSON.stringify(data.Personal[0].Images) + "asd asd")

                            console.log(JSON.stringify(data.Personal[0].Images[0]) + "asd ")
                           if(data.Personal[0].Images !== undefined ){
                             for(let i=0;i<data.Personal[0].Images.length;i++){
                               this.props.dispatch(addImageToArray(data.Personal[0].Images[i].image1))
                               this.props.dispatch(addImageIdToArray(data.Personal[0].Images[i].id))
                               console.log("login images downloaded  " + JSON.stringify(this.props.personalDataReducer.imageArray))
                             }
                           }
                            
                            this.props.dispatch(
                              hasUserPayed(data.Personal[0].hasUserPayed)
                            );
                            this.props.dispatch(
                              userPersonalityType(
                                data.Personal[0].userPersonalityType
                              )
                            );
                            this.props.dispatch(
                              partnerPersonalityTypeOne(
                                data.Personal[0].partnerPersonalityTypeOne
                              )
                            );
                            this.props.dispatch(
                              aboutMe(data.Personal[0].aboutMe)
                            );
                            this.props.dispatch(
                              interestedInFemale(
                                data.Personal[0].interestedInFemale
                              )
                            );
                            this.props.dispatch(gender(data.Personal[0].gender))
                            this.props.dispatch(
                              interestedInMale(
                                data.Personal[0].interestedInMale
                              )
                            );
                            this.props.dispatch(interestedInOther(data.Personal[0].interestedInOther))

                            this.props.dispatch(id(data.Personal[0].id));
                            
                            this.props.navigation.navigate("quizVersionTwo");
                            registerForPushNotificationsAsync(this.props.personalDataReducer.owner,this.props.personalDataReducer.id)

                            this.setState({ spamControl: false });
                          }
                        })

                        .catch(error => {
                          console.log("1ERROR   " + error);
                          Alert.alert("1error");
                        });
                    } else {
                      // type === 'cancel'
                    }
                  } catch ({ message }) {
                    console.log("CATCH     " + message);
                    Alert.alert(`Facebook Login Error: ${message}`);
                  }
                } else {
                  this.props.navigation.navigate("quizVersionTwo");
                  this.setState({ spamControl: false });
                }
              } else {
                Alert.alert("Location services are required to proceed!");
              }
            })
          }
        >
          Login with Facebook
        </FontAwesome.Button>
        <TouchableOpacity
          onPress={() => {
            updateLocation();
            this.props.navigation.navigate("quizVersionTwo");
          }}
        >
          <Text style={styles.serverbypass}>Temporary login bypass</Text>
        </TouchableOpacity>

  </View>
    );
  }
}
/**
 * 
 * 

        <TouchableOpacity
          onPress={() => {
            updateLocation();
            this.props.navigation.navigate("mainStack");
          }}
        >
          <Text style={styles.serverbypass}>MainStack</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
                /*    <Image source={{uri: 'http://192.168.8.112:8000/media/photos/image_dHO93Xu.jpg'}}
       style={{width: 400, height: 400}} />*/
            /**
             * sender = request.data.get("sender")
		reciever = request.data.get("reciever")
		message = request.data.get("message")
		recieverToken = request.data.get("pushToken")
		timestamp = request.data.get("timestamp")
             */
           /* let token ="ExponentPushToken[LSJnh7DxGQTomMtGHhbuy6]"
            fetch(messageUrl, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8"
              },
              body: JSON.stringify({
                sender:4,
                message:"asdasdasd",
                pushToken:token,
                timestamp: 23918299,
                reciever:8
              })
            })*
        
            let date = Date.now()
            let img ="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2326759664057571&height=200&width=200&ext=1577985762&hash=AeSDj7xJUo8eJ2nV";
            fetch(messageUrl, {
              method: "POST",
              headers: {
                Accept: "application/json",

                "Content-Type": "application/json; charset=UTF-8",
                "WWW-Authenticate": this.props.personalDataReducer.owner
              },
              body: JSON.stringify({
                room :6,
                reciever :8,
                message :"Mesasad",
                timestamp: date,
              })
            })
          }}
        >
          <Text style={styles.serverbypass}>Custom FACEBOOK</Text>
        </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {
              /**
               * sender = request.data.get("sender")
      reciever = request.data.get("reciever")
      message = request.data.get("message")
      recieverToken = request.data.get("pushToken")
      timestamp = request.data.get("timestamp")
               */
             /* let token ="ExponentPushToken[LSJnh7DxGQTomMtGHhbuy6]"
              fetch(messageUrl, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                  sender:4,
                  message:"asdasdasd",
                  pushToken:token,
                  timestamp: 23918299,
                  reciever:8
                })
              })*
              let payload={
              user:{
                name: "ssssd",
                image1:
          null,
                image2:
          null,
                image3: null,
                image4: null,
                image5: null,
                aboutMe: "adda",
                userPersonalityType: "INFJ",
                location: {
                  "type": "Point",
                  "coordinates": [
                    75.0001,      
                    75.0001		  
                  ]
                },
                age: -99,
                haveChildren: true,
                wantChildren: true,
                mightWantChildren: true,
                iDontKnowIfIWantChildren: true,
                haveDogs: true,
                haveCats: true,
                haveHorses: true,
                pushToken: -99,
                noPets: true,
                //some other pet
                messages: [],
                
                
              
                haveSomethingElse: true,
                hindu: true,
                christian: true,
                muslim: true,
                buddhist: true,
                athiest: true,
                jew: true,
                someOtherReligion: true,
                roomNumber: 6
              },
              index:6
            }
            console.log(JSON.stringify(this.props.chatRoomReducer))
              this.props.dispatch(chatUser(payload))
              console.log(JSON.stringify(this.props.chatRoomReducer))

            }}
          >
            <Text style={styles.serverbypass}>test msg </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
             this.props.navigation.navigate("PrivacyScreen")
            }}
          >
            <Text style={styles.serverbypass}>PrivacyScreen </Text>
          </TouchableOpacity>
      
 * 
 */
const mapStateToProps = state => ({
  personalDataReducer: state.personalDataReducer,
  chatRoomReducer: state.chatRoomReducer
});

export default connect(mapStateToProps)(Login);

_getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    this.setState({
      errorMessage: "Permission to access location was denied"
    });
  }

  let location = await Location.getCurrentPositionAsync({});
  this.setState({ location });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontSize: 40,
    fontWeight: "300",
    marginBottom: 48
  },
  facebookLoginButton: {
    backgroundColor: "#4267b2",
    borderRadius: 5,
    flexDirection: "row"
  },
  serverbypass: {
    textAlign: "center",
    borderColor: "grey",
    borderWidth: 0.5,
    padding: 10,
    margin: 5,
    borderRadius: 4,
    fontSize: 15,
    textAlignVertical: "center",
    margin: 10
  },
  logo: {
    width: "100%",
    height: 400
  },
  underline:{
    textDecorationLine: "underline",
    
  }
});

/* 

*/
