import React, {Component} from 'react';
import{
Text,
StyleSheet,
View,
TouchableOpacity,
SafeAreaView,
TextInput,
Image,
Button,
Pressable,
FlatList,

} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalCards from '../Components/ModalCards.js'
import {styles} from '../Styles/Styles.js'



export default class Screen_SearchModify extends Component {
  constructor(props){
    super(props);
    this.state={
      showModal: false,
      filtroBuscarNombre: "",
      filtroBuscarApellido: "",
      filtroBuscarPais: "",
      filtroBuscarCiudad: "",
      importedUsers: [], 
      nuevoComentario: '',
      nuevoPerfil: []

    }
  }

  async getData(){
    try{
const resultado= await AsyncStorage.getItem('Users')
this.setState({importedUsers: JSON.parse(resultado), activity: false})
console.log(this.state.importedUsers)
    }
    catch(e){
        console.log(e)
    }
}

async storeData(){
  try{
const comentarioAgregado= JSON.stringify(this.state.nuevoComentario)
await AsyncStorage.mergeItem('Users', comentarioAgregado);
console.log(comentarioAgregado)
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

  filtrarNombre(){
    var filtronombre = this.state.filtroBuscarNombre
    
    if(filtronombre.length !==0){
      let resultado= this.state.importedUsers.filter(info=> info.name.first === filtronombre)
      this.setState({
        importedUsers: resultado
         })
    }
    else {
      this.setState({
        importedUsers: this.state.importedUsers
         })
   
    }

   }
   filtrarApellido(){
    var filtroapellido = this.state.filtroBuscarApellido
  
  if(filtroapellido.length !==0){
    let resultado= this.state.importedUsers.filter(info=> info.name.last === filtroapellido)
    this.setState({
      importedUsers: resultado
       })
  }
  else {
    this.setState({
      importedUsers: this.state.importedUsers
       })
  }

    }
  
    filtrarPais(){
      var filtropais = this.state.filtroBuscarPais
    
    if(filtropais.length !==0){
      let resultado= this.state.importedUsers.filter(info=> info.location.country === filtropais)
      this.setState({
        importedUsers: resultado
         })
    }
    else {
      this.setState({
        importedUsers: this.state.importedUsers
         })
    }
  
      }
    
      filtrarCiudad(){
        var filtrociudad = this.state.filtroBuscarCiudad
      
      if(filtrociudad.length !==0){
        let resultado= this.state.importedUsers.filter(info=> info.location.city === filtrociudad)
        this.setState({
          importedUsers: resultado
           })
      }
      else {
        this.setState({
          importedUsers: this.state.importedUsers
           })
      }
    
        }
async agregarComentario(item){
  try{
  item.comentario = this.state.nuevoComentario
const jsonValue=JSON.stringify(this.state.importedUsers)
await AsyncStorage.setItem('Users', jsonValue)
console.log(item.comentario)
  }
  catch(error){
  console.log(error)
}}
   
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
           <Text 
            style={styles.cardText}> 
           Comentario: {item.comentario}
           </Text>
           <TextInput
            style={styles.input}
            placeholder="AGREGAR COMENTARIO"
            onChangeText={ (text)=> this.setState({nuevoComentario: text})}
            keyboardType="string"
          />
          <Button title="AGREGAR" onPress={()=> this.agregarComentario(item)}> </Button>
           </View>
          
           
           
           
             
                          </TouchableOpacity>   
                    
    )
}
  render(){
   
    return (
    
      <View style={{flex:1, backgroundColor: 'rgb(47,48,77)'}}>
      <View style={styles.viewMenuIcon}>
     <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
     <Image source={require('./whitemenu.png')} style={styles.imageIcon}/>
     </TouchableOpacity>
     </View> 
     <SafeAreaView style={styles.safe}>
     
     <Pressable style={styles.button} onPress={()=> this.getData()}>
       <Text style={styles.text}>OBTENER CONTACTOS</Text>
       </Pressable>

     <TextInput
       style={styles.input}
       placeholder="FILTRAR NOMBRE"
       onChangeText={ (text)=> this.setState({filtroBuscarNombre: text})}
       keyboardType="default"
     />
     <Pressable style={styles.button} onPress={()=> this.filtrarNombre()}>
       <Text style={styles.text}>BUSCAR NOMBRE</Text>
       </Pressable>
       
     <TextInput
       style={styles.input}
       placeholder="FILTRAR APELLIDO"
       onChangeText={ (text)=> this.setState({filtroBuscarApellido: text})}
       keyboardType="default"
     />
    <Pressable style={styles.button} onPress={()=> this.filtrarApellido()}>
       <Text style={styles.text}>BUSCAR APELLIDO</Text>
       </Pressable>

     <TextInput
       style={styles.input}
       placeholder="FILTRAR PAIS"
       onChangeText={ (text)=> this.setState({filtroBuscarPais: text})}
       keyboardType="default"
     />
    <Pressable style={styles.button} onPress={()=> this.filtrarPais()}>
       <Text style={styles.text}>BUSCAR PAÍS</Text>
       </Pressable>
     <TextInput
       style={styles.input}
       placeholder="FILTRAR CIUDAD"
       onChangeText={ (text)=> this.setState({filtroBuscarCiudad: text})}
       keyboardType="default"
     />
     
     <Pressable style={styles.button} onPress={()=> this.filtrarCiudad()}>
       <Text style={styles.text}>BUSCAR CIUDAD</Text>
       </Pressable>

    
      <FlatList
        data={this.state.importedUsers}
        keyExtractor= {(item, idx)=> idx.toString()}
        renderItem={this.renderItem}
        /> 
 

     </SafeAreaView>
     <ModalCards showModal={this.state.showModal} onClose={()=> this.onClose()} value={this.state.selectedItem}/>
   </View>
  
   );
 }
 
 }
 
       
    
    
    
  
