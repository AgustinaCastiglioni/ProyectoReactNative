import React, {Component} from 'react';
import{
Text,
StyleSheet,
View,
TouchableOpacity,
SafeAreaView,
TextInput,
Image

} from 'react-native'




export default class Screen_SearchModify extends Component {
  constructor(props){
    super(props);
    this.state={

    }
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
       keyboardType="string"
     />
 <Button onPress={()=> this.buscarDatos()} title="BUSCAR"></Button>
     </SafeAreaView>
    
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
  
       
    
    
    
  
