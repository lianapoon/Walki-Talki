import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
    return (
        <LinearGradient 
          start={[1,1]}
          end={[0.4, 0.3]}
            colors={[ '#FF70A6', '#4BB3FD',]} 
            style={styles.gradientStyles}>
          <Image source={require('../assets/WalkiTalkiLogo.png')}/>
          <Text style={styles.logo}> Walki Talki </Text>
        </LinearGradient> 
    )   
}

const styles = StyleSheet.create({
    gradientStyles:{
     flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 30,
      height:100,
      paddingTop: 30,
    },
  })
