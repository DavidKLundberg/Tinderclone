import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { personalityTypeMediumTexts } from "../../components/personalityTypeTexts";
import { connect } from "react-redux";
import {  language } from "../../components/Strings";
import Swiper from "react-native-swiper";

class TypeDescription extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { height: Platform.OS === "ios" ? 40 : 40 },

    headerTitle: "Personality Description",
  });

  renderCharacteristics() {
    const { navigation } = this.props;
    const typeId = navigation.getParam("typeId", "NO-ID");
    let characteristics = [];
    let itterator;
    if (typeId !== "NO-ID") {
      itterator = typeId;
    } else {
      itterator = this.props.personalDataReducer.userPersonalityType;
    }
    for (x in language[this.props.personalDataReducer.chosenLanguage].BigFive[itterator].SummaryList) {
      characteristics.push(
        <View style={styles.characteristics}>
         
            <Text key={x} style={styles.bulletPoints}>
              {
                language[this.props.personalDataReducer.chosenLanguage].BigFive[
                  itterator
                ].SummaryList[x].header
              }
            </Text>
            <Text>
              {" "}
              {
                language[this.props.personalDataReducer.chosenLanguage].BigFive[
                  itterator
                ].SummaryList[x].description
              }
            </Text>
          
        </View>
      );
    }
    return characteristics;
  }
  renderScores() {
    let arrayOfRenderableTraits = [];
    const { navigation } = this.props;
    const typeId = navigation.getParam("typeId", "NO-ID");
    let characteristics = [];
    let itterator;
    if (typeId !== "NO-ID") {
      itterator = typeId;
    } else {
      itterator = this.props.personalDataReducer.userPersonalityType;
    }
    for (let i = 0; i < 5; i++) {
      let value = "";
      switch (i) {
        case 0:
          value = "Very low in " + typeId;
          break;
        case 1:
          value = "Low in " + typeId;
          break;
        case 2:
          value = "Medium " + typeId;
          break;
        case 3:
          value = "High in " + typeId;
          break;
        case 4:
            value = "Very high in " + typeId;
            break;
      }
      arrayOfRenderableTraits.push(
        <TouchableOpacity key={i} style={styles.swiperClick}>
          <View style={styles.row}>
            <Text style={styles.swiperHeadText}>{value}</Text>
          </View>

          <Text style={styles.swiperMainText}>
            {
              language[this.props.personalDataReducer.chosenLanguage].BigFive[
                itterator
              ].SummaryPartOne
            }
          </Text>
        </TouchableOpacity>
      );
    }
    return arrayOfRenderableTraits;
  }

  render() {
    const { navigation } = this.props;
    const typeId = navigation.getParam("typeId", "NO-ID");
    console.log(language + 1);
    console.log(this.props.personalDataReducer.chosenLanguage + 2);

    console.log(
      language[this.props.personalDataReducer.chosenLanguage].BigFive[typeId] +
        3
    );

    console.log(
      language[this.props.personalDataReducer.chosenLanguage].BigFive[typeId]
        .SummaryPartOne + 4
    );

    return (
      <ScrollView style={styles.container}>
        <View style={styles.SettingsPart}>
          <View style={[styles.row]}>
            <Text style={[styles.header]}>{typeId}</Text>
          </View>
          <View style={[styles.row]}>
            <View style={styles.textHolder}>
              <Text style={styles.bulkText}>
                {
                  language[this.props.personalDataReducer.chosenLanguage]
                    .BigFive[typeId].SummaryPartOne
                }
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.SettingsPart}>
          <Text style={styles.semiHeader}>Characteristics:</Text>
          <View style={styles.bulletPointHolder}>
            {this.renderCharacteristics()}
          </View>

          <Text style={styles.valuesText}>
            {
              language[this.props.personalDataReducer.chosenLanguage].BigFive[
                typeId
              ].SummaryPartTwo
            }
          </Text>
        </View>
        <View style={styles.lastSettingsPart}>
          <Text style={[styles.semiHeader]}>Scores</Text>
          <Swiper style={styles.wrapper} autoplay={true}>
            {this.renderScores()}
          </Swiper>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  personalDataReducer: state.personalDataReducer,
});
export default connect(mapStateToProps)(TypeDescription);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f7f7f7",
  },
  bulletPointHolder: {
    paddingLeft: 25,

  //  flexDirection: "row",
//    flexWrap: "wrap",
  },
  semiHeader: {
    marginTop: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    textAlignVertical: "center",
    fontSize: 25,
  },

  row: {
    flexDirection: "row",
  },

  textHolder: {
    flex: 1,
  },

  header: {
    marginTop: 5,
    marginBottom: 10,
    flex: 5,
    fontSize: 33,
  },
  wrapper: {
    height: 200,
    borderRadius: 8,
  },
  bulkText: {
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "300",
    fontSize: 20,
  },
  bulletPoints: {
    textAlign: "left",

    marginBottom: 3,
    textAlignVertical: "center",
    fontWeight: "300",

    fontSize: 20,
  },
  bulletPointsMain: {
    textAlign: "left",

    fontWeight: "300",

    fontSize: 15,
  },
  userPersonality: {
    fontWeight: "300",
    color: "green",
    textAlign: "right",
    marginBottom: -15,
    fontSize: 20,
  },
  matchProcentage: {
    paddingTop: 13,
    fontWeight: "300",
    fontSize: 20,
  },
  valuesText: {
    textAlign: "left",
    textAlignVertical: "center",
    fontWeight: "300",

    fontSize: 20,
  },
  swiperMainText: {
    fontSize: 15
  },
  swiperHeadText: {
    fontSize: 20,
  },
  SettingsPart: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  characteristics: {

    marginBottom: 15,

  },
  lastSettingsPart: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    marginBottom: 30,
  },
});
