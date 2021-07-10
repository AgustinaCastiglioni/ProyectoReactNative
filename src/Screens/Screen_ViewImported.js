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

     importedUsers:[],
     display: 'none',
     showModal: false,
     selectedItem: null,
     importedUsersRestaurados:[],
     contactosPapelera:[]

    }
  }
componentDidUpdate(){
 
}


async storeData(){
  try{
const jsonStringify= JSON.stringify(this.state.contactosPapelera)
await AsyncStorage.setItem('Users Papelera', jsonStringify);
Alert.alert("El contacto se ha enviado a papelera")
  }
  catch(e){
console.log(e)
  }
}

/* Almacenamiento Local, evitas el uso de una base de datos.
con el async getData se puede buscar las tarjetas guardadas en el almacenamiento local y mostrarlas en esta screen 

*/
async getData(){
    try{
      //se usa la funcion de getItem de lo guardado en Screen_Import con storeData(de Screen_Import)
      // se crea la variable resultado que espera(await) a que se obtenga lo guardado(getItem(en el getItem se usa la clave del storeData))
const resultado= await AsyncStorage.getItem('Users')
// se actualiza el estado con setState, con el parse se pasa al json a formato de objeto.
// si se encuentra lo guardado se quiere actuaizar el estado con setState y se pone que el nuevo valor del array ImportedUsers.
//para convertir al string en objeto se usa JSON.parse
//se quiere actualizar el estado entonces se usa setState para guardar el string nuevo como objeto en el estado
this.setState({importedUsers: JSON.parse(resultado), activity: false})

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



usuarioAPapelera(item){
      this.state.contactosPapelera.push(item)
       
    let resultado= this.state.importedUsers.filter(info=> info.login.uuid !== item.login.uuid)
     this.setState({importedUsers: resultado})
 
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
          
           <Button  title= 'BORRAR TARJETA'  onPress={()=> this.usuarioAPapelera(item)}></Button>
           
           
             
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
        data={this.state.importedUsers}
        keyExtractor= {(item, idx)=> idx.toString()}
        renderItem={this.renderItem}
        /> 
            
      

       <Pressable style={styles.button} onPress={()=> this.getData()}>
       <Text style={styles.text}>OBTENER CONTACTOS</Text>
       </Pressable>

       <Pressable style={styles.button}  onPress={()=> this.storeData()}>
       <Text style={styles.text}>PAPELERA</Text>
       </Pressable>

      
      
       <ModalCards showModal={this.state.showModal} onClose={()=> this.onClose()} value={this.state.selectedItem}/>
        </View>
        
      
    
    );
  }
  
  }
