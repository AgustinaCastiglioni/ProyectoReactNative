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
      showModal: false, 
      
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
         <Button  title= 'RESTAURAR TARJETA' ></Button>
           
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
 <ModalCards showModal={this.state.showModal} onClose={()=> this.onClose()} value={this.state.selectedItem}/>
  </View>
        
    
    )
  }
}
