import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavBar from './BottomNavBar'

export default class HomeScreen extends React.Component{
    render() {
        return (
        <LinearGradient 
          start={[1,1]}
          end={[0.4, 0.3]}
            colors={[ '#FF70A6', '#4BB3FD',]} 
            style={styles.gradientStyles}>
            <View style = {styles.profileInfo}>
                <Image source={require('../assets/profilePic.png')}/>
                <Text style = {styles.userName}>UserName</Text>   
                <TouchableOpacity style = {styles.editButton}> 
                    <Text style={styles.button}> Edit Profile </Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.posts}>
                <View style = {{borderBottomColor:'white', borderBottomWidth:2,marginBottom:20}}>
                    <Text style = {styles.headers}>Walks</Text>
                </View>
                <View style = {{borderBottomColor:'white', borderBottomWidth:2, marginBottom:20}}>
                    <Text style = {styles.headers}>Talks</Text>
                </View>
            </View>
            <BottomNavBar 
                    profile={() => this.props.navigation.navigate('Profile')}
                    home={() => this.props.navigation.navigate('Home')}/>
        </LinearGradient> 
        )
    }
}

const styles = StyleSheet.create({
    profileInfo:{
        flex:1.5,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    userName:{
        fontWeight: 'bold',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        paddingTop:10,
        paddingBottom:10

    },
    button:{
        color: 'white',
        fontSize: 25,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingRight: 30,
        paddingLeft: 30,
          
    },
    editButton:{
        fontWeight: 'bold',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    headers:{
        fontWeight: 'bold',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
    posts:{
        flex:2
    },
    gradientStyles: {
     flex: 1,
      flexDirection: 'column',
    },

})

