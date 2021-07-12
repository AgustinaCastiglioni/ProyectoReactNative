// se importa el StyleSheet para usar lo de React NATIVE
import {StyleSheet} from 'react-native';
/* Estilos
todos los componentes principales aceptan la porpiedad llamada style
la diferencia mas grande es en vez de usar el guion del medio en los nombres se usa camelCase

Tipos de estilos:
En Linea, ej: <Text style={{backgroundColor: 'blue', fonstSize: 22}}>, va con doble llave porque es un objeto literal dentro de una propiedad
Objetos, ej: <Text style = {textStyles}> abajo va const textStyles = { color: 'blue',fontSize: 22}
Hoja de Estilos, ej: const styles = StyleSheet.create({container:{backgroundColor: 'red'}}), es un archivo aparte que se importa como StyleSheet. en el codigo se anota como <Text style={styles.container}>
*/

/* Flexbox 
flexbox es un algoritmo diseñado para que los componentes hijos puedan ser ubicados en la pantalla independientemente de la resolucion del dispositivo

*/
const styles= StyleSheet.create({
    view:{
      backgroundColor: 'rgb(47,48,77)',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
    },
    container:{
     backgroundColor: 'white',
      borderColor: 'white', 
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
      borderColor: '#2196F3', 
      borderWidth: 2,
      borderRadius: 6, 
      margin: 8,
      padding: 4,
    },
    cardImage:{
      width: 150, 
      height: 150, 
      alignSelf: 'center',
      borderRadius: 6,
    },
    cardText:{
      fontSize: 18,
      fontWeight: '400',
      
    },
    viewMenuIcon: {
      left: 10,
       top:10, 
       justifyContent: "center", 
       alignSelf: 'flex-start', 
       marginTop: 15, 
       marginBottom: 6,
       backgroundColor: 'rgb(47,48,77)'
      },
      imageIcon:{
       
        height: 30,
         width:30, 
         justifyContent:"center", 
         alignSelf: "center"
      },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      
    },
    text: {
      fontSize: 16,
      lineHeight: 15,
      fontWeight: '600',
      letterSpacing: 0.25,
      color: 'white',
      
      
    },
    textObtener: {
      fontSize: 16,
      lineHeight: 15,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      
      
    },
    input: {
      height: 22,
      borderWidth: 1,
      backgroundColor: 'white',
      marginHorizontal: 25,
      borderRadius: 5,
      padding: 1, 
      marginTop: 8,
     
      
    },
    safe:{
      backgroundColor:'rgb(47,48,77)'
    }
    })
    // se exporta para poder usar en los componentes
    // despues se tiene que importar cada const para poder usarlos, import{styles} from '../Styles/Styles.js'
    export {styles}