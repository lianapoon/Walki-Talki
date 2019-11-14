import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './components/SplashScreen'
import HomeScreen from './components/HomeScreen'
import ProfileScreen from './components/ProfileScreen'

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
