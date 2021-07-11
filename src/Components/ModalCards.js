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
      /* MODAL
       es un componente que visualiza informacion encima de la vista actual de la aplicacion
       mulitproposito, simples interacciones como tambien visualizacion de datos del componente
       El modal envuelve los otros componentes que van en su interior
       el modal va dentro de la pantalla que se quiere visualizar y se puede ovutat o mostrar

       propiedades:
       animationType, como se va animar el modal
       onRequestClose, evento que ocurre cuando se apreta el boton fisico del dispositivo
       onShow, evento cuando se muestra el modal
       transparent, cuando es true se muestra el fondo de la aplicacion sino el el fondo de color
       visible, para ver si mostrar o ocultar el modal
      */
    <Modal 
    visible={this.props.showModal}
    transparent={true}
    animationType= 'slide'
    >
  <View style={styles.modalContainer}>    
  <View style={styles.modal}>

      { this.props.value &&
      <>
      {/* 
      styles.modalText esta llamando al css que se armo abajo en el StyleSheet
      */}
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
// es el desenfoque de la sombra
shadowRadius: 15,
// es el desplazamiento de la sombra
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