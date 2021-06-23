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
SafeAreaView,
Pressable,
Animated

} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { infoFetch } from '../Api/RandomUsers';
import ModalCards from '../Components/ModalCards.js'
import {styles} from '../Styles/Styles.js'


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
rotation= new Animated.Value(1)
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
    borrarTarjeta(item){
   
      let resultado= this.state.users.filter((item) => {
          return item.login.uuid !== value.login.uuid
      })
      
        this.setState({users: resultado})
        }


 topDown= (item)=>{
   Animated.sequence([
    Animated.spring(this.rotation,{
      toValue: 15,
      duration: 100,
      useNativeDriver: false
    }),
    Animated.spring(this.rotation,{
      toValue: 0,
      duration: 100,
      useNativeDriver: false
    })

   ]).start();
 
  this.state.contactosAGuardar.push(item)
 this.setState({contactosAGuardar: this.state.contactosAGuardar})
}
    renderItem= ({item})=>{
      return(
         
          <TouchableOpacity style={styles.container} onPress={()=> this.showModal(item)}>
             <Animated.View style={{
              top: this.rotation,
            }}
            > 
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
            <Button  title= 'Seleccionar Contacto' onPress={()=> this.topDown(item)}></Button>
            </Animated.View>
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
      <SafeAreaView style={styles.safe}>
      <TextInput
        style={styles.input}
        placeholder="Ingresa número de tarjetas a importar"
        onChangeText={ (text)=> this.setState({numeroTarjetasImportadas: text})}
        keyboardType="numeric"
      />
     
      <Pressable style={styles.button} onPress={()=> this.importarDatos()}>
       <Text style={styles.text}>IMPORTAR TARJETAS</Text>
       </Pressable>
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
  
   <Pressable style={styles.button} onPress={()=> this.storeData()}>
       <Text style={styles.text}>GUARDAR CONTACTOS</Text>
       </Pressable>
   <ModalCards showModal={this.state.showModal} onClose={()=> this.onClose()} value={this.state.selectedItem}/>
    </View>
    </View>
    );
  }
  
  }

   