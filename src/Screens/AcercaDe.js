import React, {Component} from 'react';
import{
View,
Text,
TouchableOpacity, 
Button,
Image, 
FlatList,
ActivityIndicator,
Alert,
Pressable


} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalCards from '../Components/ModalCards.js'
import {styles} from '../Styles/Styles.js'


export default class AcercaDe extends Component {
  constructor(props){
    super(props);
    this.state={

        showModal: false,

    }
  }

       
       
  render(){
   
    return (
    
        <View style={{flex: 1, backgroundColor: 'rgb(47,48,77)'}}>
       <View style={styles.viewMenuIcon}>
      <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
      <Image source={require('./whitemenu.png')} style={styles.imageIcon}/>
      </TouchableOpacity>
      </View> 
      <View style={{backgroundColor:'rgb(47,48,77)', justifyContent: 'center', alignSelf: 'center', top: 150}} >
        
             <Text style={{color: 'white', fontWeight: '500', fontSize: 35, marginBottom: 50}}>
             Agustina Castiglioni
             </Text>
             <Text style={{color: 'white', fontWeight: '500', fontSize: 35, marginBottom: 50}}>
             Nicolas Yahni
             </Text>
             <Text style={{color: 'white', fontWeight: '500', fontSize: 35}}>
             Federico D'Avola
             </Text>
           
             </View>
        
 
        </View>
        
      
    
    );
  }
  
  }