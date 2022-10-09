import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { legalUrl } from "../components/Urls";
import {connect} from "react-redux"
class PrivacyScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state ={
        firstPrivacyCheck:false,
        secondPrivacyCheck:false,
        thirdPrivacyCheck:false,
        activateNextButton:false
    }

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
pressFirstPrivacyCheck=()=>{
    if(this.state.firstPrivacyCheck==false){
        this.setState({firstPrivacyCheck:true})
        if(this.state.secondPrivacyCheck== true && this.state.thirdPrivacyCheck==true){
            this.setState({activateNextButton:true})
            
        }
    }else{
        this.setState({firstPrivacyCheck:false})
        this.setState({activateNextButton:false})
    }
}
pressSecondPrivacyCheck=()=>{
    if(this.state.secondPrivacyCheck==false){
        this.setState({secondPrivacyCheck:true})
        if(this.state.firstPrivacyCheck== true && this.state.thirdPrivacyCheck==true){
            this.setState({activateNextButton:true})
        }
    }else{
        this.setState({secondPrivacyCheck:false})
        this.setState({activateNextButton:false})
    }
}
pressThirdPrivacyCheck =()=>{
    if(this.state.thirdPrivacyCheck==false){
        this.setState({thirdPrivacyCheck:true})
        if(this.state.secondPrivacyCheck== true && this.state.firstPrivacyCheck==true){
            this.setState({activateNextButton:true})
        }
    }else{
        this.setState({thirdPrivacyCheck:false})
        this.setState({activateNextButton:false})
    }
}
yesButton() {
    if(this.state.firstPrivacyCheck == true && this.state.secondPrivacyCheck == true && this.state.thirdPrivacyCheck == true){
      this.sendAgreedLegal()
        this.props.navigation.navigate("quizVersionTwo");
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.marginTop20}><Text style={styles.header}>Privacy Policy </Text></View>
  
        <View style={styles.marginTop20}><Text style={styles.bulkText}>aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd </Text></View>
        <View style={[styles.row, styles.marginTop5]}>
        <Text style={[styles.marginTop10,styles.bulkText]}>apåksfpåkpapkåfaåpk!</Text>
        <TouchableOpacity
                onPress={this.pressFirstPrivacyCheck}
                style={[
                  styles.privacyCheckButton,
                  this.state.firstPrivacyCheck === false
                    ? styles.deactiveView
                    : styles.activeView
                ]}
                >
              <Text style={styles.bulkText}>I agree</Text></TouchableOpacity>
        </View>
        <View  style={styles.marginTop20}><Text style={styles.bulkText}>aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd </Text></View>
        <View style={[styles.row, styles.marginTop5]}>
        <Text style={[styles.marginTop10,styles.bulkText]}>apåksfpåkpapkåfaåpk!</Text>
        <TouchableOpacity
                onPress={this.pressSecondPrivacyCheck}
                style={[
                  styles.privacyCheckButton,
                  this.state.secondPrivacyCheck === false
                    ? styles.deactiveView
                    : styles.activeView
                ]}
                >
                <Text style={styles.bulkText}>I agree</Text></TouchableOpacity>
        </View>
        <View style={styles.marginTop20}><Text style={styles.bulkText}>aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd aspdjaofaspkaopaegpoaepo jpowj powdj aowj pojdpoajdw pojaw dpojawdp ojawd </Text></View>
        <View style={[styles.row, styles.marginTop20]}>
        <Text style={[styles.marginTop10,styles.bulkText]}>apåksfpåkpapkåfaåpk!</Text>
        <TouchableOpacity
                onPress={this.pressThirdPrivacyCheck}
                style={[
                  styles.privacyCheckButton,
                  this.state.thirdPrivacyCheck === false
                    ? styles.deactiveView
                    : styles.activeView
                ]}
              >
              <Text style={styles.bulkText}>I agree</Text></TouchableOpacity>
        </View>

        <View style={styles.marginTop20}>
        <Text styles={styles.bulkText}> Press here to read more about our </Text>
     <TouchableOpacity style={{color:"blue"}} onPress={this._termsScreen}><Text styles={styles.bulkText}>terms and conditions</Text></TouchableOpacity> 
          <Text styles={styles.bulkText}> and here to for our </Text>
          <TouchableOpacity style={{color:"blue"}} onPress={this._gdprScreen}><Text styles={styles.bulkText}>GDPR policy</Text></TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity   style={[
                  styles.nextButton,
                  this.state.activateNextButton === false
                    ? styles.deactivateNextButton
                    : styles.activateNextButton
                ]} onPress={() => this.yesButton()}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
      </View>
    );
  } 
  sendAgreedLegal() {
    fetch(legalUrl.id, {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json; charset=UTF-8",
        "WWW-Authenticate": this.props.personalDataReducer.owner
      },
      body: JSON.stringify({
        owner:
        this.props.personalDataReducer.id
      })
    })
  }
  _termsScreen = () => {
    this.props.navigation.navigate("Terms");
  };  
  _gdprScreen = () => {
    this.props.navigation.navigate("Gdpr");
  };
}
const mapStateToProps = state => ({
  personalDataReducer:state.personalDataReducer 
})
export default connect(mapStateToProps)(PrivacyScreen)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 83 : 50,
    padding: 20,
    backgroundColor: "#fff"
  },
  bulkText:{
    fontWeight: "100",
    fontSize: 17,
  },

  header:{
    textAlign: "center",
    textAlignVertical: "center",
    flex: 3,
    fontSize: 40
  },
  deactivateNextButton:{
    backgroundColor: "grey",
  },
  activateNextButton:{
    backgroundColor: "green",
  },
  nextButton: {
    marginTop:60,
    height:60,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    margin: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  marginTop10:{
    marginTop:10,
},
buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    paddingBottom: 15,
    paddingTop: 15
  },
marginTop20:{
    marginTop:20,
},
  row: {
    flex:1,
    flexDirection: "row",
    justifyContent:"space-around"

  },
  privacyCheckButton:{
        
        height: 40,
        width:70,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: "#d6d7da",
        margin: 3,
        alignItems: "center",
        justifyContent: "center"

  },
  activeView: {
    backgroundColor: "green"
  },
  deactiveView: {
    backgroundColor: "white"
  },

});
