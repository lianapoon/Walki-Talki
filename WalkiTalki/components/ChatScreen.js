import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

export default class ChatScreen extends React.Component{
    render() {
        return (
            <View style = {styles.container}>
                <Text>chat screen!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
