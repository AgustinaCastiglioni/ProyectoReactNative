import React, {Component} from 'react';
import{
  View,
  Button,

} from 'react-native'
import Screen_Import from "./Screens/Screen_Import"
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={

     
    }
}

componentDidMount(){
  this.getStringStorage();
  this.setObjectStorage();
}

async setObjectStorage(){
  try{
    const jsonValue= JSON.stringify(value);
    await AsyncStorage.setItem('@myObject',jsonValue)
  }
  catch(error){
    console.log(error)
  }
}

async setStringStorage(value){
  try{
    await AsyncStorage.setItem('@myString', value)
  }
  catch(error){
    console.log(error)
  }
}
async getStringStorage(value){
  try{
    const item= await AsyncStorage.getItem('@myString');
    if(item !== null){
this.setState({
  saludo: item
})
    }
    else{
      console.log('No encontre la key')
    }
  }
  catch(error){
    console.log(error)
  }
}

async setObjectStorage(key){
  try{
    const jsonValue= await AsyncStorage.getItem('@myObject');
    if(jsonValue !== null){
      const jsonParsed= JSON.parse(JsonValue);
this.setState({
 persona: jsonParsed
})
    }
    else{
      console.log('No se encontro la key')
    }
  }
  catch(error){
    console.log(error)
  }
}

  render(){
 
    return (
    
      <View style={{flex:1}}>
      <View style={{flex:1, position: 'absolute', right: 20, top: 30}}>
      <Button title= 'MENU' style={{margin: 200}}></Button>
      </View>
     <Screen_Import/>
      </View>
    
    );
  }
  
  }