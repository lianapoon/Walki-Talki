import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import BottomNavBar from './BottomNavBar'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          latitude: null,
          longitude: null,
          error:null,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
           (position) => {
             console.log(position);
             this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               error: null,
             });
           },
           (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

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
                </MapView>
                <BottomNavBar 
                    profile={() => this.props.navigation.navigate('Profile')}
                    home={() => this.props.navigation.navigate('Home')}/>
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
        marginTop: 50,
    },
    mapStyle: {
        width: '100%',
        height: '90%',
    }
  });