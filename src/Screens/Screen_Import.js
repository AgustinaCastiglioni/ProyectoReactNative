import React, {Component} from 'react';
import{
  View,
Text,
TouchableOpacity ,
Button,
StyleSheet,
FlatList,
ActivityIndicator,
Image,
TextInput,
SafeAreaView

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
        selectedItem: null,
        contactosAGuardar:[],
        numeroTarjetasImportadas: '',
      
    }
}

componentDidMount(){

    fetch('https://randomuser.me/api/?results=' + this.state.numeroTarjetasImportadas)
    .then(response=> response.json())
    .then((result)=>{
      this.setState({users: result.results, activity: false})
    })

    } 
   importarDatos(){
    fetch('https://randomuser.me/api/?results=' + this.state.numeroTarjetasImportadas)
    .then(response=> response.json())
    .then((result)=>{
      this.setState({users: result.results, activity: false})
    })

   }

    async storeData(){
      try{
  const jsonStringify= JSON.stringify(this.state.contactosAGuardar)
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
    borrarTarjeta(id){
   
      let resultado= this.state.users.filter(info=> info.uuid !== id)
      
        this.setState({
      cleanUsers: resultado
        })
        }

usuarioAGuardar(item){
this.state.contactosAGuardar.push(item)
 this.setState({contactosAGuardar: this.state.contactosAGuardar})
 console.log(this.state.contactosAGuardar)
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
            <Button  title= 'Seleccionar Contacto' onPress={()=> this.usuarioAGuardar(item)}></Button>
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
      <TextInput
        style={styles.input}
        placeholder="Ingresa numero de tarjetas a importar"
        onChangeText={ (text)=> this.setState({numeroTarjetasImportadas: text})}
        keyboardType="numeric"
      />
      <Button onPress={()=> this.importarDatos()} title="IMPORTAR"></Button>
      </SafeAreaView>
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
    onDelete={this.borrarTarjeta.bind(this)}
    /> 
  }       
   <Button title="GUARDAR CONTACTOS" onPress={()=> this.storeData()}/>
   <ModalCards showModal={this.state.showModal} onClose={()=> this.onClose()} value={this.state.selectedItem}/>
    </View>
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
   