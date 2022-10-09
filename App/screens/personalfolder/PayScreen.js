import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import TabBarIcon from '../../components/TabBarIcon';
import * as Icon from "@expo/vector-icons";

export default class QuizScreen extends React.Component {
  static navigationOptions = {
    title: 'Premium',
  };


  /*static navigationOptions = ({ navigation }) => {

    
  
    return {
      headerTitle: (
        <Text
          style={{backgroundColor:"#fff", alignItems:"center", color:"red"}}
          title={"Premium"}
          color="#000"
        />
      )
    };
  };*/
    render() {
      return(
      <ScrollView style={styles.container}>
        <View style={styles.salesImageHolder}>
        <Image 
        style={styles.salesImage}
        source={require('../../assets/images/Tman.jpeg')}
        />
        <TouchableOpacity style={styles.initiatePaymentButton} onPress={this._initiatePayment}>
            <Text style={styles.salesArgumentHeader}>GET PREMIUM</Text>
        </TouchableOpacity>
        </View>
        
        <View style={styles.SettingsPart}>
       <View style={[styles.row, styles.marginTop]}>
       <View style={styles.iconStyle}>
       <Icon.Ionicons
          name={Platform.OS === "ios" ? `ios-checkmark-circle-outline`
          : `md-help-circle`}
          size={27}/>
</View>
          <Text style={styles.salesArgument}> Find people that are closer to what you are looking for! </Text>

       </View>
       <View style={[styles.row, styles.marginTop]}>
       <View style={styles.iconStyle}>
       <Icon.Ionicons
      name={Platform.OS === "ios" ? `ios-checkmark-circle-outline`
          : `md-help-circle`}
          size={27}

    />
</View>
          <Text style={styles.salesArgument}>View only premium users, for a more serious dating pool!</Text>

       </View>
       <View style={[styles.row, styles.marginTop]}>
       <View style={styles.iconStyle}>
       <Icon.Ionicons
      name={Platform.OS === "ios" ? `ios-checkmark-circle-outline`
          : `md-help-circle`}
          size={27}

    />
</View>

          <Text style={styles.salesArgument}>Be one of the first person people view!</Text>

       </View>
       </View>

         

        <View style={[styles.termsAndConditionsView, styles.row]}>

<Text style={styles.termsAndConditionsText}>Read more about terms and conditions </Text>
<TouchableOpacity style={styles.termsAndConditionsButton} onPress={this._termsAndConditionsButton}>
    <Text style={[styles.termsAndConditionsText, {color:"blue"}]}>here</Text>
</TouchableOpacity>
</View>

       </ScrollView>
      )
    }
  
  _payScreen = () => {
    ;
}

_termsAndConditionsButton = () => {
  this.props.navigation.navigate("Terms")
    ;
}
}


  const styles = StyleSheet.create({
    container: {
        flex: 1,
   

        backgroundColor: "#f7f7f7",
      },
      iconStyle:{flex:1, marginLeft:10, paddingTop:5,},
      marginTop:{marginTop:15,},
    SettingsPart: {
      margin: 10,
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 12,
      marginTop: 25
    },
    salesArgumentTextViewHolder:{
        padding:12,
        marginTop:3,
        marginBottom:25,
      },
      salesArgumentImage:{
        height:279,
        width:'100%',
      },
      salesArgumentBody:{
        fontWeight:'100',
        fontSize:17,
    },

    salesArgumentImageHolder:{

    },
    salesArgument:{
        fontSize:18,
        textAlign:"left",
        flex:6,
        fontWeight:'300',  
        marginBottom:10,
      },
      salesArgumentHeader:{
        fontSize:25,
        fontWeight:'400',  
        marginBottom:5,
      },
      initiatePaymentButton:{
        marginTop:-250,
        width:'50%',
        marginLeft:100,
        borderRadius:3,
        padding:10,
        backgroundColor:'#ff4c4c',
        alignItems:'center'
      },
      initiatePaymentButtonText:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
      },
      salesImage:{
        height:400,
        width:'100%',
      },
      salesImageHolder:{
          height:400,

      },
      termsAndConditionsView:{
          paddingLeft:12,
          paddingTop:4,
          paddingBottom:4,
      },
      row:{
        flexDirection:'row'
      },
      termsAndConditionsText:{
        textAlign:"center"
      },
      termsAndConditionsButton:{
          alignItems:'flex-end'
      },
  });