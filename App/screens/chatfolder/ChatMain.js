import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  BackHandler,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { Notifications } from "expo";

import { roomUrl } from "../../components/Urls";
import {
  chatUser,
} from "../../components/Redux/actions/chatRoomAction";
import { chatMessageArray } from "../../components/Redux/actions/chatMessageAction";
import { registerForPushNotificationsAsync } from "../../components/registerPermissions";
class ChatMain extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    
    super();
    this.state = {
      unUsedUser: [],
      usedUser: [],
readyForRenderUnUsedChatters:undefined,
readyForRenderUsedChatters:undefined,
  notification: {},
    
};
  }

  _handleNotification = notification => {
    // do whatever you want to do with the notification
    this.setState({ notification: notification });
  };

  navigateToSpecificChat = (chatPartnerID, name) => {
    console.log("navigateto spec")
    this.props.navigation.navigate("Chat", {
      chatPartnerID: chatPartnerID,
      name: name,
    });
  }  
  componentWillUnmount() {
    this.backHandler.remove()
  }
  
  handleBackPress = () => {
    return false;
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    //registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    /*this._notificationSubscription = Notifications.addListener(this._handleNotification);
    if (Object.keys(this.props.chatRoomReducer)< 1) {
      console.log("compdid if");

      this.getOpenChats();
    }*/
  }
  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "M") {
      dist = dist * 0.8684;
    }
    return dist;
  }
  getOpenChats() {
    fetch(roomUrl + "?sender=" + this.props.personalDataReducer.id, {
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json; charset=UTF-8",
        "WWW-Authenticate": this.props.personalDataReducer.owner
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("DATA   "+ JSON.stringify(data))
        for (i = 0; i < data.length; i++) {
       
          let messagesArray = []
          for(I=0; I<data[i].Message.length;I++){
            
            messagesArray.push(data[i].Message[I])
          }
          let messageArrObj = {
            index:data[i].id,
            messages:messagesArray
          }
          if(messagesArray[0] != undefined){
          this.props.dispatch(chatMessageArray(messageArrObj))
          }else{

          }
          if (this.props.personalDataReducer.id == data[i].userOne) {
            let dist = this.distance(
              data[i].userTwoPersonal.location.coordinates[0],
              data[i].userTwoPersonal.location.coordinates[1],
              this.props.personalDataReducer.location.coordinates[0],
              this.props.personalDataReducer.location.coordinates[1],
              "M"
            );
            let imageArray = [];
            for (
              I = 0;
              I < data[i].userTwoPersonal.Images.length && I < 6;
              I++
            ) {
              imageArray.push(data[i].userTwoPersonal.Images[I].image1);
            }
              let user = {
                index:data[i].id,
                user:{
                  id:data[i].userTwoPersonal.id,
                  name: data[i].userTwoPersonal.name,
                  imageArray: imageArray,
                  aboutMe: data[i].userTwoPersonal.aboutMe,
                  userPersonalityType:
                  data[i].userTwoPersonal.userPersonalityType,
                  actualDistance: dist,
                  age: data[i].userTwoPersonal.age,
                  ownerMatch: data[i].userTwoPersonal.id,
                  index: data[i].id,
                }
              };

              console.log("before dispatch first if ");
              this.props.dispatch(chatUser(user));
              console.log("    " +JSON.stringify(this.props.chatRoomReducer));
            
          } else if (this.props.personalDataReducer == data[i].userTwo) {
            console.log("first for loop second if");

            let dist = this.distance(
              data[i].userOnePersonal.location.coordinates[0],
              data[i].userOnePersonal.location.coordinates[1],
              this.props.personalDataReducer.location.coordinates[0],
              this.props.personalDataReducer.location.coordinates[1],
              "M"
            );
            let imageArray = [];
            for (
              I = 0;
              I < data[i].userOnePersonal.Images.length && I < 6;
              I++
            ) {
              console.log("second for loop");
              imageArray.push(data[i].userOnePersonal.Images[I].image1);
            }
              let user = {
                index:data[i].id,
                user:{
                  id:data[i].userOnePersonal.id,
                  name: data[i].userOnePersonal.name,
                  imageArray: imageArray,
                  aboutMe: data[i].userOnePersonal.aboutMe,
                  userPersonalityType:
                  data[i].userOnePersonal.userPersonalityType,
                  actualDistance: dist,
                  age: data[i].userOnePersonal.age,
                  ownerMatch: data[i].userOnePersonal.id,
                  index: data[i].id,
                }
              };
              console.log("before dispatch second if");
              this.props.dispatch(chatUser(user));
              console.log(
                "    " +
                  JSON.stringify(this.props.chatRoomReducer.chatUserArray)
              );
            
          }

          console.log(
            "CHAT ROOM RED     " + JSON.stringify(this.props.chatRoomReducer)
          );
          console.log(
            "CHAT MSG RED     " + JSON.stringify(this.props.chatMessageReducer)
          );



        }
      });
  }


  render() {
    console.log("asdasdasdasdasdasdasdasdasdsa")
    console.log(JSON.stringify(this.props.chatMessageReducer[6]))

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Messages</Text>
      <this.renderUsers/>
      </View>
    );
  }
  calculateDateOfMessage(timeSent){
    let now = Date.now()
    timeSent = parseInt(timeSent)
    let differanceBetweenNowAndTimeSent = now - timeSent
    let day = differanceBetweenNowAndTimeSent/86400000
    timeSent=new Date(timeSent)
    if(day>1 && day<365){
      let date = timeSent.getDate()
      let month = timeSent.getMonth()
      return <Text style={styles.timestamp}>{date}/{month}</Text>
    }else if (day>365){
      let date = timeSent.getDate()
      let month = timeSent.getMonth()
      let year = timeSent.getFullYear()
      return <Text style={styles.timestamp}>{date}/{month}/{year}</Text>
    }else{
      let hours = timeSent.getHours();
      let minutes = timeSent.getMinutes();
      if(hours<10){
        hours="0" + hours
      }
      if(minutes< 10){
        minutes="0" + minutes
      }
      return <Text style={styles.timestamp}>{hours}:{minutes}</Text>
  
    }
  }
  renderUsers = () => {
    if(  Object.keys(this.props.chatRoomReducer).length>0){
      let usedChatters = []
      let unUsedChatters = []
      for (let [key, value] of Object.entries(this.props.chatRoomReducer)) {

        if(this.props.chatMessageReducer.hasOwnProperty(key)){
          usedChatters.push(this.props.chatRoomReducer[key])

        }else{
          unUsedChatters.push(this.props.chatRoomReducer[key])

        }

      } 
      let readyForRenderUsedChatters = this.renderUsedUsers(usedChatters)
      let readyForRenderUnUsedChatters = this.renderUnUsedUsers(unUsedChatters)
      console.log("unused 0 "   + JSON.stringify(readyForRenderUnUsedChatters) +readyForRenderUnUsedChatters )
      return (
        <View>
           {(readyForRenderUnUsedChatters[0] != undefined)&&( 
        <View style={styles.scrollViewHorizontal}>
        <ScrollView horizontal={true}>
          {readyForRenderUnUsedChatters}

          </ScrollView>
        </View>)}
        <View
          style={{
            borderColor: "#d6d7da",
            borderBottomWidth: 1
          }}
        />
        
        <ScrollView style={styles.scrollViewVertical}>
           {(readyForRenderUsedChatters!= undefined)?(readyForRenderUsedChatters):(<Text>as</Text>)}

        </ScrollView>
        </View>
      )}else{
        return <View><Text>aspo</Text></View>
      }
    }
  
  renderUsedUsers(array) {
  
    let chatters = array.map((person, index) => (
      
      <TouchableOpacity
      key={index}
      style={styles.touchableVerticalScroll}
      onPress={()=> this.navigateToSpecificChat(person.index, person.name)}

    >
 
 <View style={styles.row}>
    <View style={styles.imgHolder}>

 {(person.imageArray[0]!=undefined) &&
      <Image
        style={[styles.personalityTypeImg, {marginLeft:12}]}
        source={{uri:person.imageArray[0]}}>
      </Image>}
      </View>
    <View style={styles.textHolder}>
      <Text style={styles.personalityTypeText}>{person.name}</Text>
      <View style={styles.row}>
      <Text style={styles.message}>{this.props.chatMessageReducer[person.index][this.props.chatMessageReducer[person.index].length-1].message.substring(0, 20)}{(this.props.chatMessageReducer[person.index][this.props.chatMessageReducer[person.index].length-1].message.length >20)&&("...")}</Text>

        <Text style={styles.time}>{this.calculateDateOfMessage(this.props.chatMessageReducer[person.index][this.props.chatMessageReducer[person.index].length-1].timestamp)}</Text>
        </View>
      </View>

      </View>
      <View
  style={{
    borderColor: "#d6d7da",
    borderBottomWidth: 1,
    width:"100%",
    marginLeft:15 ,
    marginTop:5,
  }}
/>  
    </TouchableOpacity>
    ));

    return chatters;
  }

  renderUnUsedUsers(array){
    let chatters = array.map((person, index) => (
      <TouchableOpacity
      key={index}
      style={styles.touchableHorizontalScroll}
      onPress={()=> this.navigateToSpecificChat(person.index, person.name)}
    >
    {console.log( "RENDERUNUSEDUSERS" +JSON.stringify(person) + "  " + JSON.stringify(index))}
    <View style={styles.imgHolderUnusedPeople}>
    {(person.imageArray[0]!=undefined) &&
      <Image
        style={styles.personalityTypeImg}
        source={{uri:person.imageArray[0]}}>
      </Image>}
      </View>
      <Text style={styles.unusedPersonalityTypeText}>{person.name}</Text>

    </TouchableOpacity>
    ));

    return chatters;
  }
  
}
const mapStateToProps = state => ({
  chatRoomReducer: state.chatRoomReducer,
  personalDataReducer: state.personalDataReducer,
  chatMessageReducer: state.chatMessageReducer
});

