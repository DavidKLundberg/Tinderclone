import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from "react-redux";
import { matchUrl } from '../../components/Urls';


 class LikesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerStyle: { height: 35 },

      headerTitle: (
        <Text style={{ fontSize: 23,fontWeight:"400",textAlign:"center" }}>Likes</Text>
      )};
  };


  navigateToSpecificChat = (userId) => {
    this.props.navigation.navigate("PremiumShowUser", {
      userId: userId,

    });
  }  
    componentWillMount(){
        if(this.props.personalDataReducer.hasUserPayed == true){
            fetch(matchUrl      +"?userId=" +
            this.props.personalDataReducer.id + "&hasUserPayed=" + this.props.personalDataReducer.hasUserPayed,{
                method: "GET",

                        headers: {
                          Accept: "application/json",
              
                          "Content-Type": "application/json; charset=UTF-8",
                          "WWW-Authenticate": this.props.personalDataReducer.owner
                        }
                      }
                    )
                      .then(response => response.json())
                      .then(data => {
                        let alreadyLikesMatchesArray = [];
              
                        for (i = 0; i < data.length; i++) {
                          let distance = this.distance(
                            data[i].location.coordinates[0],
                            data[i].location.coordinates[1],
                            this.props.personalDataReducer.location.coordinates[0],
                            this.props.personalDataReducer.location.coordinates[1],
                            "M"
                          );
                          let imageArray = []
                      for (I= 0; I < data[i].Images.length; I++) {
                        imageArray.push(data[i].Images[I].image1)
                      }
                          let user = {
                            name: data[i].name,
                            imageArray: imageArray,
                            aboutMe: data[i].aboutMe,
                            userPersonalityType: data[i].userPersonalityType,
                            actualDistance: distance,
                            age: data[i].age,
                            ownerMatch: data[i].id
                          };
              
                          alreadyLikesMatchesArray.push(user);
                        }
                        this.props.dispatch(likesUserArray(alreadyLikesMatchesArray));
                      })
                      .catch(error => console.log(error));
                  }
                }
                renderUsers = () => {
                  if(  Object.keys(this.props.likesUserReducer).length>0){
                    console.log(JSON.stringify(this.props.likesUserReducer))
                    let usedChatters = []
                    for (let [key, value] of Object.entries(this.props.likesUserReducer)) {
              
                        usedChatters.push(this.props.likesUserReducer[key])
              
              
                    }
                    let readyForRenderUsedChatters = this.renderUsedUsers(usedChatters)
              
                    return (
                      <View>
                    
                      
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
                    onPress={()=> this.navigateToSpecificChat(person.index)}
              
                  >
               
               <View style={styles.row}>
                  <View style={styles.imgHolder}>
              
               {(person.imageArray[0]!=undefined) &&
                    <Image
                      style={styles.personalityTypeImg}
                      source={{uri:person.imageArray[0]}}>
                    </Image>}
                    </View>
                  <View style={styles.textHolder}>
                    <Text style={styles.personalityTypeText}>{person.name}</Text>
                    <View style={styles.row}>
              
                      </View>
                    </View>
              
                    </View>
                    <View
                style={{
                  borderColor: "#d6d7da",
                  borderBottomWidth: 1,
                  width:"80%",
                  marginLeft:15 ,
                  marginTop:5,
                }}
              />  
                  </TouchableOpacity>
                  ));
              
                  return chatters;
                }
              
    render() {
      if(this.props.personalDataReducer.hasUserPayed == true && this.props.likesUserReducer.likesUserArray !=undefined){
          return(
            <this.renderUsers/>
            )
    }
    else if ( this.props.personalDataReducer.hasUserPayed == true && this.props.likesUserReducer.likesUserArray ==undefined) {
      return(<View style={styles.container}>
        <Text style={styles.centerAlign}>
        People who like you will appear here!
        </Text>
        </View>)

    }else{
      return(<View style={styles.container}>
        <Text style={styles.centerAlign}>
        Here you can see people who like you and even change your opinion if you disliked them!
        </Text>
  
        <Text style={styles.centerAlignTwo}>This is a premium function!</Text>
      </View>)
    }
  }
}
  const mapStateToProps = state => ({
    personalDataReducer: state.personalDataReducer,
 
  });  
  export default connect(mapStateToProps)(LikesScreen)
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',  
        padding:10,
    },

  SettingsPart: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  
    flex:1

  },
    largeHeader:{
        textAlign: "center",
        textAlignVertical: "center",
        flex: 3,
        fontSize: 40
    },centerAlign:{
      alignSelf:"center",
      textAlign:"center",
      fontSize:23,
      fontWeight:"300",
      paddingTop:250
    },
    centerAlignTwo:{ alignSelf:"center",
    textAlign:"center",
    fontSize:19,
    fontWeight:"200",
    paddingTop:10
  },
    smallHeader:{
        textAlign: "center",
        textAlignVertical: "center",
        flex: 3,
        fontSize: 30
    },
    text:{
        fontWeight: "100",
        fontSize: 17,
    
    },
  });