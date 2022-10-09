import React from "react";
import { Platform, Text } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import Colors from '../constants/Colors';

import TabBarIcon from "../components/TabBarIcon";
import ChatMain from "../screens/chatfolder/ChatMain";
import Chat from "../screens/chatfolder/Chat";
import LinksScreen from "../screens/matchfolder/LinksScreen";
import LikesScreen from "../screens/matchfolder/LikesScreen";

import SettingsMain from "../screens/personalfolder/SettingsMain";
import ChatProfile from "../screens/chatfolder/ChatProfile";
import Login from "../screens/Login";
import betaLogin from "../screens/betaLogin"
import QuizPersonalities from "../screens/quizfolder/QuizPersonalities";
import TypeDescription from "../screens/quizfolder/TypeDescription";
import PayScreen from "../screens/personalfolder/PayScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import Terms from '../screens/Terms';
import Gdpr from '../screens/Gdpr';
import quizVersionTwo from '../screens/QuizVersionTwo'
import FinalSetup from "../screens/FinalSetup"

import MyResults from '../screens/quizfolder/MyResults'

const HomeStack = createStackNavigator({

  Home: ChatMain,
  Chat,
  
  ChatProfile,
}, {headerLayoutPreset: 'center'});


HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
   focused ? <Text style={{color:Colors.tintColor,fontSize:13, textAlign:"center"}}>Chat</Text>:<Text style={{color:Colors.tabIconDefault,fontSize:13, textAlign:"center"}}>Chat</Text>
),

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      size={26}

      name={
        Platform.OS === "ios"
          ? `ios-chatboxes`
          : "md-chatboxes"

      }
    />
  )
};
const LinksStack = createStackNavigator({
  Links: {
    screen: LinksScreen
    //   navigationOptions: {
    //     header: null
    //   }
    
  },
  LikesScreen,
  TypeDescription,


});

LinksStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    focused ? <Text style={{color:Colors.tintColor,fontSize:13, textAlign:"center"}}>Meet</Text>:<Text style={{color:Colors.tabIconDefault,fontSize:13,textAlign:"center"}}>Meet</Text>
 ),  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
      size={26}

    />
  )
};
/*
const resultStack = createMaterialTopTabNavigator({
  MyResults:MyResults,
  PartnerResults:PartnerResults,
},
{
  initialRouteName: "MyResults",

  tabBarOptions: {
    style: {
      backgroundColor: "red"
    }
  }
})*/
const SettingsStack = createStackNavigator({
  Profile: SettingsMain,
  PayScreen,
  Terms,
  Gdpr,
  QuizPersonalities,
  TypeDescription,
  MyResults,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    focused ? <Text style={{color:Colors.tintColor,fontSize:13, textAlign:"center"}}>Settings</Text>:<Text style={{color:Colors.tabIconDefault,fontSize:13, textAlign:"center"}}>Settings</Text>
 ),  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      size={26}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

const mainStack = createBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack,
    
    },
  {
    initialRouteName: "LinksStack",

    tabBarOptions: {
      style: {
        backgroundColor: "red"
      }
    }
  }
);


export default createStackNavigator(
  {
    mainStack,
    Login,
    betaLogin,
    PrivacyScreen,
    quizVersionTwo,
    FinalSetup,

  },
  {
    navigationOptions: {
      header: null
    },
    initialRouteName: "Login" 
  }
);
