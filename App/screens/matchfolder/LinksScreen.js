import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  Picker,
  BackHandler,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { partnerIterator, storeHasChanged } from "../../components/Redux/actions/personalAction";
import  ViewProfile  from "../../components/ViewProfile.js";
import * as Icon from "@expo/vector-icons";

import { personalUrl, matchUrl} from "../../components/Urls.js";
import { matchUserArray } from "../../components/Redux/actions/matchAction";
import ReportModal from "../../components/ReportModal";

class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      quizIsAnswerd: 0,
      profilesShown: 0,
      profilePersonalityType: 0,
      profileName: 0,
      profileKidStatus: 0,
      profilePetStatus: 0,
      profileReligionStatus: 0,
      profilePersonalityImage: require("./temporalAssest/homer.png"),
      profileImage2: require("./temporalAssest/homer.png"),
      profileImage: require("./temporalAssest/homer.png"),
      profilePersonalityTypeDescriptionText: 0,
      profileAboutMe: 0,
      profileImage3: require("./temporalAssest/homer.png"),
      profileAge: 0,
      reportText: "",
      reportReason: "",
      modalVisible: false,
      modalToShowReportOption: true,
      rerenderWhenDataArrives: true
    };
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  
  componentWillUnmount() {
    this.backHandler.remove()
  }
  
  handleBackPress = () => {
    return false;
  }
  _viewReportMenu = () => {
    console.log("viewreportsmenu");
    return <Text></Text>;
  };
  _viewLikes = ()=>{
    this.props.navigation.navigate("LikesScreen")
  }
  _setModalVisible = () => {
    console.log("set visible");
    this.setState({ modalVisible: true });
  };
  setReportText(text) {
    this.setState({ reportText: text });
  }
  cancelReport() {
    this.setState({ modalVisible: false });
  }
  sendReport() {
    if (this.state.reportText != "" && reportText != "") {
      let report = this.state.reportReason + " - " + this.state.reportText;
    } else {
      Alert.alert("Please fill in both fields!");
    }
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerStyle: { height: Platform.OS === "ios" ? 30 : 30 },

      headerTitle: (
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1}}>
          <TouchableOpacity
            onPress={params.setModalVisible}
            style={{ marginTop: -10, flex: 1, marginLeft:30 }}
          >
            <Icon.Ionicons
                        onPress={params.viewLikes}
                        name={
                          Platform.OS === "ios"
                            ? "ios-heart-empty"
                            : "md-heart-empty"
                        }
                        size={27}
                        color={"black"}
                      />
          </TouchableOpacity></View>
          <View style={{ flex: 5}}></View>

          <Icon.Ionicons
                        onPress={params.setModalVisible}
                        name={
                          Platform.OS === "ios"
                            ? "ios-more"
                            : "md-more"
                        }
                        size={27}
                        color={"black"}
                        style={{ marginTop: -10, flex: 1 }}

                      />
  
        </View>
      )
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({ setModalVisible: this._setModalVisible, viewLikes: this._viewLikes });
    if (
      this.props.personalDataReducer.storeHasChanged == true ||
      this.props.matchPersonalDataReducer.matchUserArray == undefined
    ) {
      this.fetchMatches();

      if (this.props.personalDataReducer.storeHasChanged == true) {
        this.props.dispatch(storeHasChanged(false));
      }
    }
  }
  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "M") {
      dist = dist * 0.8684;
    }
    return dist;
  }
  fetchMatches() {
    if (this.props.personalDataReducer.id != -99) {
      fetch(
        personalUrl +
          "?minAgeOfInterest=" +
          this.props.personalDataReducer.ageOfInterest[0] +
          "&maxAgeOfInterest=" +
          this.props.personalDataReducer.ageOfInterest[1] +
          "&userId=" +
          this.props.personalDataReducer.id +
          "&age=" +
          this.props.personalDataReducer.age +
          "&personalityMatch=" +
          this.props.personalDataReducer.personalityFilter +
          "&filterHasPayed=" +
          this.props.personalDataReducer.filterOutFreeUsers +
          "&radius=" +
          this.props.personalDataReducer.radius +
          "&longitude=" +
          this.props.personalDataReducer.location.coordinates[1] +
          "&latitude=" +
          this.props.personalDataReducer.location.coordinates[0] +
          "&gender=" +
          this.props.personalDataReducer.gender +
          "&interestedInFemale=" +
          this.props.personalDataReducer.interestedInFemale +
          "&interestedInMale=" +
          this.props.personalDataReducer.interestedInMale +
          "&userPersonality=" +
          this.props.personalDataReducer.userPersonalityType +
          "&partnerPersonalityOne=" +
          this.props.personalDataReducer.partnerPersonalityTypeOne +
          "&interestedInOther" +
          this.props.personalDataReducer.interestedInOther +
          "/",
        {
          method: "GET",

          headers: {
            Accept: "application/json",

            "Content-Type": "application/json; charset=UTF-8",
            "WWW-Authenticate": this.props.personalDataReducer.owner
          }
        }
      )
        .then(response => response.json())
        .then(data => {
          let matchesArray = [];

          for (i = 0; i < data.length; i++) {
            let distance = this.distance(
              data[i].location.coordinates[0],
              data[i].location.coordinates[1],
              this.props.personalDataReducer.location.coordinates[0],
              this.props.personalDataReducer.location.coordinates[1],
              "M"
            );
            let imageArray = []
        for (I= 0; I < data[i].Images.length; I++) {
          imageArray.push(data[i].Images[I].image1)
        }
            let user = {
              name: data[i].name,
              imageArray: imageArray,
              aboutMe: data[i].aboutMe,
              userPersonalityType: data[i].userPersonalityType,
              actualDistance: distance,
              age: data[i].age,
              ownerMatch: data[i].id
            };

            matchesArray.push(user);
          }
          this.props.dispatch(matchUserArray(matchesArray));
        })
        .catch(error => console.log(error));
    }
  }

  renderProfileIfQuizIsAnswered = () => {
    if (this.props.personalDataReducer.userPersonalityType != "") {
      if (
        this.props.personalDataReducer.iterator >
          this.props.matchPersonalDataReducer.length ||
        this.props.matchPersonalDataReducer.matchUserArray == undefined
      ) {
        return (
          <View style={styles.weAreOutOfUsers}>
                      <Text styles={styles.weAreOutOfUsersText}>
                      Loading users</Text>
          </View>
         
        );
      } else {
        if (this.state.profilesShown >= 7) {
          this.setState.profilesShown = 0;
          return (
            <View>
              <Text>Ads</Text>
            </View>
          );
        } else {
          const { navigation } = this.props;
          let matchesSeen = this.props.personalDataReducer.partnerIterator;
          let lengthOfMatchesObjects = Object.keys(
            this.props.matchPersonalDataReducer
          ).length;
          if (matchesSeen < lengthOfMatchesObjects) {
            console.log(
              "PRofiles should load" +
                matchesSeen +
                "  " +
                lengthOfMatchesObjects
            );
          } else {
            console.log(
              "PROFILE shouldnt load" +
                matchesSeen +
                "  " +
                lengthOfMatchesObjects
            );
          }
          if (matchesSeen > lengthOfMatchesObjects) {
            console.log(
              "NO MORE MATCHES " + matchesSeen + "  " + lengthOfMatchesObjects
            );
          } else {
            console.log(
              "No more matches didnt load" +
                matchesSeen +
                "  " +
                lengthOfMatchesObjects
            );
          }
          console.log(
            "matchesSeen" +
              matchesSeen +
              "     lengthofmatchesobjects" +
              lengthOfMatchesObjects +
              "\n" +
              Object.keys(this.props.matchPersonalDataReducer)
          );

          return (
            <ScrollView
              style={styles.container}
              ref={c => {
                this.scroll = c;
              }}
            >
              <ReportModal visibility={this.state.modalVisible}
              cancelFunction={()=>this.cancelReport()}
              userName={this.props.name}/>

              {matchesSeen >= lengthOfMatchesObjects && (
                <View style={styles.weAreOutOfUsers}>
                  <Text style={styles.weAreOutOfUsersText}>
                    We are out of users
                  </Text>
                </View>
              )}
              {matchesSeen < lengthOfMatchesObjects && (
                <View>
                  <ViewProfile
                    navigation={navigation}
                    name={
                      this.props.matchPersonalDataReducer.matchUserArray[
                        this.props.personalDataReducer.partnerIterator
                      ].name
                    }
                    aboutMe={
                      this.props.matchPersonalDataReducer.matchUserArray[
                        this.props.personalDataReducer.partnerIterator
                      ].aboutMe
                    }
                    userPersonalityType={
                      this.props.matchPersonalDataReducer.matchUserArray[
                        this.props.personalDataReducer.partnerIterator
                      ].userPersonalityType
                    }
                    actualDistance={
                      this.props.matchPersonalDataReducer.matchUserArray[
                        this.props.personalDataReducer.partnerIterator
                      ].actualDistance
                    }
                    age={
                      this.props.matchPersonalDataReducer.matchUserArray[
                        this.props.personalDataReducer.partnerIterator
                      ].age
                    }
                    imageArray={this.props.matchPersonalDataReducer.matchUserArray[this.props.personalDataReducer.partnerIterator].imageArray}
                  />

                  <View style={[styles.lastSettingsPart, styles.bottomRow]}>
                    <TouchableOpacity>
                      <Icon.Ionicons
                        onPress={() => this.yesNoButtons(true)}
                        name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                        size={80}
                        color={"black"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Icon.Ionicons
                        onPress={() => this.yesNoButtons(true)}
                        name={
                          Platform.OS === "ios"
                            ? "ios-heart"
                            : "md-heart"
                        }
                        size={80}
                        color={"black"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </ScrollView>
          );
        }
      }
    } else {
      return (
        <View style={styles.flexOne}>
          <Image
            source={require("../../assets/images/homer.png")}
            style={styles.doTheQuizImage}
          />

          <Text style={styles.personalityInfoHeader}>
            Come back after you have done the quiz!
          </Text>
          <Text styles={styles.personalityInfoBody}>
            Head over to the Quiz tab and answer atleast 20 questions so we can
            get a better grip of who you are!
          </Text>
          <Text styles={styles.personalityInfoBody}>
            After that you are free to answer more questions for fun, and if you
            do our results will only get more accurate.
          </Text>

          <Text styles={styles.personalityInfoBody}>
            And remember to answer honestly for best result!
          </Text>
        </View>
      );
    }
  };

  yesNoButtons(opinion) {
    this.scroll.scrollTo({ x: 0, y: 0, animated: false });
    this.sendOpinionToServer(opinion);
    this.props.dispatch(
      partnerIterator((this.props.personalDataReducer.partnerIterator += 1))
    );
    console.log("partner itterator increased");

    if (
      this.props.matchPersonalDataReducer.length >=
      this.props.personalDataReducer.partnerIterator + 5
    ) {
      this.fetchMatches();
    }
  }

  sendOpinionToServer(opinion) {
    console.log(
      "this.props.personalDataReducer.id" +
        this.props.personalDataReducer.id +
        "   " +
        "this.props.matchPersonalDataReducer.matchUserArray[this.props.personalDataReducer.partnerIterator].ownerMatch" +
        this.props.matchPersonalDataReducer.matchUserArray[
          this.props.personalDataReducer.partnerIterator
        ].ownerMatch +
        "       this.props.personalDataReducer.partnerIterator" +
        this.props.personalDataReducer.partnerIterator
    );
    fetch(matchUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json; charset=UTF-8",
        "WWW-Authenticate": this.props.personalDataReducer.owner
      },
      body: JSON.stringify({
        owner: this.props.personalDataReducer.id,
        possiblePartners: this.props.matchPersonalDataReducer.matchUserArray[
          this.props.personalDataReducer.partnerIterator
        ].ownerMatch,
        ownerLikesPossiblePartner: opinion
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <this.renderProfileIfQuizIsAnswered />
      </View>
    );
   
  }
}

const mapStateToProps = state => ({
  personalDataReducer: state.personalDataReducer,
  matchPersonalDataReducer: state.matchPersonalDataReducer
});

export default connect(mapStateToProps)(LinksScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },

  profileImageView: {},

  flexOne: {
    flex: 1
  },
  marginBottomView: {
    marginBottom: Platform.OS === "ios" ? 45 : 6,
    marginTop: -5
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    paddingBottom: 15,
    paddingTop: 15
  },
  doTheQuizImage: {
    width: "100%",
    height: 400
  },
  //299 full length
  yesButton: {
    backgroundColor: "green",
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    margin: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 50,
    paddingRight: 50
  },

  noButton: {
    backgroundColor: "red",
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    margin: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  whiteBackground: {
    backgroundColor: "#fff",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 3,
    marginTop: -7
  },
  personalityTypeHolder: {
    marginBottom: -10,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  personalityTypeText: {
    fontSize: 20,
    fontWeight: "400"
  },
  personalityInfoBody: {
    fontWeight: "100",
    fontSize: 17
  },
  lastSettingsPart: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  personalityInfoHeader: {
    fontSize: 23,
    fontWeight: "400",
    marginBottom: 5
  },
  rowBesidePersonalityImage: {
    flexDirection: "row",
    flex: 1
  },

  personalityInfoName: {
    fontSize: 35,
    fontWeight: "300"
  },
  personalityInfoBubbles: {
    textAlign: "center",
    marginLeft: 5,
    marginRight: 5,
    fontSize: 18,

    flex: 1,
    textAlignVertical: "center"
  },
  personalityInfo: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginTop: 25,
    marginBottom: 25
  },
  personalityTypeImage: {
    height: 279,
    width: "100%",
    zIndex: 1
  },
  flexOnePaddingTopThriteen: {
    flex: 1,
    paddingTop: 8
  },
  row: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 8
  },
  weAreOutOfUsers: {
    alignContent: "center",
   
    paddingTop: "45%"
  },
  weAreOutOfUsersText: {
    fontSize: 35,
    fontWeight: "300",
    textAlign:"center"
  },

  scrollview: {
    flex: 1
  },
  twoMainContainers: {
    flex: 1
  },
  //330 is full length
  //227 full width

  personalityInfoText: {
    textAlign: "center",
    borderColor: "grey",

    margin: 5,

    borderWidth: 0.5,
    borderRadius: 15,
    fontSize: 15,
    flex: 1,
    textAlignVertical: "center"
  },
  name: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold"
  },
  personalityType: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    textAlignVertical: "center"
  },
  aboutMeText: {
    textAlign: "center",
    flex: 1,
    borderColor: "grey",
    borderWidth: 0.5,
    margin: 5,
    fontSize: 15,
    textAlignVertical: "center"
  },

  reportUserButton: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black",
    margin: 1,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    padding: 4,
    justifyContent: "flex-end",
    marginBottom: 6
  },
  reportUserText: {
    color: "black",
    fontWeight: "200",
    fontSize: 15
  },
  rowHeight: {
    flexDirection: "row",
    paddingTop: 8
  },
  reportName: { fontSize: 23, margin: 30, textAlign: "center" }
});
