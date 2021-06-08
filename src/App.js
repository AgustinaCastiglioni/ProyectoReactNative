import React, {Component} from 'react';
import{

 

} from 'react-native'
import Screen_Import from "./Screens/Screen_Import"
import Screen_ViewImported from './Screens/Screen_ViewImported'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AcercaDe from './Screens/AcercaDe.js'
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack= createStackNavigator();
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
    <NavigationContainer>
     <Stack.Navigator screenOptions={{
       headerStyle: {backgroundColor: 'grey'},
       headerTintColor: 'white'
       }}>
     <Stack.Screen name="Importar Tarjetas" component={Screen_Import}/>
       <Stack.Screen name="Ver tarjetas Importadas" component={Screen_ViewImported}/>
      
  </Stack.Navigator>
  </NavigationContainer>
    
    
    );
  }
  
  }
