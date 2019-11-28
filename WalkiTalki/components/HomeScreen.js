import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import BottomNavBar from './BottomNavBar'
import * as firebase from 'firebase';
import '@firebase/firestore';
import {dbh} from '../firebase.js'
import Modal from "react-native-modal";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          latitude: null,
          longitude: null,
          error: null,
          visibility: false,
          uri: '',
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
           (position) => {
             this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               error: null,
             });
             global.latitude = position.coords.latitude
             global.longitude = position.coords.longitude
           },
           (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }
    
    closePopup = () => {this.setState({visibility: false})}

    getPics = () => {
        picList = []
        dbh.ref('allPhotos/').on('value', (snapshot) => {
            snapshot.forEach(function(childSnapshot) {
                childData = childSnapshot.val();
                picElement = {'latitude': childData.latitude, 'longitude': childData.longitude, 'name': childData.name, 'uri': childData.pic}
                picList.push(picElement)
            })
        })
        return picList
    }

    randColor = () => {
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    }

    markerClick = (picture) => {
        this.setState({visibility: true, uri: picture.uri})
        console.log(this.state.uri)
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle} initialRegion={{
                    latitude:38.0293,
                    longitude:-78.4767,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                }}>
                {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                title={"Your Location"}
                />}
                {this.getPics().map(pic => (
                    <MapView.Marker
                        key={pic.name + pic.latitude + pic.longitude}
                        coordinate={{"latitude":pic.latitude,"longitude":pic.longitude}}
                        pinColor={this.randColor()}
                        onPress={() => this.markerClick(pic)}>
                    </MapView.Marker>
                ))}
                <View>
                    <Modal isVisible={this.state.visibility}>
                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => this.closePopup()} style={{alignSelf: 'flex-end'}}>
                                    <Ionicons name='md-close' size={40} color='white' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width: 500, height: 500}} source={{uri: this.state.uri}}/>
                        </View>
                    </Modal>
                </View>
                </MapView>
                <BottomNavBar
                    profile={() => this.props.navigation.navigate('Profile')}
                    home={() => this.props.navigation.navigate('Home')}
                    camera={() => this.props.navigation.navigate('Camera')}
                    messaging={() => this.props.navigation.navigate('Messaging')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mapStyle: {
        width: '100%',
        height: '91%',
    }
  });