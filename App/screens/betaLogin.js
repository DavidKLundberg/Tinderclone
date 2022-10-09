import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class betaLogin extends React.Component {
    constructor(){
        super();
        this.state = {
            value:"",
        }
    }
    aboutMeFunction = (text) => {
        console.log("aboutmefunction")
        this.setState({
            value: text
          });
        }
    login(){
        console.log(this.state.value)
        if(this.state.value == "LiJonsson123DLLlundberg"){
            this.props.navigation.navigate("Login");

            console.log("123")

        }

    }
    render() {
      return(
      <ScrollView style={styles.container}>
      <TextInput  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => this.aboutMeFunction(text)}
        style={styles.inputTextStyle}

        value={this.state.value}
    />
    
    <TouchableOpacity
                onPress={() => this.login()}
                style={[
                  styles.buttons,
               
                ]}
              >
                <Text
                  style={[
                    styles.buttonone,
                    
                  ]}
                >
                  Login
                </Text>
              </TouchableOpacity>
    
        </ScrollView> 
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',   
    },

    largeHeader:{
        textAlign: "center",
        textAlignVertical: "center",
        flex: 3,
        fontSize: 40
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

  inputTextStyle: {
    height: 120,
    borderRadius: 6,
    padding: 8,
    backgroundColor: "#f7f7f7"
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
  });