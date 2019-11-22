import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from 'react-native-elements';
import BottomNavBar from './BottomNavBar'
import { Time } from 'react-native-gifted-chat';
import '@firebase/firestore';
import {dbh} from '../firebase.js'

// pass friends id
function Item({ navigate,item }) {
  return (
    <View>
      <TouchableOpacity style={styles.item} onPress={() =>  navigate('Chatting', {user: item})}> 
        <Image style = {{width:65,height:65}} source={{uri: item.photoUrl}}/>
        <Text style = {{fontSize:20,color:'white',marginLeft:15}}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default class MessagingScreen extends React.Component {
  getUsers = () => {
    userList = []
    dbh.ref('users/').on('value', (snapshot) => {
      snapshot.forEach(function(childSnapshot) {
        childData = childSnapshot.val();
        this.userList.push(childData)
        })
    })
    return userList;
  }

    state = {
      search:'',
    };

    updateSearch = search=>{
      this.setState({search});
    };
      
    render() {
      const {navigate} = this.props.navigation;
      const {search} = this.state;
      return (
        <LinearGradient 
        start={[1,1]}
        end={[0.4, 0.3]}
          colors={[ '#FF70A6', '#4BB3FD',]} 
          style={styles.gradientStyles}>
            <Text style = {styles.header}>Talks</Text>
            <SearchBar
              placeholder="Search"
              onChangeText = {this.updateSearch}
              searchIcon={{color:'white'}}
              value = {search}
              containerStyle={styles.searchContainer}
              inputContainerStyle={styles.searchInputContainer}
              placeholderTextColor='white'
              inputStyle = {styles.inputStyle}
            />
            <FlatList
              style = {{flex:1}}
              data = {this.getUsers()}
              renderItem={({ item }) => <Item item={item} navigate={navigate}/>}
              keyExtractor={item => item.id}
            />
            <BottomNavBar 
                profile={() => this.props.navigation.navigate('Profile')}
                home={() => this.props.navigation.navigate('Home')}
                camera={() => this.props.navigation.navigate('Camera')}
                messaging={() => this.props.navigation.navigate('Messaging')}/>
      </LinearGradient>
      );
    }
}


const styles = StyleSheet.create({
  gradientStyles: {
   flex: 1
  },
  header:{
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
    borderBottomColor:'white',
    borderBottomWidth:2,
    marginTop:30,
  },
  searchContainer:{
    backgroundColor:'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginTop:10
    
  },
  searchInputContainer:{
    borderColor:'white',
    borderWidth:1,
    borderBottomColor:'white',
    borderBottomWidth:1,
    backgroundColor:'transparent'
  },
  inputStyle:{
    color:'white'
  },
  noMessages:{
    fontStyle: 'normal',
    fontSize: 35,
    color: 'white',
    marginBottom:20
  },
  noMessagesScreen:{
    padding:40,
    alignItems:'center',
    justifyContent:'space-between'
  },
  item: {
    padding: 20,
    flexDirection:'row',
    alignItems:'center'
  },
})