export default connect(mapStateToProps)(ChatMain);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 15,
    paddingTop: Platform.OS === "ios" ? 33 : 0,
    paddingLeft: 15,
    backgroundColor: "#fff"
  },
  scrollViewHorizontal: { height: 100 },

  personalityInfoBubbles: {
    fontSize: 18,
    textAlign: "right",
    textAlignVertical: "center"
  },
  textHolder: {
    width: "76%"
  },

  imgHolder: {
    width: "20%"
  },
  row: {
    flexDirection: "row",
    justifyContent:"space-between",
  },
  unusedPersonalityTypeText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "300",
    height: 20,
    textAlignVertical: "center",
    width: 55
  },
  touchableVerticalScroll: {
    marginTop: 16
  },
  bottomRow: {
    flexDirection: "row",
    paddingBottom: 15
  },
  flexOne: {
    flex: 1
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "300",
    textAlignVertical: "center"
  },
  header:{
    fontSize:25,
    paddingTop:15,
    paddingBottom:10, 
    textAlign:"center",

    fontWeight:"300",
    borderBottomWidth:0.3,
    borderColor:"black",
    
  },
  time: {
    fontSize: 15,
    fontWeight: "300",
    marginLeft: 8,
    textAlignVertical: "center",
    color: "grey",
  },
  personalityTypeText: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "400",
    textAlignVertical: "center"
  },

  personalityTypeImg: {
    width: 54,
    height: 54,
    borderRadius:27
  },
  touchableHorizontalScroll: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginTop: 5,
    marginRight: 5
  }
});
