import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class BottomNavBar extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.profile}> 
                    <Ionicons name='md-person' size={40} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.home}> 
                    <Ionicons name='md-map' size={40} color='white' />
                </TouchableOpacity>
                <TouchableOpacity> 
                    <Ionicons name='md-menu' size={40} color='white' />
                </TouchableOpacity>
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '8%',
      backgroundColor: '#FF70A6',
    },
  })