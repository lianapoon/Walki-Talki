import React from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat'
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class ChatScreen extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        messages:[]
      }
    }
    // initialize with messages from firebase
      componentWillMount() {
        this.setState({
          messages: [
            {},
          ],
        })
      }
    // insert into firebase store with date
      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }
    
      render() {
        return (
        <View style = {styles.container}>
            <View style = {styles.chatHeader}> 
                <TouchableOpacity style = {styles.backBtn} onPress={()=>{this.props.navigation.navigate('Messaging')}}> 
                    <Ionicons name='ios-arrow-round-back' size={40} color='black' />
                </TouchableOpacity>
                <Image style = {{width:45,height:45,margin:10}} source={require('../assets/profilePic.png')}/>
                <Text style = {styles.headerText}>{this.props.navigation.getParam('userChat', 'Chat')}</Text>
            </View>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
          <KeyboardSpacer/>
          </View>
        )
      }
    }

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    chatHeader:{
        marginTop:20,
        flexDirection:'row',
        borderBottomColor:'black',
        borderBottomWidth:1,
        alignItems:'center'
    },
    headerText:{
      fontSize:30,
    },
    backBtn:{
        marginLeft:5,
        marginTop:10,
        marginRight:5
    }
})
