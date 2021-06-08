import React, {Component} from 'react';
import{
  View,
Text,
TouchableOpacity ,
Button,
StyleSheet,
FlatList,
ActivityIndicator,
Image

} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { infoFetch } from '../Api/RandomUsers';
import ModalCards from '../Components/ModalCards.js'



export default class Screen_Import extends Component {
  constructor(props){
    super(props);
    this.state={
        users: [],
        activity: true,
        showModal: false,
        selectedItem: null
    }
}

componentDidMount(){

    fetch('https://randomuser.me/api/?results=10')
    .then(response=> response.json())
    .then((result)=>{
      this.setState({users: result.results, activity: false})

      console.log(users)
    })

    } 
   

   
  
    async storeData(){
      try{
  const jsonStringify= JSON.stringify(this.state.users)
  await AsyncStorage.setItem('Users', jsonStringify);
  console.log(jsonStringify)
      }
      catch(e){
  console.log(e)
      }
    }
    showModal(item){
      this.setState({showModal: true, selectedItem: item})
    }
    onClose(){
      this.setState({showModal: false})
    }

    renderItem= ({item})=>{
      return(
         
          <TouchableOpacity style={styles.container} onPress={()=> this.showModal(item)}>
          <Image style={styles.cardImage} source={{uri: item.picture.medium}}/>
          <View style={styles.containerText}>
             <Text 
              style={styles.cardText}> 
             Nombre: {item.name.first}
             </Text>
             <Text 
              style={styles.cardText}> 
             Apellido: {item.name.last}
             </Text>
             <Text 
              style={styles.cardText}> 
              Email: {item.email}
             </Text>
             <Text 
              style={styles.cardText}> 
             Edad: {item.dob.age}
             </Text>
             <Text 
              style={styles.cardText}> 
             Fecha de Nacimiento: {item.dob.date}
             </Text>
             </View>
                            </TouchableOpacity>   
                      
      )
  }

  render(){
     
    return (
    
     
      <View style={styles.view}>
      { this.state.activity 
      ? <><Text>Buscando contactos...</Text>
      <ActivityIndicator
      color='blue'
      size={60}
      />
    </>
   : <FlatList
    data={this.state.users}
    keyExtractor= {(item, idx)=> idx.toString()}
    renderItem={this.renderItem}
    /> 
  }       
   <Button title="GUARDAR CONTACTOS" onPress={()=> this.storeData()}/>
   <ModalCards showModal={this.state.showModal} onClose={()=> this.onClose()} value={this.state.selectedItem}/>
    </View>
    
    );
  }
  
  }
  const styles= StyleSheet.create({
    view:{
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
    },
    container:{
     
      borderColor: 'black', 
      borderWidth: 6,
      borderRadius:14, 
      margin: 18,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 1,
      shadowOffset: {
        width: 3,
        height:2
      }
    },
    containerText:{
      borderColor: 'grey', 
      borderWidth: 2,
      borderRadius: 6, 
      margin: 8,
      padding: 4,
    },
    cardImage:{
      width: 150, 
      height: 150, 
      alignSelf: 'center'
    },
    cardText:{
      fontSize: 20,
      fontWeight: '300'
    }
    
    })