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



} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalCards from '../Components/ModalCards.js'



export default class AcercaDe extends Component {
  constructor(props){
    super(props);
    this.state={

     importedUsers:[],
     display: 'none',
     showModal: false,
     selectedItem: null,
     cleanUsers:[],
     contactosPapelera:[]

    }
  }
componentDidUpdate(){
 
}
async storeData(){
  try{
const jsonStringify= JSON.stringify(this.state.contactosPapelera)
await AsyncStorage.setItem('Users Papelera', jsonStringify);
console.log(jsonStringify)
  }
  catch(e){
console.log(e)
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

//componentDidMount(){
 // this.unsuscribe= this.props.navigation.addListener('focus', ()=>{
  //  this.getData();
  //})

//}

//componentWillUnmount(){
  //this.unsuscribe()
//}

showModal(item){
  this.setState({showModal: true, selectedItem: item})
}
onClose(){
  this.setState({showModal: false})
}

  usuarioAPapelera(item){
      this.state.contactosPapelera.push(item)
       this.setState({contactosAPapelera: this.state.contactosPapelera})
       console.log(this.state.contactosPapelera)
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
          
           <Button  title= 'BORRAR TARJETA'  onPress={()=> this.usuarioAPapelera(item)}  ></Button>
           
           
             
                          </TouchableOpacity>   
                    
    )
}
  render(){
   
    return (
    
        <View style={styles.view}>
            <View style={{left: 10, top:10, justifyContent: "center", alignSelf: "left", marginTop: 15, marginBottom: 6}}>
      <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
      <Image source={require('./menuicon.png')} style={{height: 30, width:30, justifyContent:"center", alignSelf: "center"}}/>
      </TouchableOpacity>
      </View> 
       <FlatList
        data={this.state.importedUsers}
        keyExtractor= {(item, idx)=> idx.toString()}
        renderItem={this.renderItem}
        /> 
            
       <Button title="Obtener Contactos" onPress={()=> this.getData()}/>
       <Button  title= 'Papelera'   onPress={()=> this.storeData(item)} ></Button>
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