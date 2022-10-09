import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Notifications } from "expo";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  BackHandler,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Swiper from "react-native-swiper";
import { connect } from "react-redux";
import LoadImages from "../../components/LoadImages";
import { chatUser } from "../../components/Redux/actions/chatRoomAction";
import { chatMessage } from "../../components/Redux/actions/chatMessageAction";
import {
  aboutMe,
  ageOfInterest,
  filterOutFreeUsers,
  interestedInOther,
  interestedInFemale,
  interestedInMale,
  personalityFilter,
  radius,
  storeHasChanged,
  userLogout,
  imageArray,
  addImageToArray,
  userPersonalityType,
  addImageIdToArray,
  imageIdArray
} from "../../components/Redux/actions/personalAction";
import { registerForPushNotificationsAsync, getCameraRollPermissionAync } from "../../components/registerPermissions";
import {
  personalUrl,
  imageUrl,
  deleteUrl,
  logoutUrl
} from "../../components/Urls";
import { pushTokenId } from "../../components/Redux/actions/pushTokenAction";
import * as Icon from "@expo/vector-icons";

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerStyle: { height: Platform.OS === "ios" ? 30 : 30 },

      headerTitle: (
        <View style={{ flexDirection: "row" }}>
         
          <Icon.Ionicons
                        onPress={params.viewQuizOptions}
                        name={
                          Platform.OS === "ios"
                            ? "ios-bookmark"
                            : "md-bookmark"
                        }
                        size={27}
                        color={"black"}
                        style={{ flex: 5, marginTop: -9, paddingLeft: 40}}

                      />
 
          <Icon.Ionicons
                        onPress={params.logoutDeleteVisible}
                        name={
                          "close-outline"
                        }
                        size={27}
                        color={"black"}
                        style={{ marginTop: -10, flex: 1 }}

                      />
        
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      radius: [50],
      ageValues: [18, 55],
      rerender: 0,
      aboutMeText: ""
    };
  }
  
  handleBackPress = () => {
    return false;
  }
  _viewQuizOptions = () => {
    Alert.alert(
      "Quiz",
      "Do want to learn more about the quiz or take it again? ",

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Redo the quiz",
          onPress: () => {
            this.props.dispatch(userPersonalityType(""));
            this.props.navigation.navigate("quizVersionTwo");
          }
        },

        {
          text: "Read about my score from the quiz",
          onPress: () =>{
          console.log("onpress + " + this.props.personalDataReducer.userPersonalityType)
            this.props.navigation.navigate("MyResults")
        }},
        {
          text: "Read about the personalities",
          onPress: () => this.props.navigation.navigate("QuizPersonalities")
        }
      ],
      { cancelable: false }
    );
  };

  _logoutDeleteVisible = () => {
    Alert.alert(
      "Account Management",
      "Do you wish to logout or delete your account",

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Logout", onPress: () => this._logoutFromAccount() },

        { text: "Delete", onPress: () => this._deleteAccout() }
      ],
      { cancelable: false }
    );
  };
  didBlurSubscription = this.props.navigation.addListener("didBlur", () => {
    this.sendNewPersonalDataToServer();
  });
  _deleteAccout() {
    Alert.alert(
      "Delete Accout",
      "Are you sure you want to delete your account?",

      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },

        {
          text: "Yes",
          onPress: () => {
            fetch(deleteUrl, {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8",
                "WWW-Authenticate": this.props.personalDataReducer.owner
              }
            });
          }
        }
      ],
      { cancelable: false }
    );
  }

  _logoutFromAccount() {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",

      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },

        {
          text: "Yes",
          onPress: () => {
            fetch(logoutUrl, {
              method: "GET",
              headers: {
                Accept: "application/json",

                "Content-Type": "application/json; charset=UTF-8",
                "WWW-Authenticate": this.props.personalDataReducer.owner
              }
            });
            this.props.dispatch(pushTokenId(-99));
            this.props.dispatch(userLogout());
            this.props.navigation.navigate("Login");
          }
        }
      ],
      { cancelable: false }
    );
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
/*
    console.log(JSON.stringify(this.props.personalDataReducer))
    this.didBlurSubscription;
    this.props.navigation.setParams({
      logoutDeleteVisible: this._logoutDeleteVisible,
      viewQuizOptions: this._viewQuizOptions
    });
    let pushTokenIdFromServer = registerForPushNotificationsAsync(
      this.props.personalDataReducer.owner,
      this.props.personalDataReducer.id
    );
    this.props.dispatch(pushTokenId(pushTokenIdFromServer));
 */
    if (this.props.personalDataReducer.id != -99) {
    }
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    console.log("subscribe!!");

    //this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  componentWillUnmount() {

    console.log("Will unmount");
    this.backHandler.remove()

    // Remove the listener when you are done
    this.didBlurSubscription.remove();
  
  }

  _handleNotification = notification => {
    /**
     *
     {"userText":null,"actionId":null,"remote":true,
     "isMultiple":false,"notificationId":-1515163951,
     "data":{"sender":5,"message":"Mesasad","timestamp":1575553514155}
     ,"origin":"received"}
     */
    console.log("NOTIFICATION!!");
    console.log(JSON.stringify(this.props.chatMessageReducer))
    console.log(JSON.stringify(this.props.chatRoomReducer))

    console.log(JSON.stringify(notification));

    console.log(JSON.stringify(notification.data.message));
    console.log(JSON.stringify(typeof notification.data.message));

    //notification was a message so it is
    //sorted into chatmessages
    if (notification.data.message !== undefined) {
      console.log("1!!");

      let chatMsg = {
        message: {
          message: notification.data.message,
          sender: notification.data.sender,
          timestamp: notification.data.timestamp
        },
        index: notification.data.room
      };
      console.log("Old user     +    "  + chatMsg)
      this.props.dispatch(chatMessage(chatMsg));

      //Notification was a new match
      //so it will be sorted into chatusers
    } else if (notification.data.userData !== undefined) {
      console.log("2!!");

      let userData = notification.data.userData;
      if (this.props.personalDataReducer.id == userData.userOnePersonal.id) {
        console.log("3!!");

        let distance = this.distance(
          userData.userTwoPersonal.location.coordinates[0],
          userData.userTwoPersonal.location.coordinates[1],
          this.props.personalDataReducer.location.coordinates[0],
          this.props.personalDataReducer.location.coordinates[1],
          "M"
        );
        let imageArrayFromServer = [];
        for (i = 0; i < userData.userTwoPersonal.Images.length; i++) {
          imageArrayFromServer.push(userData.userTwoPersonal.Images[i].image1);
        }/* object needs to be split into two, a message and a user, and then inserted into the correct pile
        let chatMsg = {
          message: {
            name: userData.userTwoPersonal.name,
            imageArray: imageArrayFromServer,
            messages: userData.Message,
            aboutMe: userData.userTwoPersonal.aboutMe,
            userPersonalityType: userData.userTwoPersonal.userPersonalityType,
            actualDistance: distance,
            age: userData.userTwoPersonal.age,
            ownerMatch: userData.userTwoPersonal.id
          },
          index: notification.data.id
        };
        console.log("New user   1  +    "  + chatMsg)

        this.props.dispatch(chatUser(chatMsg));
      } else if (

        this.props.personalDataReducer == userData.userTwoPersonal.id
      ) {
        console.log("4!!");

        let distance = this.distance(
          userData.userOnePersonal.location.coordinates[0],
          userData.userOnePersonal.location.coordinates[1],
          this.props.personalDataReducer.location.coordinates[0],
          this.props.personalDataReducer.location.coordinates[1],
          "M"
        );
        let imageArrayFromServer = [];
        for (i = 0; i < userData.userOnePersonal.Images.length; i++) {
          imageArrayFromServer.push(userData.userOnePersonal.Images[i].image1);
        }
        let chatMsg = {
          message: {
            name: userData.userOnePersonal.name,
            imageArray: imageArrayFromServer,
            messages: userData.Message,
            aboutMe: userData.userOnePersonal.aboutMe,
            userPersonalityType: userData.userOnePersonal.userPersonalityType,
            actualDistance: distance,
            age: userData.userOnePersonal.age,
            ownerMatch: userData.userOnePersonal.id
          },
          index: notification.data.id
        };
        console.log("New user   2  +    "  + payload)

        this.props.dispatch(chatUser(payload));*/


      }
    }
  };
  sendNewPersonalDataToServer() {
    if (this.state.locationWasDenied != true) {
      //&longitude=75.0001&latitude=75.0001&isFemale=True&interestedInFemale=True&interestedInMale=True&userPersonality=INFJ&partnerPersonalityOne=INFJ

      // release control, so that handlers can be called, and continue in 10ms
      if (this.props.personalDataReducer.id != -99) {

        //meant to fire everytime if it isnt the first time
        //Update my profile
        fetch(personalUrl + this.props.personalDataReducer.id + "/", {
          method: "PATCH",
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json; charset=UTF-8",
            "WWW-Authenticate": this.props.personalDataReducer.owner
          },
          body: JSON.stringify({
            age: this.props.personalDataReducer.age,
            name: this.props.personalDataReducer.name,
            minAgeOfInterest: this.props.personalDataReducer.ageOfInterest[0],
            maxAgeOfInterest: this.props.personalDataReducer.ageOfInterest[1],
            aboutMe: this.props.personalDataReducer.aboutMe,
            interestedInMale: this.props.personalDataReducer.interestedInMale,
            interestedInFemale: this.props.personalDataReducer
              .interestedInFemale,
            interestedInOther:this.props.personalDataReducer.interestedInOther,
            gender: this.props.personalDataReducer.gender,
            radius: this.props.personalDataReducer.radius,
            location: {
              type: "Point",
              coordinates: [
                this.props.personalDataReducer.location.coordinates[0],
                this.props.personalDataReducer.location.coordinates[1]
              ]
            },
            hasUserPayed: this.props.personalDataReducer.hasUserPayed,
            dateOfLastPayment: this.props.personalDataReducer.dateOfLastPayment,
            userPersonalityType: this.props.personalDataReducer
              .userPersonalityType,
            partnerPersonalityTypeOne: this.props.personalDataReducer
              .partnerPersonalityTypeOne,
            personalityMatchFilter: this.props.personalDataReducer
              .personalityFilter,
             owner: this.props.personalDataReducer.owner
          })
        }).catch(error => console.log("CATCH \n\n\n " + error));
      } else {
    
        //Only meant to fire if this is a new user, who therefor doesnt have
        //an ID from server
        fetch(personalUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json; charset=UTF-8",
            "WWW-Authenticate": this.props.personalDataReducer.owner
          },
          body: JSON.stringify({
            age: this.props.personalDataReducer.age,
            name: this.props.personalDataReducer.name,
            minAgeOfInterest: this.props.personalDataReducer.ageOfInterest[0],
            maxAgeOfInterest: this.props.personalDataReducer.ageOfInterest[1],
            aboutMe: this.props.personalDataReducer.aboutMe,
            interestedInMale: this.props.personalDataReducer.interestedInMale,
            interestedInFemale: this.props.personalDataReducer
              .interestedInFemale,
            interestedInOther: this.props.personalDataReducer
              .interestedInOther,
            gender: this.props.personalDataReducer.gender,
            radius: this.props.personalDataReducer.radius,
            location: {
              type: "Point",
              coordinates: [
                this.props.personalDataReducer.location.coordinates[0],
                this.props.personalDataReducer.location.coordinates[1]
              ]
            },
            hasUserPayed: this.props.personalDataReducer.hasUserPayed,
            dateOfLastPayment: this.props.personalDataReducer.dateOfLastPayment,
            userPersonalityType: this.props.personalDataReducer
              .userPersonalityType,
            personalityMatchFilter: this.props.personalDataReducer
              .personalityFilter,

            partnerPersonalityTypeOne: this.props.personalDataReducer
              .partnerPersonalityTypeOne,
           

            owner: this.props.personalDataReducer.owner
          })
        })
          .then(response => response.json())
          .then(data => {
            let user = {
              age: this.props.personalDataReducer.age,
              name: this.props.personalDataReducer.name,
              minAgeOfInterest: this.props.personalDataReducer.ageOfInterest[0],
              maxAgeOfInterest: this.props.personalDataReducer.ageOfInterest[1],
              aboutMe: this.props.personalDataReducer.aboutMe,
              interestedInMale: this.props.personalDataReducer.interestedInMale,
              interestedInFemale: this.props.personalDataReducer
                .interestedInFemale,
                interestedInOther: this.props.personalDataReducer
                .interestedInOther,
              gender: this.props.personalDataReducer.gender,
              radius: this.props.personalDataReducer.radius[0],
              location: {
                type: "Point",
                coordinates: [
                  this.props.personalDataReducer.location.coordinates[0],
                  this.props.personalDataReducer.location.coordinates[1]
                ]
              },
              hasUserPayed: this.props.personalDataReducer.hasUserPayed,
              dateOfLastPayment: this.props.personalDataReducer
                .dateOfLastPayment,
              userPersonalityType: this.props.personalDataReducer
                .userPersonalityType,
              personalityMatchFilter: this.props.personalDataReducer
                .personalityFilter,

              partnerPersonalityTypeOne: this.props.personalDataReducer
                .partnerPersonalityTypeOne,
    
              owner: this.props.personalDataReducer.owner
            };
            var myJSON = JSON.stringify(user);
            console.log(
              "In SettingsMain, this is if user doesnt have an id in redux store   " +
                Object.keys(data) +
                "\n\n\n" +
                "USER" +
                myJSON
            );
            console.log(this.props.personalDataReducer + "\n\n\n");
            console.log(Object.keys(this.props.personalDataReducer) + "\n\n\n");
            // this.props.dispatch(id(data[0].id));
          })
          .catch(error => console.log("CATCH \n\n\n " + error));
      }
    }
  }

  changeValueOfButton = (valueBeingChanged, functionUsed) => {
    if (this.props.personalDataReducer.storeHasChanged != true) {
      this.props.dispatch(storeHasChanged(true));
    }

    if (valueBeingChanged === false) {
      this.props.dispatch(functionUsed(true));
    } else {
      this.props.dispatch(functionUsed(false));
    }
  };

  changePersonalityMatchFilter = filterValue => {
    if (this.props.personalDataReducer.storeHasChanged != true) {
      this.props.dispatch(storeHasChanged(true));
    }

    this.props.dispatch(personalityFilter(filterValue));
  };

  enableScroll = () =>
    this.setState({
      scrollEnabled: true
    });
  disableScroll = () =>
    this.setState({
      scrollEnabled: false
    });
  ageOfInterest = values => {
    //this.setState({ageValues:values})
    if (this.props.personalDataReducer.storeHasChanged != true) {
      this.props.dispatch(storeHasChanged(true));
    }

    this.props.dispatch(ageOfInterest(values));
  };
  pressGlobal = () => {
    if (this.props.personalDataReducer.storeHasChanged != true) {
      this.props.dispatch(storeHasChanged(true));
    }

    if (this.props.personalDataReducer.radius[0] < 205) {
      this.setState({ radius: this.props.personalDataReducer.radius });
      this.props.dispatch(radius([100000000]));
      console.log("1000000000");
    } else {
      this.props.dispatch(radius(this.state.radius));
      console.log("50");
    }
  };

  rangeSliderValuesChange = values => {
    if (this.props.personalDataReducer.storeHasChanged != true) {
      this.props.dispatch(storeHasChanged(true));
    }

    // this.setState({radius:values})
    this.props.dispatch(radius(values));
  };
  rankValues(value) {}


  premiumFunction() {
    Alert.alert("This is a premium function");
  }
  _termsScreen = () => {
    this.props.navigation.navigate("Terms");
  };
  _gdprScreen = () => {
    this.props.navigation.navigate("Gdpr");
  };
  _payScreen = () => {
    this.props.navigation.navigate("PayScreen");
  };
  aboutMeFunction(text) {
    if (this.props.personalDataReducer.storeHasChanged != true) {
      this.props.dispatch(storeHasChanged(true));
    }
    this.props.dispatch(aboutMe(text));
  }

  _pickImage = async () => {
    getCameraRollPermissionAync()
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      console.log("IMAGE PICKER");
      console.log(result);
      console.log(result.uri);

      if (this.props.personalDataReducer.id != -99) {
        console.log(this.props.personalDataReducer.id + "\n\n\n" + result.uri);
        const formData = new FormData();
        formData.append("owner", this.props.personalDataReducer.id);
        formData.append("image1", 
        {
          uri: result.uri,
          name: "image.jpg",
          type: "image/jpeg"
        });

        console.log("FORM DATA " + JSON.stringify(formData));
        fetch(imageUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "WWW-Authenticate": this.props.personalDataReducer.owner
          },
          body: formData
        })
          .then(response => {
        fetch(imageUrl + "?owner="+ this.props.personalDataReducer.id, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "WWW-Authenticate": this.props.personalDataReducer.owner
          
          }}).then(response => response.json()).then(
            data=>{
              console.log(JSON.stringify(data))
              imgArr = []
              imgIdArr = []
              for(i=0;i<data.length;i++){
                imgArr.push(data[i].image1)
                imgIdArr.push(data[i].id)
              }
              this.props.dispatch(imageArray(imgArr))
              this.props.dispatch(imageIdArray(imgIdArr))
              console.log(JSON.stringify(this.props.personalDataReducer.imageArray))

            }
          )
          }
          )
          .catch(error => console.log("ERROR     " + error));
      }
    }
  };

  render() {
    console.log("Write someting about you isnt working")
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={105}
      >
        <ScrollView
          scrollEnabled={this.state.scrollEnabled}
          style={styles.scrollmargin}
        >
          <LoadImages
            imageArray={this.props.personalDataReducer.imageArray}
            addAbilityToRemove={true}
          />

          {(this.props.personalDataReducer.imageArray.length < 5) && (
            <TouchableOpacity
              style={styles.pickImage}
              onPress={this._pickImage}
            >
              <Text
                style={[
                  styles.buttonone,
                  {
                    textAlignVertical: "center",
                    fontSize: 17,
                    marginTop: Platform.OS === "ios" ? 0 : 9
                  }
                ]}
              >
                Pick Image{" "}
              </Text>
            </TouchableOpacity>
          )}

          <Swiper style={styles.wrapper} autoplay={true}>
            <View style={styles.slide1}>
              <TouchableOpacity
                style={styles.swiperClick}
                onPress={this._payScreen}
              >
                <Text style={styles.swiperPriceText}>9999999$ a month</Text>
                <Text style={styles.swiperHeadText}>Some premium shit!</Text>
                <Text style={styles.swiperMainText}>Money dump!</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.slide2}>
              <TouchableOpacity
                style={styles.swiperClick}
                onPress={this._payScreen}
              >
                <Text style={styles.swiperPriceText}>9999999$ a month</Text>
                <Text style={styles.swiperHeadText}>Some premium shit!</Text>
                <Text style={styles.swiperMainText}>
                  Premium hypothetical space rocket
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.slide3}>
              <TouchableOpacity
                style={styles.swiperClick}
                onPress={this._payScreen}
              >
                <Text style={styles.swiperPriceText}>9999999$ a month</Text>
                <Text style={styles.swiperHeadText}>Some premium shit!</Text>
                <Text style={styles.swiperMainText}>Idk just pay me</Text>
              </TouchableOpacity>
            </View>
          </Swiper>

          <View style={styles.SettingsPart}>
            <Text style={styles.headerDefaultText}>
              {" "}
              Show users whose personality match my quiz result with:
            </Text>

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => this.changePersonalityMatchFilter(4)}
                style={[
                  styles.buttons,
                  this.props.personalDataReducer.personalityFilter !== 4
                    ? styles.deactiveView
                    : styles.activeView
                ]}
              >
                <Text
                  style={[
                    styles.buttonone,
                    this.props.personalDataReducer.personalityFilter !== 4
                      ? styles.deactiveText
                      : styles.activeText
                  ]}
                >
                  100%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.changePersonalityMatchFilter(3)}
                style={[
                  styles.buttons,
                  this.props.personalDataReducer.personalityFilter !== 3
                    ? styles.deactiveView
                    : styles.activeView
                ]}
              >
                <Text
                  style={[
                    styles.buttonone,
                    this.props.personalDataReducer.personalityFilter !== 3
                      ? styles.deactiveText
                      : styles.activeText
                  ]}
                >
                  75%
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => this.changePersonalityMatchFilter(2)}
                style={[
                  styles.buttons,
                  this.props.personalDataReducer.personalityFilter !== 2
                    ? styles.deactiveView
                    : styles.activeView
                ]}
              >
                <Text
                  style={[
                    styles.buttonone,
                    this.props.personalDataReducer.personalityFilter !== 2
                      ? styles.deactiveText
                      : styles.activeText
                  ]}
                >
                  50%
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.changePersonalityMatchFilter(1)}
                style={[
                  styles.buttons,
                  this.props.personalDataReducer.personalityFilter !== 1
                    ? styles.deactiveView
                    : styles.activeView
                ]}
              >
                <Text
                  style={[
                    styles.buttonone,
                    this.props.personalDataReducer.personalityFilter !== 1
                      ? styles.deactiveText
                      : styles.activeText
                  ]}
                >
                  Get every personality type!
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.SettingsPart}>
            <Text style={styles.headerDefaultText}>I am interested in:</Text>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() =>
                  this.changeValueOfButton(
                    this.props.personalDataReducer.interestedInMale,
                    interestedInMale
                  )
                }
                style={[
                  styles.buttons,
                  this.props.personalDataReducer.interestedInMale === false
                    ? styles.deactiveView
                    : styles.activeView
                ]}
              >
                <Text
                  style={[
                    styles.buttonone,
                    this.props.personalDataReducer.interestedInMale === false
                      ? styles.deactiveText
                      : styles.activeText
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.changeValueOfButton(
                    this.props.personalDataReducer.interestedInFemale,
                    interestedInFemale
                  )
                }
                style={[
                  styles.buttons,
                  this.props.personalDataReducer.interestedInFemale === false
                    ? styles.deactiveView
                    : styles.activeView
                ]}
              >
                <Text
                  style={[
                    styles.buttonone,
                    this.props.personalDataReducer.interestedInFemale === false
                      ? styles.deactiveText
                      : styles.activeText
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.changeValueOfButton(
                  this.props.personalDataReducer.interestedInOther,
                  interestedInOther
                )
              }
              style={[
                styles.buttons,
                this.props.personalDataReducer.interestedInOther === false
                  ? styles.deactiveView
                  : styles.activeView
              ]}
            >
              <Text
                style={[
                  styles.buttonone,
                  this.props.personalDataReducer.interestedInOther === false
                    ? styles.deactiveText
                    : styles.activeText
                ]}
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.SettingsPart}>
            <Text style={styles.headerDefaultText}> Show: </Text>
            {this.props.personalDataReducer.hasUserPayed ? (
              <TouchableOpacity
                onPress={() =>
                  this.changeValueOfButton(
                    this.props.personalDataReducer.filterOutFreeUsers,
                    filterOutFreeUsers
                  )
                }
                style={[
                  styles.buttons,
                  this.props.personalDataReducer.filterOutFreeUsers === false
                    ? styles.deactiveView
                    : styles.activeView
                ]}
              >
                <Text
                  style={[
                    styles.buttonone,
                    this.props.personalDataReducer.personalityFilter !== 2
                      ? styles.deactiveText
                      : styles.activeText
                  ]}
                >
                  Only premium users
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={this.premiumFunction}
                style={[
                  styles.buttons,
                  this.props.personalDataReducer.filterOutFreeUsers === false
                    ? styles.deactiveView
                    : styles.activeView
                ]}
              >
                <Text style={[styles.buttonone, styles.deactiveGreyText]}>
                  Only premium users
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.SettingsPart}>
            <Text style={styles.answeringIsOptional}>Optional</Text>

            <Text style={styles.aboutYou}>Text About You</Text>
            <TextInput
              placeholder={"Write someting about you!"}
              maxLength={10000}
              defaultValue={this.props.personalDataReducer.text}
              onChangeText={text => this.aboutMeFunction(text)}
              style={styles.inputTextStyle}
              multiline={true}
              numberOfLines={8}
            />
          </View>

          <View style={styles.SettingsPart}>
            <View style={styles.row}>
              <Text style={styles.headerRangeBar}>Age:</Text>
              {this.props.personalDataReducer.ageOfInterest[1] == 65 && (
                <Text style={styles.RangeBarText}>
                  {this.props.personalDataReducer.ageOfInterest[0]} -{" "}
                  {this.props.personalDataReducer.ageOfInterest[1]}+
                </Text>
              )}
              {this.props.personalDataReducer.ageOfInterest[1] < 65 && (
                <Text style={styles.RangeBarText}>
                  {this.props.personalDataReducer.ageOfInterest[0]} -{" "}
                  {this.props.personalDataReducer.ageOfInterest[1]}
                </Text>
              )}
            </View>
            <View style={styles.rangebar}>
              <MultiSlider
                style={styles.rangebar}
                values={[
                  this.props.personalDataReducer.ageOfInterest[0],
                  this.props.personalDataReducer.ageOfInterest[1]
                ]}
                onValuesChangeStart={this.disableScroll}
                onValuesChange={this.ageOfInterest}
                onValuesChangeFinish={this.enableScroll}
                touchDimensions={{ height: 60, width: 60 }}
                sliderLength={Platform.OS === "ios" ? 320 : 270}
                isMarkersSeparated={true}
                max={65}
                min={18}
              />
            </View>
          </View>

          <View style={[styles.SettingsPart, { marginBottom: 7 }]}>
            <View style={styles.row}>
              <Text style={styles.headerRangeBar}>Distance:</Text>
              {this.props.personalDataReducer.radius[0] < 205 ? (
                <Text style={styles.RangeBarText}>
                  {this.props.personalDataReducer.radius[0]}km
                </Text>
              ) : (
                <Text style={styles.RangeBarText}>Global</Text>
              )}
            </View>
            <View style={styles.rangebar}>
              {this.props.personalDataReducer.radius[0] < 205 ? (
                <MultiSlider
                  touchDimensions={{ height: 100, width: 100 }}
                  style={styles.rangebar}
                  values={[this.props.personalDataReducer.radius[0]]}
                  onValuesChangeStart={this.disableScrollrange}
                  onValuesChange={this.rangeSliderValuesChange}
                  onValuesChangeFinish={this.enableScrollrange}
                  sliderLength={Platform.OS === "ios" ? 320 : 270}
                  max={200}
                  min={1}
                />
              ) : (
                <MultiSlider
                  touchDimensions={{ height: 100, width: 100 }}
                  style={styles.rangebar}
                  values={[100]}
                  onValuesChangeStart={this.disableScrollrange}
                  onValuesChange={this.rangeSliderValuesChange}
                  enabledOne={false}
                  onValuesChangeFinish={this.enableScrollrange}
                  sliderLength={Platform.OS === "ios" ? 320 : 270}
                  max={200}
                  min={1}
                />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={this.pressGlobal}
                style={[
                  styles.buttons,
                  this.props.personalDataReducer.radius[0] < 205
                    ? styles.deactiveView
                    : styles.activeView
                ]}
              >
                <Text
                  style={[
                    styles.buttonone,
                    this.props.personalDataReducer.radius[0] < 205
                      ? styles.deactiveText
                      : styles.activeText
                  ]}
                >
                  Global
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.lastSettingsPart}>
            <Text style={styles.headerDefaultText}> Legal Information</Text>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={this._termsScreen}
                style={styles.buttons}
              >
                <Text style={styles.buttonone}>{"Terms & Conditions"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._gdprScreen}
                style={styles.buttons}
              >
                <Text style={styles.buttonone}>GDPR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => ({
  chatRoomReducer: state.chatRoomReducer,
  personalDataReducer: state.personalDataReducer,
  matchPersonalDataReducer: state.matchPersonalDataReducer,
  pushTokenReducer: state.pushTokenReducer
});
export default connect(mapStateToProps)(SettingsScreen);
//f08080
//should be called defaultTextStyle
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },

  rangebar: {
    marginLeft: 25,
    height: 80
  },
  RangeBarText: {
    textAlign: "right",
    textAlignVertical: "center",
    paddingTop: Platform.OS === "ios" ? 8 : 0,

    fontSize: 15,
    flex: 1
  },

  aboutYou: {
    flex: 1,
    paddingTop: 5,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 5
  },
  activeView: {
    backgroundColor: "red"
  },

  deactiveView: {
    backgroundColor: "white"
  },
  row: {
    flexDirection: "row"
  },
  buttonone: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15
  },
  buttons: {
    flex: 1,
    height: 50,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    margin: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  activeText: {
    color: "white"
  },
  deactiveText: {
    color: "black"
  },
  headerDefaultText: {
    flex: 1,
    paddingTop: 5,

    marginBottom: 15,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },

  pickImage: {
    height: Platform.OS === "ios" ? 35 : 45,
    alignContent: "center",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#d6d7da",
    paddingTop: Platform.OS === "ios" ? 7 : 0
  },

  matchImg: {
    marginTop: 17,
    marginLeft: Platform.OS === "ios" ? 100 : 77,
    height: 170,
    width: 170,
    borderRadius: 90
  },

  matchImgBesideScrollView: {
    marginTop: 17,
    height: 170,
    width: 170,
    marginLeft: -5,
    borderRadius: 100
  },

  marginTopSeventeen: {
    marginTop: 23
  },
  matchImgInScrollView: {
    height: 78,
    width: 78,
    borderRadius: 100
  },

  ScrollView: {
    height: 235
  },

  SettingsPart: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    marginLeft: 10,
    marginLeft: 10
  },
  lastSettingsPart: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    marginBottom: 10
  },
  headerRangeBar: {
    paddingTop: 5,
    flex: 1,
    textAlign: "left",
    fontSize: 15,
    fontWeight: "bold"
  },
  headerDefaultText: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },

  header: {
    marginBottom: 15,
    fontSize: 22
  },

  inputTextStyle: {
    height: 120,
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#f7f7f7"
  },

  wrapper: {
    height: 200,
    borderRadius: 8
  },
  slide1: {
    flex: 1,
    backgroundColor: "#ff4c4c",
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  slide2: {
    flex: 1,
    backgroundColor: "#e52d2d",

    borderRadius: 8,
    marginLeft: 10,
    marginTop: 10,

    marginRight: 10
  },
  slide3: {
    flex: 1,
    backgroundColor: "#ff3232",
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  swiperMainText: {
    fontSize: 20
  },
  swiperHeadText: {
    fontSize: 15,
  },
  swiperPriceText: {
    fontSize: 12,
  },
  swiperClick: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  deactiveGreyText: {
    color: "grey"
  },
  answeringIsOptional: {
    color: "grey",
    fontWeight: "200",
    fontSize: 13
  }
});
