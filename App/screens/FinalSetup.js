import React from "react";
import {
  Image,
  Platform,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from "react-redux";
import { isFemale } from "../components/Redux/actions/personalAction";

 class FinalSetup extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
 
            date: new Date('2020-06-12T14:42:42'),
            mode: 'date',
            show: false,
          }
        }
          setDate = (event, date) => {
            date = date || this.state.date;
        
            this.setState({
              show: Platform.OS === 'ios' ? true : false,
              date,
            });
          }
        
  show =() => {
    this.setState({
      show: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.SettingsPart}>
          <Text style={styles.headerDefaultText}>I am:</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() =>
                this.changeValueOfButton(
                  this.props.personalDataReducer.isFemale,
                  isFemale
                )
              }
              style={[
                styles.buttons,
                this.props.personalDataReducer.isFemale === false
                  ? styles.deactiveView
                  : styles.activeView
              ]}
            >
              <Text
                style={[
                  styles.buttonone,
                  this.props.personalDataReducer.isFemale === false
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
                  this.props.personalDataReducer.isFemale,
                  isFemale
                )
              }
              style={[
                styles.buttons,
                this.props.personalDataReducer.isFemale === true
                  ? styles.deactiveView
                  : styles.activeView
              ]}
            >
              <Text
                style={[
                  styles.buttonone,
                  this.props.personalDataReducer.isFemale === true
                    ? styles.deactiveText
                    : styles.activeText
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
            </View>

        </View>
            <View style={styles.SettingsPart}>
          <Button onPress={this.show} title="Select your birthday!" />
  
   
          { this.state.show && <DateTimePicker value={new Date()}
    format="MM-DD-YYYY"
                    display="default"
                    onChange={this.setDate} />
            }
     </View>

     </View>
    );
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
  _mainStack = () => {
    this.props.navigation.navigate("mainStack");
  };
}


const mapStateToProps = state => ({
    personalDataReducer: state.personalDataReducer
  });
export default connect(mapStateToProps)(FinalSetup)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
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
    fontSize: 24,
    fontWeight: "bold"
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

  headerDefaultText: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },

 answeringIsOptional: {
    color: "grey",
    fontWeight: "200",
    fontSize: 13
  }
});
