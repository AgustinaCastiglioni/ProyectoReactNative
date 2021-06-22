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
FlatList,

} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalCards from '../Components/ModalCards.js'




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
      tarjetaDescripcion: '',

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
agregarComentario(item){
  
  item.comentario = this.state.tarjetaDescripcion
  console.log(item)
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
           <Text 
            style={styles.cardText}> 
           Comentario: {item.dob.date}
           </Text>
           <TextInput
            style={styles.input}
            placeholder="AGREGAR COMENTARIO"
            onChangeText={ (text)=> this.setState({filtroBuscarCiudad: text})}
            keyboardType="string"
          />
          <Button title="AGREGAR" onPress> </Button>
           </View>
          
           
           
           
             
                          </TouchableOpacity>   
                    
    )
}
  render(){
   
    return (
    
      <View style={{flex:1}}>
      <View style={{left: 10, top:10, justifyContent: "center", alignSelf: "left", marginTop: 15, marginBottom: 6}}>
     <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
     <Image source={require('./menuicon.png')} style={{height: 30, width:30, justifyContent:"center", alignSelf: "center"}}/>
     </TouchableOpacity>
     </View> 
     <SafeAreaView>
     <Button title="OBTENER CONTACTOS" onPress={()=> this.getData()}/>

     <TextInput
       style={styles.input}
       placeholder="FILTRAR NOMBRE"
       onChangeText={ (text)=> this.setState({filtroBuscarNombre: text})}
       keyboardType="string"
     />
     <Button onPress={()=> this.filtrarNombre()} title="BUSCAR NOMBRE"></Button>
     <TextInput
       style={styles.input}
       placeholder="FILTRAR APELLIDO"
       onChangeText={ (text)=> this.setState({filtroBuscarApellido: text})}
       keyboardType="string"
     />
     <Button onPress={()=> this.filtrarApellido()} title="BUSCAR APELLIDO"></Button>
     <TextInput
       style={styles.input}
       placeholder="FILTRAR PAIS"
       onChangeText={ (text)=> this.setState({filtroBuscarPais: text})}
       keyboardType="string"
     />
     <Button onPress={()=> this.filtrarPais()} title="BUSCAR PAIS"></Button>
     <TextInput
       style={styles.input}
       placeholder="FILTRAR CIUDAD"
       onChangeText={ (text)=> this.setState({filtroBuscarCiudad: text})}
       keyboardType="string"
     />
     
     <Button onPress={()=> this.filtrarCiudad()} title="BUSCAR CIUDAD"></Button>

    
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
   },
   input: {
     height: 40,
     margin: 12,
     borderWidth: 1,
   }
   
   })
  
       
    
    
    
  
