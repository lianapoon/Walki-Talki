import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

export default class BottomNavBar extends React.Component {
    // menu functions
    _menu = null;
    setMenuRef = ref => {  this._menu = ref; };
    hideMenu = () => { this._menu.hide(); };
    showMenu = () => { this._menu.show(); };

    // navigation functions
    camera = () => {
        this.hideMenu()
        this.props.camera()
    }
    messaging = () => {
        this.hideMenu()
        this.props.messaging()
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.profile} style={styles.buttons}> 
                    <Ionicons name='md-person' size={30} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.home} style={styles.buttons}> 
                    <Ionicons name='ios-navigate' size={30} color='white' />
                </TouchableOpacity>
                <Menu
                    ref={this.setMenuRef}
                    button={<TouchableOpacity onPress={this.showMenu} style={styles.buttons}> 
                        <Ionicons name='md-menu' size={30} color='white' />
                        </TouchableOpacity>}>
                    <MenuItem onPress={this.camera} style={styles.menuItem}><Ionicons name='md-camera' size={40} color='white' /></MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.messaging} style={styles.menuItem}><Ionicons name='md-text' size={40} color='white' /></MenuItem>
                </Menu>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '9%',
      backgroundColor: '#FF70A6',
    },
    menuItem: {
      backgroundColor: '#4BB3FD',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttons: {
      paddingLeft: 25,
      paddingRight: 25,
    }
  })