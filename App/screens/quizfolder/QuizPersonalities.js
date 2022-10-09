import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import {
  personalityTypeMediumTexts,
  personalityTypesList,
} from "../../components/personalityTypeTexts";
import { arrayOfTraits, language } from "../../components/Strings";

class QuizPersonalities extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { height: Platform.OS === "ios" ? 40 : 40 },
    headerTitle: "QuizPersonalities",
  });
  /*
  //Gets a procentage of how close it is to the score
  // the user got for partner and Sorts it 
  personalityMatchProcentage(){
    let list = []
    const partnerPersonality =this.props.personalDataReducer.partnerPersonalityTypeOne;
    let procentage = 0
  
    
    for(i = 0; i < personalityTypesList.length; i++){
        if(partnerPersonality[0] == personalityTypesList[i][0]){
          procentage +=25; 
        }if(partnerPersonality[1] == personalityTypesList[i][1]){
          procentage +=25;  
        }if(partnerPersonality[2] == personalityTypesList[i][2]){
          procentage +=25; 
        }if(partnerPersonality[3] == personalityTypesList[i][3]){
          procentage +=25; 
        }
        list.push([procentage,personalityTypesList[i]])
        procentage = 0;
    }
    list.sort(function(a, b){return a[0] - b[0]});
    list.reverse()
    return list;
  }
  _renderPersonalityTypes() {
    list = this.personalityMatchProcentage()
    personalityList = []
    userPersonality = ""
    console.log(this.props.personalDataReducer.partnerPersonalityTypeOne + this.props.personalDataReducer.userPersonalityType)
    for(i = 0; i < list.length; i++){
      let color = ""
      let personalityType = list[i][1]
      let matchProcentage = list[i][0]
      switch(matchProcentage){
        case 100:
        color = "green"
        break;
        case 75:
        color = "#f0ca00"
        break;
        case 50:
        color = "#f08400"
        break;
        case 25:
        color = "red"
        break;
        case 0:
        color = "grey"
        break;
        default:
        color = "grey"
        break;
      }
      personalityList.push(<TouchableOpacity
            key={i}
            style={styles.SettingsPart}
            onPress={() => {
              this.props.navigation.navigate("TypeDescription", {
                typeId: personalityType
              });
            }}
          >
          {(this.props.personalDataReducer.userPersonalityType == personalityType)&& (              
  <Text style={[styles.answeringIsOptional, {color:"green"}]}> Your personality</Text>
)}
                      <View style={styles.row}>


              <Text style={styles.headerDefaultText}>{personalityTypeMediumTexts[personalityType].name}</Text>
              <Text style={[styles.answeringIsOptional, {color:color}]}> {matchProcentage}%</Text>

              </View>
              
                <Text style={styles.buttonone}>
                  {personalityTypeMediumTexts[personalityType].intro}
                </Text>
          </TouchableOpacity>)
    }
/*
      ( index,currentElement) => {
        
        return (
          <TouchableOpacity
            key={index}
            style={styles.SettingsPart}
            onPress={() => {
              this.props.navigation.navigate("TypeDescription", {
                typeId: currentElement
              });
            }}
          >
                      <View style={styles.row}>


              <Text style={styles.headerDefaultText}>{personalityTypeMediumTexts[currentElement].name}</Text>
              <Text style={styles.answeringIsOptional}> %</Text>

              </View>
                <Text style={styles.buttonone}>
                  {personalityTypeMediumTexts[currentElement].intro}
                </Text>
          </TouchableOpacity>
        );
      }
    ); 
    */
  /*
    return <View>{personalityList}</View>;
    
  }
  

  render() {
    this.personalityMatchProcentage()
    return (
      <ScrollView style={styles.container}>
        {this._renderPersonalityTypes()}
      </ScrollView>
    );
  }
}
*/
  renderTraits() {
    
    let arrayOfRenderableTraits = [];
    
    for (let i = 0; i < 5; i++) {
      let trait = language[this.props.personalDataReducer.chosenLanguage].BigFive.arrayOfTraits[i]

      arrayOfRenderableTraits.push(
      <TouchableOpacity
        key={i}
        style={styles.SettingsPart}
        onPress={() => {
          this.props.navigation.navigate("TypeDescription", {
            typeId: trait,
          });
        }}
      >
        <View style={styles.row}>
          <Text style={styles.headerDefaultText}>
            {trait}
          </Text>
         
        </View>

        <Text style={styles.buttonone}>
          {language[this.props.personalDataReducer.chosenLanguage].BigFive[trait].SummaryPartOne}
        </Text>
      </TouchableOpacity>
      );
    }
    return arrayOfRenderableTraits;
  }
  render() {
    console.log(this.props.personalDataReducer.language +5)
    return (
      <ScrollView style={styles.container}>{this.renderTraits()}</ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  personalDataReducer: state.personalDataReducer,
});
export default connect(mapStateToProps)(QuizPersonalities);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: "#f7f7f7",
  },
  box: {
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },

  personalityInfoBubbles: {
    fontSize: 18,
    textAlign: "left",
    textAlignVertical: "center",
  },
  textHolder: {
    flex: 3,
    marginLeft: 20,
  },
  imgHolder: {
    paddingLeft: 20,
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  bottomRow: {
    flexDirection: "row",
    paddingBottom: 15,
  },
  flexOne: {
    flex: 1,
  },
  personalityTypeText: {
    marginBottom: 5,
    fontSize: 26,
    textAlign: "center",
    fontWeight: "400",
    textAlignVertical: "center",
    marginTop: 20,
  },
  personalityTypeImg: {
    width: 65,
    height: 200,
  },

  buttonone: {
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 15,
  },
  answeringIsOptional: {
    fontWeight: "200",
    fontSize: 13,
    paddingRight: 10,
    textAlign: "right",
    textAlignVertical: "center",
    paddingTop: Platform.OS === "ios" ? 8 : 0,
  },
  SettingsPart: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  headerDefaultText: {
    flex: 1,

    paddingBottom: 3,
    textAlign: "center",
    fontSize: 23,
    fontWeight: "400",
  },
});
