import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class DisplayTraits extends React.Component {
  constructor() {
    super();
    this.state = {
      viewTextAboutPersonality: "",
      viewMoreOrLess: "View more",
    };
  }

  showAllAboutPersonality() {
    this.props.navigation.navigate("TypeDescription", {
      typeId: this.props.userPersonalityType,
    });
  }
  showTraitText = () => {
    if (this.state.viewMoreOrLess == "View more") {
      this.setState({ viewMoreOrLess: "View less" });
    } else {
      this.setState({ viewMoreOrLess: "View more" });
    }
  };
  render() {
    //language[this.props.personalDataReducer.chosenLanguage].BigFive.arrayOfTraits[i]
    return (
      <TouchableOpacity
        style={styles.personalityInfo}
        onPress={this.showTraitText}
      >
        <View style={[styles.row, styles.alignApart]}>
          <Text style={styles.personalityInfoHeader}>{this.props.trait}</Text>
          <Text style={styles.personalityInfoHeader}>{this.props.score}</Text>
        </View>
        {this.state.viewMoreOrLess == "View less" && (
          <View>
            <View
              style={{
                marginBottom: 3,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
              }}
            />

            <Text style={styles.personalityInfoBody}>{this.props.text}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => ({
  personalDataReducer: state.personalDataReducer,
});
const styles = StyleSheet.create({
  contentHolder: { marginTop: 0, padding: 0, paddingBottom: 5 },

  personalityInfoBody: {
    fontWeight: "100",
    fontSize: 17,
  },
  personalityInfoHeader: {
    fontSize: 23,
    fontWeight: "400",
    marginBottom: 5,
  },

  personalityInfoName: {
    fontSize: 35,
    fontWeight: "300",
  },
  personalityInfoBubbles: {
    textAlign: "center",
    marginLeft: 5,
    marginRight: 5,
    fontSize: 18,

    flex: 1,
    textAlignVertical: "center",
  },
  alignApart: {
    justifyContent: "space-between",
  },
  personalityInfo: {
    marginTop: 10,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  personalityTypeImage: {
    height: 279,
    width: "100%",
    zIndex: 1,
  },
  flexOnePaddingTopThriteen: {
    flex: 1,
    paddingTop: 8,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 8,
  },
  name: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
