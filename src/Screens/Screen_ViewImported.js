import React, {Component} from 'react';
import{
  View,
Text,
TouchableOpacity 


} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default class Screen_ViewImported extends Component {
  constructor(props){
    super(props);
    this.state={

     importedUsers:[]
    }
}

async getData(){
    try{
const resultado= await AsyncStorage.getItem('Users')
this.setState({importedUsers: JSON.parse(resultado)})
    }
    catch(e){
        console.log(e)
    }
}
  render(){
    return (
    
      <View style={{flex:1}}>
     <Text>Mostranos las tarjetas importadas</Text>
     {values}
     <TouchableOpacity onPress= {this.getData.bind(this)} >
         <View><Text>RECUPERAR DATOS</Text></View>
     </TouchableOpacity>
    
      </View>
    
    );
  }
  
  }