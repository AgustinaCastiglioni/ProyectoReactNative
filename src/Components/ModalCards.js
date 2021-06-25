import React, {Component} from 'react';
import{
  View,
Text,

StyleSheet,
Modal


} from 'react-native'



export default class ModalCards extends Component {

  render(){
    return (
    <Modal 
    visible={this.props.showModal}
    transparent={true}
    animationType= 'slide'
    >
  <View style={styles.modalContainer}>    
  <View style={styles.modal}>

      { this.props.value &&
      <>
        <Text style={styles.modalText}>• Calle y Número: {this.props.value.location.street.number}  {this.props.value.location.street.name}  </Text>
        <Text style={styles.modalText}>• Ciudad y Estado: {this.props.value.location.city} 
               /{this.props.value.location.state} </Text>
       <Text style={styles.modalText}>• País: {this.props.value.location.country} </Text>
        <Text style={styles.modalText}>• Codigo Postal: {this.props.value.location.postcode} </Text>
        <Text style={styles.modalText}>• Registrado: {this.props.value.registered.date} </Text>
      <Text style={styles.modalText}>• Teléfono: {this.props.value.phone} </Text>
      <Text style={styles.modalText}>• Comentario agregado: {this.props.value.comentario}</Text>
      </>
  }
      <Text style={styles.modalClose} onPress={this.props.onClose.bind(this)}> X </Text>
    
                  </View>  
                  </View>
    </Modal>
      
    );
  }
  
  }
const styles= StyleSheet.create({
modalContainer:{
flex:1,
justifyContent: 'flex-end',
alignItems: 'center',
backgroundColor: 'rgba(0,0,0,0.7)'
},
modal:{
height: '70%',
width: '100%',
backgroundColor: 'rgb(150,154,179)',
justifyContent: 'center',
alignItems:'flex-start',
borderTopLeftRadius:20,
borderTopRightRadius:20,
shadowColor:'black',
shadowOpacity: 0.1,
shadowRadius: 15,
shadowOffset:{
    height: 5,
    width: 5
}
},
modalText:{
  fontSize: 20,
  color: 'white',
  fontWeight: '500'

},
modalClose:{
fontSize: 25,
position: 'absolute',
right: 20,
top: 10,
fontWeight: '800',
color: 'white'
}
})