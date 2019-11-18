import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './components/SplashScreen'
import HomeScreen from './components/HomeScreen'
import ProfileScreen from './components/ProfileScreen'
import CameraScreen from './components/CameraScreen'
import MessagingScreen from './components/MessagingScreen';
import ChatScreen from './components/ChatScreen';
import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCeSCWgu1_HMY1gtY-YtZ4ZTUutrxafMCA",
  authDomain: "walki-talki-a2ad3.firebaseapp.com",
  databaseURL: "https://walki-talki-a2ad3.firebaseio.com",
  projectId: "walki-talki-a2ad3",
  storageBucket: "walki-talki-a2ad3.appspot.com",
  messagingSenderId: "952890937240",
  appId: "1:952890937240:web:05b6a56c72ba4ee8c865ed",
  measurementId: "G-ZW59STM34W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const RootStack = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Camera: {
      screen: CameraScreen
    },
    Messaging: {
      screen: MessagingScreen
    },
    Chatting:{
      screen:ChatScreen
    }
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer/>
  }
}
