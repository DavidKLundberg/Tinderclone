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
  Modal
} from "react-native";
import { connect } from "react-redux";

class ReportModal extends React.Component {

  constructor() {
    super();
    this.state = {
      reportText: "",
      reportReason: "",
      modalToShowReportOption: true,
    };
  }

  _viewReportMenu = () => {
    console.log("viewreportsmenu");
    return <Text></Text>;
  };
 
  setReportText(text) {
    this.setState({ reportText: text });
  }
 
  sendReport() {
    if (this.state.reportText != "" && reportText != "") {
      let report = this.state.reportReason + " - " + this.state.reportText;
    } else {
      Alert.alert("Please fill in both fields!");
    }
  }
  render(){
      return(
    <Modal
    animationType="slide"
    transparent={false}
    visible={this.props.visibility}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
    style={styles.container}
  >
    <View style={styles.container}>
    <View style={styles.SettingsPart}>
      <Text style={styles.reportName}>
        Report of {this.props.name}
      </Text>
      </View>
      <View style={styles.SettingsPart}>
      <Text style={styles.headerTwo}>Select what the option that suits best:</Text>
      <Picker
        selectedValue={this.state.reportReason}
        style={{ height: 200, width: "100%" }}
        onValueChange={itemValue =>
          this.setState({ reportReason: itemValue })
        }
      >
        <Picker.Item label="Rude language" value="rudeLanguage" />
        <Picker.Item
          label="Sexual harassment "
          value="sexualHarassment"
        />
        <Picker.Item
          label="Abusive behavior "
          value="abusiveBehavior"
        />
        <Picker.Item
          label="Something else"
          value="someOtherReportableBehavior"
        />
      </Picker>
      </View>
      <View style={styles.SettingsPart}>
      <Text style={styles.headerTwo}>Tell us more:</Text>
      <TextInput
        placeholder={
          "Describe what happened to make you report " +
          this.props.userName
        }
        maxLength={1000}
        defaultValue={""}
        onChangeText={text => this.setReportText(text)}
        style={styles.inputTextStyle}
        multiline={true}
        numberOfLines={8}
      />
      </View>
      <View style={{flex:0.75}}></View>
      <View style={styles.qRow}>
        <TouchableOpacity
          style={styles.qButtons}
          onPress={() => this.props.cancelFunction()}
        >
          <Text style={styles.qButtonText}>Cancel report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.qButtons}
          onPress={() => this.sendReport()}
        >
          <Text style={styles.qButtonText}>Send report</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>)

  }
}
export default connect()(ReportModal)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
        padding:3,
        paddingTop: Platform.OS === "ios" ? 33:0
    
      },

      SettingsPart: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 5,
        marginTop: 13,
        marginLeft: 10,
        marginLeft: 10
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
    inputTextStyle:{  height: 120,
        borderRadius: 6,
        padding: 8,
        backgroundColor: "#f7f7f7"},
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
      paddingTop: "40%"
    },
    weAreOutOfUsersText: {
      fontSize: 35,
      fontWeight: "300"
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
    reportName: { fontSize: 30, margin: 30, textAlign: "center", fontWeight:"400" },
   headerTwo:{fontSize: 21, margin: 10, textAlign: "left", fontWeight:"300" },
    qButtons: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#d6d7da",
        margin: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
      },
      qRow: {
        height: 125,
      
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row"
      },
      qButtonText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 30
      },
   
  });
  