import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

export default class BottomNavBar extends React.Component {
        _menu = null;
    
    setMenuRef = ref => {
        this._menu = ref;
    };
    
    hideMenu = () => {
        this._menu.hide();
    };
    
    showMenu = () => {
        this._menu.show();
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.profile}> 
                    <Ionicons name='md-person' size={40} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.home}> 
                    <Ionicons name='md-map' size={40} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.home} style={styles.buttons}> 
                    <Ionicons name='md-map' size={45} color='white' />
                </TouchableOpacity>
                <Menu
                    ref={this.setMenuRef}
                    button={<TouchableOpacity onPress={this.showMenu} style={styles.buttons}> 
                        <Ionicons name='md-menu' size={45} color='white' />
                        </TouchableOpacity>}>
                    <MenuItem onPress={this.hideMenu} style={styles.menuItem}><Ionicons name='md-camera' size={40} color='white' /></MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideMenu} style={styles.menuItem}><Ionicons name='md-text' size={40} color='white' /></MenuItem>
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
      height: '10%',
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