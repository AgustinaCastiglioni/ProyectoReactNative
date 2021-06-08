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
     selectedItem: null

    }
  }
componentDidUpdate(){
  console.log(this.state.importedUsers)
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
          
           <Button  title= 'BORRAR TARJETA'></Button>
             
                          </TouchableOpacity>   
                    
    )
}
  render(){
   
    return (
    
        <View style={styles.view}>
         
       <FlatList
        data={this.state.importedUsers}
        keyExtractor= {(item, idx)=> idx.toString()}
        renderItem={this.renderItem}
        /> 
            
       <Button title="Obtener Contactos" onPress={()=> this.getData()}/>
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