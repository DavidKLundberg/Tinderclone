import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import {
  questions,
  totalAmountOfQuestions
} from "../components/personalityQuestions";
import {
  partnerPersonalityTypeOne,
  storeHasChanged,
  userPersonalityType
} from "../components/Redux/actions/personalAction";

class QuizVersionTwo extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      //index in the question array (ex extraversionPartner)
      //index in questionSetConst
      numberOfAnswered: 0,
      questionIterator: 0,
      questionSetIterator: 0,
      hasViewedFirstStatement: false,
      extraversionMe: 0,
      conscientiousMe: 0,
      agreeableMe: 0,
      opennessMe: 0,
      extraversionPartner: 0,
      conscientiousPartner: 0,
      agreeablePartner: 0,
      opennessPartner: 0,
      spamControl: false
    };
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    return false;
  };
  quizButton(buttonValue, buttonReverseValue) {
    //If all questions are answered analyse answers

    if (this.state.numberOfAnswered == totalAmountOfQuestions) {
      if (this.state.spamControl != true) {
        this.calculateQuizScore(
          this.state.extraversionMe,
          this.state.opennessMe,
          this.state.agreeableMe,
          this.state.conscientiousMe,

          true
        );
        this.calculateQuizScore(
          this.state.extraversionPartner,
          this.state.opennessPartner,
          this.state.agreeablePartner,
          this.state.conscientiousnessPartner,

          false
        );

        this.setState({ spamControl: true });
        if (this.props.personalDataReducer.storeHasChanged != true) {
          this.props.dispatch(storeHasChanged(true));
        }

        this.props.navigation.navigate("mainStack");
      }
      return;
    }
    switch (this.state.questionSetIterator) {
      case 0:
        this.setState({
          opennessPartner: this.state.opennessPartner + buttonReverseValue
        });
        break;
      case 1:
        this.setState({
          extraversionPartner:
            this.state.extraversionPartner + buttonReverseValue
        });
        break;
      case 2:
        this.setState({
          conscientiousMe: this.state.conscientiousMe + buttonValue
        });
        break;
      case 3:
        this.setState({ agreeableMe: this.state.agreeableMe + buttonValue });
        break;
      case 4:
        this.setState({
          extraversionMe: this.state.extraversionMe + buttonReverseValue
        });
        break;
      case 5:
        this.setState({
          opennessPartner: this.state.opennessPartner + buttonValue
        });
        break;
      case 6:
        this.setState({
          agreeablePartner: this.state.agreeablePartner + buttonValue
        });
        break;
      case 7:
        this.setState({
          extraversionMe: this.state.extraversionMe + buttonValue
        });
        break;
      case 8:
        this.setState({ opennessMe: this.state.opennessMe + buttonValue });
        break;
      case 9:
        this.setState({
          conscientiousMe: this.state.conscientiousMe + buttonReverseValue
        });
        break;
      case 10:
        this.setState({
          conscientiousPartner: this.state.conscientiousPartner + buttonValue
        });
        break;

      case 11:
        this.setState({
          agreeableMe: this.state.agreeableMe + buttonReverseValue
        });
        break;
      case 12:
        this.setState({
          opennessMe: this.state.opennessMe + buttonReverseValue
        });
        break;
      case 13:
        this.setState({
          extraversionPartner: this.state.extraversionPartner + buttonValue
        });
        break;
      case 14:
        this.setState({
          agreeablePartner: this.state.agreeablePartner + buttonReverseValue
        });
        break;
      case 15:
        this.setState({
          conscientiousPartner:
            this.state.conscientiousPartner + buttonReverseValue
        });
        break;
    }
    //Itterate questions
    if (this.state.questionSetIterator >= 15) {
      this.setState({
        numberOfAnswered: this.state.numberOfAnswered + 1,
        questionSetIterator: 0,
        questionIterator: this.state.questionIterator + 1
      });
    } else {
      this.setState({
        numberOfAnswered: this.state.numberOfAnswered + 1,
        questionSetIterator: this.state.questionSetIterator + 1
      });
    }
  }

  calculateQuizScore(
    extraversionVariable,
    opennessVariable,
    agreeableVariable,
    consicentiousVariable,

    scoreBelongsToUserNotPartner
  ) {
    let personalityTypeForEitherPartnerOrMe = "";
    if (extraversionVariable / (this.state.numberOfAnswered / 16) > 2.5) {
      personalityTypeForEitherPartnerOrMe += "E";
    } else {
      personalityTypeForEitherPartnerOrMe += "I";


    }

    if (opennessVariable / (this.state.numberOfAnswered / 16) > 2.5) {
      personalityTypeForEitherPartnerOrMe += "N";
    } else {
      personalityTypeForEitherPartnerOrMe += "S";
    }

    if (agreeableVariable / (this.state.numberOfAnswered / 16) > 2.5) {
      personalityTypeForEitherPartnerOrMe += "F";
    } else {
      personalityTypeForEitherPartnerOrMe += "T";
    }

    if (consicentiousVariable / (this.state.numberOfAnswered / 16) > 2.5) {
      personalityTypeForEitherPartnerOrMe += "J";
    } else {
      personalityTypeForEitherPartnerOrMe += "P";
    }
    //send users score to store
    if (scoreBelongsToUserNotPartner == true) {
      this.props.dispatch(
        userPersonalityType(personalityTypeForEitherPartnerOrMe)
      );
      console.log("User = " + personalityTypeForEitherPartnerOrMe)
    } else {
      //send partners score to store
      this.props.dispatch(
        partnerPersonalityTypeOne(personalityTypeForEitherPartnerOrMe)
        
      );
      console.log("partner = " + personalityTypeForEitherPartnerOrMe)

    }
  }

  render() {
    return (
      <View style={styles.container} >
        {this.state.hasViewedFirstStatement == false && (
          <View style={{ flex: 1, paddingBottom: 20 }}>
            <Text style={styles.firstStatement}>
              To be able to give you the best matches, please answer a few
              questions!
            </Text>
     

            <TouchableOpacity
              style={[styles.quizButtons]}
              onPress={() => this.setState({ hasViewedFirstStatement: true })}
            >
                <Text style={styles.quizButtonText}> Let's go!</Text>
            </TouchableOpacity>

          </View>
        )}
        {this.state.hasViewedFirstStatement == true && (
          <View style={{ flex: 1 }}>
            <Text style={styles.numberOfAnswered}>
              {this.state.numberOfAnswered}/{totalAmountOfQuestions}
            </Text>

            <Text style={styles.question}>
              {
                questions[this.state.questionSetIterator][
                  this.state.questionIterator
                ]
              }
            </Text>

  
     
              <TouchableOpacity
                style={styles.quizButtons}
                onPress={() => this.quizButton(1, 5)}
              >
                <Text style={styles.quizButtonText}> Strongly Agree</Text>
              </TouchableOpacity>
      
              <TouchableOpacity
                style={styles.quizButtons}
                onPress={() => this.quizButton(2, 4)}
              >
                <Text style={styles.quizButtonText}> Agree </Text>
              </TouchableOpacity>
              
       
            <TouchableOpacity
                style={styles.quizButtons}
                onPress={() => this.quizButton(3, 3)}
              >
                <Text style={styles.quizButtonText}>Neutral </Text>
              </TouchableOpacity>
   
              <TouchableOpacity
                style={styles.quizButtons}
                onPress={() => this.quizButton(4, 2)}
              >
                <Text style={styles.quizButtonText}>Disagree </Text>
              </TouchableOpacity>
   
              <TouchableOpacity
                style={styles.quizButtons}
                onPress={() => this.quizButton(5, 1)}
              >
                <Text style={styles.quizButtonText}>Strongly Disagree</Text>
              </TouchableOpacity>
            
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  personalDataReducer: state.personalDataReducer
});

export default connect(mapStateToProps)(QuizVersionTwo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 3,
    paddingTop: Platform.OS === "ios" ? 33 : 0
  },
  firstStatement: {
    textAlign: "center",
    paddingTop: Platform.OS === "ios" ? 175 : 0,
    textAlignVertical: "center",
    flex: 5,
    fontSize: 30
  },
  question: {
    textAlign: "center",
    paddingTop: Platform.OS === "ios" ? 175 : 0,
    textAlignVertical: "center",
    flex: 4,
    fontSize: 40
  },
  LinearGradient:{
   flex: 1,
    borderRadius: 4,
   
    margin: 1,
 
    backgroundColor: "#fff"

  
  },
  /*
  quizButtons: {
    flex: 1,
    backgroundColor: "#fff"
,
    justifyContent: "center",
    borderRadius: 4,
  },*/
  
    quizButtons: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    margin: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4c4c"
  },
  quizRow: {
    flex: 2,
    flexDirection: "row"
  },
  numberOfAnswered: {
    textAlign: "right",
    paddingTop: 10
  },
  quizButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 30
  }
});
