import React, {Component} from 'react';
import{


View,
Text,
TouchableOpacity, 
Button,
Image, 
StyleSheet,
FlatList,
ActivityIndicator,
Alert,
Pressable
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalCards from '../Components/ModalCards.js'
import {styles} from '../Styles/Styles.js'




export default class Screen_Recycle extends Component {
  constructor(props){
    super(props);
    this.state={
      importedUsersPapelera:[],
      contactosRestaurados:[],
      showModal: false, 
      
    }
    
  }

  

  async storeData(){
    try{
      let storage = await AsyncStorage.getItem('Users')
      storage = JSON.parse(storage)
      
  const jsonStringify= JSON.stringify([...this.state.contactosRestaurados, ...storage])
  await AsyncStorage.setItem('Users', jsonStringify);
  
    }
    catch(e){
  console.log(e)
    }
  }


  async getData(){
    try{
const resultado= await AsyncStorage.getItem('Users Papelera')
this.setState({importedUsersPapelera: JSON.parse(resultado)})
console.log(this.state.importedUsersPapelera)
    }
    catch(e){
        console.log(e)
    }
}
onClose(){
  this.setState({showModal: false})
}
showModal(item){
  this.setState({showModal: true, selectedItem: item})
}

usuarioARestaurar(item){
  this.state.contactosRestaurados.push(item)
   
   let resultado= this.state.importedUsersPapelera.filter(info=> info.login.uuid !== item.login.uuid)
   this.setState({importedUsersPapelera: resultado})
 
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
         <Button  title= 'RESTAURAR TARJETA' onPress={()=> this.usuarioARestaurar(item)}></Button>
           
                        </TouchableOpacity>   
                  
  )
}
  render(){
   
    return (
    
      <View style={styles.view}>
      <View style={styles.viewMenuIcon}>
<TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
<Image source={require('./whitemenu.png')} style={styles.imageIcon}/>
</TouchableOpacity>
</View> 
<FlatList
        data={this.state.importedUsersPapelera}
        keyExtractor= {(item, idx)=> idx.toString()}
        renderItem={this.renderItem}
        /> 

        
      <Pressable style={styles.button} onPress={()=> this.getData()}>
      <Text style={styles.text}>OBTENER CONTACTOS BORRADOS</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={()=> this.storeData()}>
      <Text style={styles.text}>RESTAURAR CONTACTO</Text>
      </Pressable>

 <ModalCards showModal={this.state.showModal} onClose={()=> this.onClose()} value={this.state.selectedItem}/>
  </View>
        
    
    )
  }
}
