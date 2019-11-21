import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GridList from 'react-native-grid-list';
import BottomNavBar from './BottomNavBar'
import '@firebase/firestore';
import {dbh} from '../firebase.js'

export default class ProfileScreen extends React.Component {
    // The get pics function queries firebase to find the pictures based on the current userID
    getPics = () => {
        picList = []
        dbh.ref('photos/' + global.userObj.id).on('value', (snapshot) => {
            snapshot.forEach(function(childSnapshot) {
                childData = childSnapshot.val();
                this.picList.push(childData.pic)
            })
        })
        return picList;
    }

    render() {
        return (
        // Calls the getPics function and renders all saved pictures corresponding to the logged in user
        <LinearGradient
          start={[1,1]}
          end={[0.4, 0.3]}
            colors={[ '#FF70A6', '#4BB3FD',]}
            style={styles.gradientStyles}>
            <View style = {styles.profileInfo}>
                <Image style={{width: 75, height: 75}} source={{uri: global.userObj.photoUrl}}/>
                <Text style = {styles.userName}>{global.userObj.name}</Text>
                <TouchableOpacity style = {styles.editButton}>
                    <Text style={styles.button}> Edit Profile </Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.posts}>
                <View style = {{borderBottomColor:'white', borderBottomWidth:2,marginBottom:20}}>
                    <Text style = {styles.headers}>Photos</Text>
                </View>
                <GridList
                    data={this.getPics()}
                    numColumns={3}
                    renderItem={({item}) => <Image style={{width: 120, height: 120}}source={{uri: item}}/>}
                />
            </View>
            <BottomNavBar
                profile={() => this.props.navigation.navigate('Profile')}
                home={() => this.props.navigation.navigate('Home')}
                camera={() => this.props.navigation.navigate('Camera')}
                messaging={() => this.props.navigation.navigate('Messaging')}/>
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
        flex:2,
    },
    gradientStyles: {
     flex: 1,
      flexDirection: 'column',
    },
    noWalks:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }

})

