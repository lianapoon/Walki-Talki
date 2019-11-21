import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Google from 'expo-google-app-auth';

export default class SplashScreen extends React.Component {
  // Google OAuth
  signInWithGoogleAsync = async() => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        expoClientId: '954454536268-rrbr2sr8gjusjsnr5nkd1guahvehhfc1.apps.googleusercontent.com',
        iosClientId: '954454536268-gdlq70okb450gl55dm50tdsu0grg63c2.apps.googleusercontent.com',
        androidClientId: '954454536268-lf8l03qtu51733c0067gs0i9v76tr00v.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      if (type === 'success') {
        console.log(user)
        this.props.navigation.navigate('Home')
        global.userObj = user
        return accessToken
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <LinearGradient
        start={[1,1]}
        end={[0.4, 0.3]}
          colors={[ '#FF70A6', '#4BB3FD',]}
          style={styles.gradientStyles}>
        <Image source={require('../assets/WalkiTalkiLogo.png')}/>
        <Text style={styles.logo}> Walki Talki </Text>
        <TouchableOpacity style={{marginTop: 90}} onPress={() => this.signInWithGoogleAsync()}>
          <Text style={styles.button}> Start </Text>
        </TouchableOpacity>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
    gradientStyles: {
     flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 30,
      height:100,
      paddingTop: 30,
    },
    button: {
      color: 'white',
      fontSize: 25,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
      paddingRight: 30,
      paddingLeft: 30,
    }
  })
