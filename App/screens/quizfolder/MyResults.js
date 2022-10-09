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
import { arrayOfTraits, language } from "../../components/Strings";
import Swiper from "react-native-swiper";

class MyResults extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: { height: Platform.OS === "ios" ? 40 : 40 },

    headerTitle: "Personality Description",
  });

  render() {
    return (
      <ScrollView style={styles.container}>
          <View style={styles.SettingsPart}>
            <Text style={[styles.header]}>My Results</Text>
       
         
             <View style={[styles.row]}>

            <View style={styles.slide2}>
              <TouchableOpacity
                style={styles.swiperClick}
                onPress={this._payScreen}
              >
                <Text style={styles.swiperPriceText}>9999999$ a month</Text>
                <Text style={styles.swiperHeadText}>Some premium shit!</Text>
                <Text style={styles.swiperMainText}>
                  Premium hypothetical space rocket
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.slide2}>
              <TouchableOpacity
                style={styles.swiperClick}
                onPress={this._payScreen}
              >
                <Text style={styles.swiperPriceText}>9999999$ a month</Text>
                <Text style={styles.swiperHeadText}>Some premium shit!</Text>
                <Text style={styles.swiperMainText}>
                  Premium hypothetical space rocket
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.row]}>

<View style={styles.slide2}>
  <TouchableOpacity
    style={styles.swiperClick}
    onPress={this._payScreen}
  >
    <Text style={styles.swiperPriceText}>9999999$ a month</Text>
    <Text style={styles.swiperHeadText}>Some premium shit!</Text>
    <Text style={styles.swiperMainText}>
      Premium hypothetical space rocket
    </Text>
  </TouchableOpacity>
</View>
<View style={styles.slide2}>
  <TouchableOpacity
    style={styles.swiperClick}
    onPress={this._payScreen}
  >
    <Text style={styles.swiperPriceText}>9999999$ a month</Text>
    <Text style={styles.swiperHeadText}>Some premium shit!</Text>
    <Text style={styles.swiperMainText}>
      Premium hypothetical space rocket
    </Text>
  </TouchableOpacity>
</View>
</View>

<View style={[styles.rowAlignCenter]}>

<View style={[styles.lastCharacteristic]}>
  <TouchableOpacity
    style={styles.swiperClick}
    onPress={this._payScreen}
  >
    <Text style={styles.swiperPriceText}>9999999$ a month</Text>
    <Text style={styles.swiperHeadText}>Some premium shit!</Text>
    <Text style={styles.swiperMainText}>
      Premium hypothetical space rocket
    </Text>
  </TouchableOpacity>
</View>

</View>
</View>
<View style={styles.lastSettingsPart}>
            <Text style={[styles.header]}>Result for my partner</Text>
       
         
             <View style={[styles.row]}>

            <View style={styles.slide2}>
              <TouchableOpacity
                style={styles.swiperClick}
                onPress={this._payScreen}
              >
                <Text style={styles.swiperPriceText}>9999999$ a month</Text>
                <Text style={styles.swiperHeadText}>Some premium shit!</Text>
                <Text style={styles.swiperMainText}>
                  Premium hypothetical space rocket
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.slide2}>
              <TouchableOpacity
                style={styles.swiperClick}
                onPress={this._payScreen}
              >
                <Text style={styles.swiperPriceText}>9999999$ a month</Text>
                <Text style={styles.swiperHeadText}>Some premium shit!</Text>
                <Text style={styles.swiperMainText}>
                  Premium hypothetical space rocket
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.row]}>

<View style={styles.slide2}>
  <TouchableOpacity
    style={styles.swiperClick}
    onPress={this._payScreen}
  >
    <Text style={styles.swiperPriceText}>9999999$ a month</Text>
    <Text style={styles.swiperHeadText}>Some premium shit!</Text>
    <Text style={styles.swiperMainText}>
      Premium hypothetical space rocket
    </Text>
  </TouchableOpacity>
</View>
<View style={styles.slide2}>
  <TouchableOpacity
    style={styles.swiperClick}
    onPress={this._payScreen}
  >
    <Text style={styles.swiperPriceText}>9999999$ a month</Text>
    <Text style={styles.swiperHeadText}>Some premium shit!</Text>
    <Text style={styles.swiperMainText}>
      Premium hypothetical space rocket
    </Text>
  </TouchableOpacity>
</View>
</View>

<View style={[styles.rowAlignCenter]}>

<View style={[styles.lastCharacteristic]}>
  <TouchableOpacity
    style={styles.swiperClick}
    onPress={this._payScreen}
  >
    <Text style={styles.swiperPriceText}>9999999$ a month</Text>
    <Text style={styles.swiperHeadText}>Some premium shit!</Text>
    <Text style={styles.swiperMainText}>
      Premium hypothetical space rocket
    </Text>
  </TouchableOpacity>
</View>

</View>
</View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  personalDataReducer: state.personalDataReducer,
});
export default connect(mapStateToProps)(MyResults);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f7f7f7",
  },
  slide2: {
    flex: 1,
    backgroundColor: "#ff4c4c",
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding:5,
  }, 
 
  lastCharacteristic:{flex:0.45
    ,
    backgroundColor: "#ff4c4c",
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    
    padding:5,
},
rowAlignCenter:{alignSelf:"center",
flexDirection:"row"},
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
    textAlign:"center"
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
