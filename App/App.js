import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import AppLoading from "expo-app-loading";
import {Asset} from "expo-asset";
import * as Icon from "@expo/vector-icons"
import * as Font from "expo-font";
//import AppNavigator from "./navigation/AppNavigator";
import NewAppNavigator from "./navigation/NewAppNavigator";

import { Provider } from 'react-redux'
import store from './components/Redux/store/index'



export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      console.log("App.js, is this run once everytime app is launched")

      /*return (
        
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <Provider store={store}> 

            <AppNavigator navigation={this.props.navigation}/>
            </Provider>
        </View>
      );*/
      return(
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}

            <Provider store={store}> 


            <NewAppNavigator navigation={this.props.navigation}/>
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 24,

    backgroundColor: "#fff"
  }
});
