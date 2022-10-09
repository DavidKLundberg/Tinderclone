import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

export default class Terms extends React.Component {

    render() {
      return(
      <ScrollView style={styles.container}>
      <Text style={styles.largeHeader}></Text>
      <Text style={styles.smallHeader}></Text>
      <Text style={styles.legalText}></Text>

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
  });