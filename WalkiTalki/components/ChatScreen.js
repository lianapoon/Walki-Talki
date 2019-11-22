import React from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat } from 'react-native-gifted-chat'
import { Ionicons } from '@expo/vector-icons';
import '@firebase/firestore';
import {dbh} from '../firebase.js'

export default class ChatScreen extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        messages:[]
      }
      this.user = global.userObj
      this.friend = this.props.navigation.getParam('user', '0')
      this.chatId = this.generateChatId()
    }

    // form chat id 
    // just add them bc user id will be unique
    generateChatId(){
      if(this.user.id == this.friend.id){
          return this.user.id
      }
      if(this.user.id > this.friend.id){
        return this.user.id - this.friend.id
      }
      else{
          return this.friend.id - this.user.id
      }
    }

    // history of messages
    getMessages() {
      dbh.ref('chats/'+this.chatId+'/').orderByChild('order').on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
          var avatar = child.val().uid != this.user.id ? this.friend.photoUrl : this.user.photoUrl
            items.push({
                _id: child.val().createdAt,
                text: child.val().text,
                createdAt: new Date(child.val().createdAt),
                user: {
                    _id: child.val().uid,
                    avatar:avatar
                }
            });
        });

        this.setState({
            messages: items
        })


    });
      }

      componentWillMount(){
        this.getMessages();
      }


    // insert into firebase store with date
      onSend(messages = []) {
        messages.forEach(message =>{
          var now = new Date().getTime()
          dbh.ref('chats/'+this.chatId+'/').push({
            _id: now,
            text: message.text,
            createdAt: now,
            uid: this.user.id,
            order:-1*now
          })
        })
      }
    
      render() {
        return (
        <View style = {styles.container}>
            <View style = {styles.chatHeader}> 
                <TouchableOpacity style = {styles.backBtn} onPress={()=>{this.props.navigation.navigate('Messaging')}}> 
                    <Ionicons name='ios-arrow-round-back' size={40} color='black' />
                </TouchableOpacity>
                <Image style = {{width:45,height:45,margin:10}} source={{uri: this.props.navigation.getParam('user','').photoUrl}}/>
                <Text style = {styles.headerText}>{this.props.navigation.getParam('user', 'Chat').name}</Text>
            </View>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.user.id,

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
