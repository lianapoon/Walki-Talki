import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import BottomNavBar from './BottomNavBar'

export default class CameraScreen extends React.Component {
  cameraRef = React.createRef();
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handlePhoto = async () => {
    if(this.cameraRef){
      let photo = await this.cameraRef.current.takePictureAsync();
      console.log(photo);
    }  
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={this.cameraRef}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  marginBottom : 10,
                  marginLeft: 10,
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Ionicons name='md-reverse-camera' size={40} color='white' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handlePhoto()} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 10, marginRight: 10 }}>
                <Ionicons name='md-camera' size={40} color='white' />
              </TouchableOpacity>
            </View>
          </Camera>
          <BottomNavBar 
            profile={() => this.props.navigation.navigate('Profile')}
            home={() => this.props.navigation.navigate('Home')}
            camera={() => this.props.navigation.navigate('Camera')}
            messaging={() => this.props.navigation.navigate('Messaging')}
          />
        </View>
      );
    }
  }
}