import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBarIcon from "../components/TabBarIcon";
import ChatMain from "../screens/chatfolder/ChatMain";
import Chat from "../screens/chatfolder/Chat";
import LinksScreen from "../screens/matchfolder/LinksScreen";
import LikesScreen from "../screens/matchfolder/LikesScreen";

import SettingsMain from "../screens/personalfolder/SettingsMain";
import ChatProfile from "../screens/chatfolder/ChatProfile";
import Login from "../screens/Login";
import betaLogin from "../screens/betaLogin";
import QuizPersonalities from "../screens/quizfolder/QuizPersonalities";
import TypeDescription from "../screens/quizfolder/TypeDescription";
import PayScreen from "../screens/personalfolder/PayScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import Terms from "../screens/Terms";
import Gdpr from "../screens/Gdpr";
import quizVersionTwo from "../screens/QuizVersionTwo";
import FinalSetup from "../screens/FinalSetup";

/*


const HomeStack = createStackNavigator({

    Home: ChatMain,
    Chat,
    
    ChatProfile,
  },

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
  
 
  /*
  const resultStack = createMaterialTopTabNavigator({
    MyResults:MyResults,
    PartnerResults:PartnerResults,
  },
 
  /*
  const SettingsStack = createStackNavigator({
    Profile: SettingsMain,
    PayScreen,
    Terms,
    Gdpr,
    QuizPersonalities,
    TypeDescription,
    MyResults,
  });
  

  
  const mainStack = createBottomTabNavigator(
    {
      HomeStack,
      LinksStack,
      SettingsStack,
      
      },
 
  );
  
*/
const Stack = createNativeStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator initialRouteName="ChatMain">
      <Stack.Screen name="ChatMain" component={ChatMain} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatProfile" component={ChatProfile} />
    </Stack.Navigator>
  );
}

function LinksStack() {
  return (
    <Stack.Navigator initialRouteName="Links">
      <Stack.Screen name="Links" component={LinksScreen} />
      <Stack.Screen name="Likes" component={LikesScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingsMain}         options={{ headerShown: false }}
/>
      <Stack.Screen name="Terms" component={Terms}         options={{ headerShown: false }}
/>
      <Stack.Screen name="ChatProfile" component={ChatProfile} 
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function BottomBar() {
  return (
    <Tab.Navigator initialRouteName="ChatMain">
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Links"
        component={LinksStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="quizVersionTwo"
          component={quizVersionTwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="betaLogin"
          component={betaLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mainStack"
          component={BottomBar}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
