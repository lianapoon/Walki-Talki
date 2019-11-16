import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from 'react-native-elements';
import BottomNavBar from './BottomNavBar'

export default class MessagingScreen extends React.Component {
    state = {
      search:'',
    };

    updateSearch = search=>{
      this.setState({search});
    };

    render() {
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
              round = "true"
              containerStyle={styles.searchContainer}
              inputContainerStyle={styles.searchInputContainer}
              placeholderTextColor='white'
              inputStyle = {styles.inputStyle}
            />
            <FlatList
              style = {{flex:1}}
              ListEmptyComponent={
                <View style = {styles.noMessagesScreen}>
                  <Text style = {styles.noMessages}>No Messages</Text>
                  <Image source={require('../assets/noMessages.png')}/>
                </View>
              }
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
  }
})
