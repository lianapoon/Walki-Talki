import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import GridList from 'react-native-grid-list';
import BottomNavBar from './BottomNavBar'
import '@firebase/firestore';
import {dbh} from '../firebase.js'
import * as Google from 'expo-google-app-auth';

export default class ProfileScreen extends React.Component {
    //google functions
    signOutWithGoogleAsync = async() => {
        accessToken = global.accessToken
        const config = {
            expoClientId: '954454536268-rrbr2sr8gjusjsnr5nkd1guahvehhfc1.apps.googleusercontent.com',
            iosClientId: '954454536268-gdlq70okb450gl55dm50tdsu0grg63c2.apps.googleusercontent.com',
            androidClientId: '954454536268-lf8l03qtu51733c0067gs0i9v76tr00v.apps.googleusercontent.com'}
        await Google.logOutAsync({accessToken, ...config})
    }

    // menu functions
    _menu = null;
    setMenuRef = ref => { this._menu = ref; };
    hideMenu = () => { this._menu.hide(); };
    showMenu = () => { this._menu.show(); };

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
            <View style={styles.settings}>
                <Menu
                    ref={this.setMenuRef}
                    button={<TouchableOpacity onPress={this.showMenu} style={styles.buttons}>
                        <Ionicons name='md-settings' size={40} color='white'/>
                        </TouchableOpacity>}>
                    <MenuItem style={styles.menuItem} onPress={() => {
                        this.signOutWithGoogleAsync()
                        this.props.navigation.navigate('Splash')}}> <Text style={{color: 'white', fontSize: 20}}>Logout</Text>
                    </MenuItem>
                </Menu>
            </View>
            <View style = {styles.profileInfo}>
                <Image style={{width: 100, height: 100}} source={{uri: global.userObj.photoUrl}}/>
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
                    style={{marginLeft: 5}}
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
        flex: 1,
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
        fontSize: 30,
        marginLeft: 5,
    },
    posts:{
        flex:2,
    },
    gradientStyles: {
        flex: 1,
        flexDirection: 'column',
    },
    menuItem: {
        backgroundColor: '#FF70A6',
    },
    settings: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 25,
        marginRight: 20,
    },
})

