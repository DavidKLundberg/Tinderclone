import {
  personalityTypeMediumTexts,
  personalityTypeImages
} from "./personalityTypeTexts";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import LoadImages from "./LoadImages";
import { language } from "./Strings";
import { connect } from "react-redux";
import DisplayTraits from "./DisplayTraits";

 class ViewProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      viewTextAboutPersonality: "",
      viewMoreOrLess: "View more"
    };
  }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const chatPartnerID = navigation.getParam(
      "chatPartnerID",
      "Something went wrong"
    );
    const name = navigation.getParam("name", "Something went wrong");
    return {
      headerTitle: (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === "ios" ? "ios-options" : "md-options"}
        />
      )
    };
  };
  showAllAboutPersonality() {
    this.props.navigation.navigate("TypeDescription", {
      typeId: this.props.userPersonalityType
    });
  }
showTraits(){
  let traitArray = []

  for(let i = 0; i < 5; i++){
  
  traitArray.push(

    <DisplayTraits text={this.props.text} 
    trait={this.props.trait}
     score={this.props.score}/>

  )}
  return traitArray;
  
}
  viewMoreAboutPersonality() {
    if (
      this.state.viewTextAboutPersonality ==
      personalityTypeMediumTexts[this.props.userPersonalityType].intro
    ) {
      // if "View less" is changed the "Show all" button will never appear
      this.setState({
        viewTextAboutPersonality:
          personalityTypeMediumTexts[this.props.userPersonalityType].extended,
        viewMoreOrLess: "View less"
      });
    } else {
      this.setState({
        viewTextAboutPersonality:
          personalityTypeMediumTexts[this.props.userPersonalityType].intro,
        viewMoreOrLess: "View more"
      });
    }
  }
  componentDidMount() {
    this.setState({
      viewTextAboutPersonality:
        personalityTypeMediumTexts[this.props.userPersonalityType].intro
    });
  }
  render() {
    
    return (
      <View style={styles.contentHolder}>
        <LoadImages
          imageArray={this.props.imageArray}
          addAbilityToRemove={false}
        />

        <View style={styles.personalityInfo}>
          <Text style={styles.personalityInfoName}>{this.props.name}</Text>
          <View
            style={{
              marginTop: 3,
              marginBottom: 3,
              borderBottomColor: "grey",
              borderBottomWidth: 1
            }}
          />
          <View style={styles.row}>
            <Text style={styles.personalityInfoBubbles}>
              {this.props.actualDistance} km away
            </Text>

            <Text style={styles.personalityInfoBubbles}>
              {this.props.age} years old
            </Text>
          </View>
        </View>

        <View style={styles.personalityInfo}>
          <Text style={styles.personalityInfoHeader}>
            About {this.props.name}:
          </Text>
          <View
            style={{
              marginBottom: 3,
              borderBottomColor: "grey",
              borderBottomWidth: 1
            }}
          />
          <Text style={styles.personalityInfoBody}>{this.props.aboutMe}</Text>
        </View>

          {this.showTraits()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  personalDataReducer: state.personalDataReducer,
});
export default connect(mapStateToProps)(ViewProfile)
const styles = StyleSheet.create({
  contentHolder: { marginTop: 0, padding: 0, paddingBottom: 5 },
  flexOne: {
    flex: 1
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
  alignApart:{
    justifyContent:"space-between"
  },
  personalityInfo: {
    marginTop: 10,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12
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
  name: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold"
  }
});
