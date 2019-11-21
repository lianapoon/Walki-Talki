import React from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat'
import { Ionicons } from '@expo/vector-icons';
import 'firebase/firestore';
import {dbh} from '../firebase.js'

export default class ChatScreen extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        messages:[]
      }
      this.userId = 40
      this.friendId = this.props.navigation.getParam('uid', '0')
    }

    // form chat id 
    // just add them bc user id will be unique
    generateChatId(){
      return this.userId+this.friendId
    }
    // initialize with messages from firebase
    // access collection with chat id 
    // sort the messsages by date created
      componentWillMount() {
        this.setState({
          messages: [
            {
              _id: this.userId,
              text: this.props.navigation.getParam('history', ''),
              createdAt: new Date(),
              user: {
                _id: this.friendId,
                name: this.props.navigation.getParam('userChat', ''),
                avatar: 'https://placeimg.com/140/140/any',
              },
            }
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
              _id: this.userId,
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
