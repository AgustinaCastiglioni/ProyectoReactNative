import React, {Component} from 'react';
import{
  View,
Text,
TouchableOpacity 

} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default class Screen_Import extends Component {
  constructor(props){
    super(props);
    this.state={

        users: []
    }
}

componentDidMount(){
    fetch('https://randomuser.me/api/?results=20')
   .then(response=> response.json())
    .then(result=>{
      this.setState({users: result.results})
     } )
    }
    async storeData(){
      try{
  const jsonStringify= JSON.stringify(this.state.users)
  await AsyncStorage.setItem('Users', jsonUSers);
  console.log('Datos almacenados')
      }
      catch(e){
  console.log(e)
      }
    }
  render(){
    const values= this.state.users.map(item=> <Text 
        key={item.login.uuid}
        style={{fontSize: 20}}> 
        {item.name.first}
       </Text>)
    return (
    
      <View style={{flex:1}}>
     <Text>Mostranos las tarjetas del fetch para importar</Text>
     <Text>Mostrando la info de la API</Text>

     {values}

     <TouchableOpacity onPress= {this.storeData.bind(this)} >
         <View><Text>GUARDAR DATOS</Text></View>
     </TouchableOpacity>

      </View>
    
    );
  }
  
  }