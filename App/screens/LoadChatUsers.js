import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class LoadChatUsers extends React.Component {

constructor(){
    super();
    this.UserSorter = this.UserSorter.bind(this)
    this.UnUsedUserItem = this.UnUsedUserItem.bind(this)
    this.Item = this.Item.bind(this)
    
}


    render() {
        return(      <View style={styles.container}><this.UserSorter navigation={this.props.navigation}/>
        <TouchableOpacity   onPress={() => {
            this.props.navigation.navigate("Chat");
          }}><Text>asd</Text></TouchableOpacity>
        </View>  )
        }



UserSorter() { 
    let chatRoomReducer = this.props.chatRoomReducer
    console.log("usersorter")
    if(chatRoomReducer.chatUserArray[0] != undefined){

      console.log("first if ")

    let unUsedUser = [];
    let usedUser = [];
    console.log(JSON.stringify(chatRoomReducer))
    for(i=0;i < chatRoomReducer.chatUserArray.length; i++){
      console.log("forloop")

      if(chatRoomReducer.chatUserArray[i].messages[0] == undefined){
        console.log("second if ")

        unUsedUser.push(chatRoomReducer.chatUserArray[i])
      }else{
        usedUser.push(chatRoomReducer.chatUserArray[i])
        console.log(" second else")

      }
      console.log("end for loop")


    }
    console.log("before return")

    return(
        <View style={styles.container}>
          <View style={styles.scrollViewHorizontal}>
            <ScrollView horizontal={true}>{this.hasUnUsedUserLoaded(unUsedUser)}</ScrollView>
          </View>
          <View
            style={{
              borderColor: "#d6d7da",
              borderBottomWidth: 1
            }}
          />
          <ScrollView style={styles.scrollViewVertical}>
          {this.hasUsedUserLoaded(usedUser)}
                    </ScrollView>
        </View>
    )
  }else {
    return (<Text>People you match with, will show up here</Text>);

  }
  }
  hasUsedUserLoaded = usedUserArray => {
    console.log("hasUsedUserLoaded")
    if (usedUserArray[0]!= undefined) {
      console.log("if")
      console.log( 
        "CHAT ROOM RED     " + JSON.stringify(usedUserArray)
      );
      
      return (
        <FlatList
          data={usedUserArray}
          renderItem={({ item }) => (
            <this.Item
              index={item.index}
              name={item.name}
              image1={item.imageArray[0]}
              keyExtractor={item =>item.index}
              timestamp={item.messages[item.messages.length - 1].timestamp}
              message={item.messages[item.messages.length -1 ].message}
            />
          )}
        />
      );
    } else {
      console.log("else")
    }
  };

  hasUnUsedUserLoaded = (unUsedUserArray) => {
    console.log("hasUnUsedUserLoaded")

    if (unUsedUserArray[0]!= undefined) {
      console.log(
        "CHAT ROOM RED     " + JSON.stringify(unUsedUserArray)
      );
      
      return (
        <FlatList
          data={unUsedUserArray}
          renderItem={({ item }) => (
            <this.UnUsedUserItem
              index={item.index}
              name={item.name}
              image1={item.imageArray[0]}
              keyExtractor={item =>item.index}
            />
          )}
        />
      );
    }else{
      return(<Text></Text>)
    }
  };




UnUsedUserItem({ index, name, image1 }) {
    return (
      <TouchableOpacity
      key={index}
      style={styles.touchableHorizontalScroll}
      onPress={() => this.navigateToSpecificChat(index, name)}
    >
      <View style={styles.imgHolderUnusedPeople}>
      {image1 != null&&
        <Image
          style={styles.personalityTypeImg}
          source={{uri:image1}}
        ></Image>
      }
      </View>
      <Text style={styles.unusedPersonalityTypeText}>{name}</Text>
    </TouchableOpacity>
    );
  }
    Item({ index, name, image1, message,timestamp }) {
      console.log("\n\n\n\n item " + index)
      return (
        <TouchableOpacity
          key={index}
          style={styles.touchableVerticalScroll}
          onPress={() => {
            this.props.navigation.navigate("Chat", {
              chatPartnerID: index,
              name: name
            });
          }}
        >
          <View style={styles.row}>
            <View style={styles.imgHolder}>
              {image1 != null && (
                <Image
                  style={styles.personalityTypeImg}
                  source={{ uri: image1 }}
                ></Image>
              )}
              <View style={styles.row}>
                <Text style={styles.message}>
                  {message}
                </Text>
  
                <Text style={styles.time}>
                  {timestamp}
                </Text>
              </View>
            </View>
            <View style={styles.textHolder}>
              <Text style={styles.personalityTypeText}>{name}</Text>
            </View>
          </View>
          <View
            style={{
              borderColor: "#d6d7da",
              borderBottomWidth: 1,
              width: "80%",
              marginLeft: 15,
              marginTop: 5
            }}
          />
        </TouchableOpacity>
      );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingRight: 20,
      paddingTop: Platform.OS === "ios" ? 33 : 0,
      paddingLeft: 20,
      backgroundColor: "#fff"
    },
    scrollViewHorizontal: { height: 100 },
  
    personalityInfoBubbles: {
      fontSize: 18,
      textAlign: "right",
      textAlignVertical: "center"
    },
    textHolder: {
      width: "80%"
    },
    imgHolderUnusedPeople: {},
  
    imgHolder: {
      width: "20%"
    },
    row: {
      flexDirection: "row"
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
    time: {
      fontSize: 15,
      textAlign: "center",
      fontWeight: "300",
      marginLeft: 8,
      textAlignVertical: "center",
      color: "grey"
    },
    personalityTypeText: {
      fontSize: 20,
      textAlign: "left",
      fontWeight: "400",
      textAlignVertical: "center"
    },
  
    personalityTypeImg: {
      width: 60,
      height: 60
    },
    touchableHorizontalScroll: {
      flex: 1,
      alignContent: "center",
      justifyContent: "center",
      marginTop: 5,
      marginRight: 5
    }
  });
  