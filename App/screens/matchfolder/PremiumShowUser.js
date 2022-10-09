import React from "react";
import {
  Text,
  StyleSheet,
  
  ScrollView,
  Platform,
  View,
  TextInput,
  Alert,
  Picker,
  Modal,
  TouchableOpacity
} from "react-native"; 
import { ViewProfile } from "../../components/ViewProfile";
import { connect } from "react-redux";
import { reportsUrl } from "../../components/Urls";
import * as Icon from "@expo/vector-icons";
import ReportModal from "../../components/ReportModal";
import { removeFromLikes } from "../../components/Redux/actions/likesUserAction";

 class PremiumShowUser extends React.Component {
constructor(){
  super();
  this.state = {
    modalVisible: false,

  };
}
 

cancelReport() {
  this.setState({ modalVisible: false });
}
static navigationOptions = ({ navigation }) => {
  return {
    headerStyle: {height:35},

    headerTitle: (
      <View style={{flexDirection:"row", marginRight:-40}}>
<View style={{flex:10}}></View>
          <Icon.Ionicons
                        onPress={params.setModalVisible}
                        name={
                          Platform.OS === "ios"
                            ? "ios-more"
                            : "md-more"
                        }
                        size={27}
                        color={"black"}
                        style={{ flex:1}}

                      />

</View>
    )
  };
};


_viewProfile = () => {
  const { navigation } = this.props;
  
  const chatPartnerID = navigation.getParam("chatPartnerID", "Something went wrong");
  const name = navigation.getParam("name", "Something went wrong");

  this.props.navigation.navigate("ChatProfile", {
    chatPartnerID: chatPartnerID,
    name:name
  })
  this.setState({room:chatPartnerID})

};
componentWillMount() {
  this.props.navigation.setParams({ setModalVisible: this._setModalVisible });
}

yesNoButtons(opinion, index) {
    this.scroll.scrollTo({ x: 0, y: 0, animated: false });
    this.sendOpinionToServer(opinion);
    this.props.dispatch(removeFromLikes(index))
    this.props.navigation.navigate("LikesScreen")
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
    const { navigation } = this.props;
    const userId = navigation.getParam("userId", "Something went wrong");
    if(this.props.likesUserReducer[userId] != undefined){
            return (
      <View style={styles.container}>
         <ReportModal visibility={this.state.modalVisible}
              cancelFunction={()=>this.cancelReport()}
              userName={this.props.name}/>
  
      <ScrollView >
      
       
        <ViewProfile
        navigation={navigation}
                name={this.props.likesUserReducer[userId].name}
                imageArray={this.props.likesUserReducer[userId].imageArray}

        
                aboutMe={this.props.likesUserReducer[userId].aboutMe}
                userPersonalityType={this.props.likesUserReducer[userId].userPersonalityType}
                actualDistance={this.props.likesUserReducer[userId].actualDistance}
                age={this.props.likesUserReducer[userId].age}
                />
        
      </ScrollView>
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
    );}
    else{
        return (
            <View style={styles.container}>
          <Text style={styles.centerAlign}>
        Oops something went wrong!
        </Text>
            </View>
          );
    }
  }
}
const mapStateToProps = state => ({
  likesUserReducer: state.likesUserReducer
});
export default connect(mapStateToProps)(PremiumShowUser)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingBottom:5,
  },


  flexOne: {
    flex: 1
  },
  marginBottomView: {
    marginBottom: 45,
    marginTop: -5
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    paddingBottom: 15,
    paddingTop: 15
  },centerAlign:{
    alignSelf:"center",
    textAlign:"center",
    fontSize:23,
    fontWeight:"300",
    paddingTop:250
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
  personalityInfoHeader: {
    fontSize: 23,
    fontWeight: "400",
    marginBottom: 5
  },  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 50,
    paddingRight: 50
  },  lastSettingsPart: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
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
    paddingBottom: 5,
    paddingTop: 5,
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
  row: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 13
  },

  headerText: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center"
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
  }, rowHeight: {
    flexDirection: "row",
    paddingTop: 8,
    
  },
  reportName:{fontSize:23,
    margin:30,
  textAlign:"center"}
});
