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
import ViewProfile  from "../../components/ViewProfile";
import { connect } from "react-redux";
import { reportsUrl } from "../../components/Urls";
import * as Icon from "@expo/vector-icons";
import ReportModal from "../../components/ReportModal";

 class ChatProfile extends React.Component {
constructor(){
  super();
  this.state = {
    modalVisible: false,
    reportText: "",
    reportReason: ""
  };
}
 

_setModalVisible =() => {
  console.log("visible called")
  this.setState({ modalVisible: true });
}
setReportText(text) {
  this.setState({ reportText: text });
}
cancelReport() {
  this.setState({ modalVisible: false });
}
sendReport() {
  if (this.state.reportText != "" && reportText != "") {
    fetch(reportsUrl,{
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json; charset=UTF-8",
        "WWW-Authenticate": this.props.personalDataReducer.owner
      },
      body:JSON.stringify({
        owner:this.props.personalDataReducer.id,
        reportedReason:this.state.reportReason,
        reportedUser:reportText,     
      })
      
    })
  } else {
    Alert.alert("Please fill in both fields!");
  }
}
static navigationOptions = ({ navigation }) => {
  const params = navigation.state.params || {};
  const chatPartnerID = navigation.getParam("chatPartnerID", "Something went wrong");
  const name = navigation.getParam("name", "Something went wrong");

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
  render() {
    const { navigation } = this.props;
    const chatPartnerID = navigation.getParam("chatPartnerID", "Something went wrong");
    
    return (
      <View style={styles.container}>
         <ReportModal visibility={this.state.modalVisible}
              cancelFunction={()=>this.cancelReport()}
              userName={this.props.name}/>
  
      <ScrollView >
      
       
        <ViewProfile
        navigation={navigation}
                name={this.props.chatRoomReducer[chatPartnerID].name}
                imageArray={this.props.chatRoomReducer[chatPartnerID].imageArray}

        
                aboutMe={this.props.chatRoomReducer[chatPartnerID].aboutMe}
                userPersonalityType={this.props.chatRoomReducer[chatPartnerID].userPersonalityType}
                actualDistance={this.props.chatRoomReducer[chatPartnerID].actualDistance}
                age={this.props.chatRoomReducer[chatPartnerID].age}
                />
        
      </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  chatRoomReducer: state.chatRoomReducer
});
export default connect(mapStateToProps)(ChatProfile)
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
