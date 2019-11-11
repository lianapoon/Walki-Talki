import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen() {
    return (
        <View style={styles.container}> 
            <Image source={require('../assets/WalkiTalkiLogo.png')}/>
            <Text style={styles.words}>Walki Talki</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
    },
    picture: {
      width: 211.89,
      height: 192,
      marginBottom: 25,
    },
    words: {
      fontFamily: 'Helvetica',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 65,
      lineHeight: 78,
      color: 'white'
    }
  });
