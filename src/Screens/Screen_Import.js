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
Animated,
Alert

} from 'react-native'
//import del asyncstorage
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

   this.importarDatos();

    }

   importarDatos(){
    fetch('https://randomuser.me/api/?results=' + this.state.numeroTarjetasImportadas)
    .then(response=> response.json())
    .then((result)=>{
      this.setState({users: result.results, activity: false})
    })
   }

    /* Almacenamiento local 
    diferente a paginas web, en apps de moviles se puede almacenar localmente.
    AsyncStorage(para utilizar asyncstorage se tiene que saber que son arreglos(llamados arrays) y objetos json(ej: estado))
    se tiene que instalar y tambien importar
    almacena strings, cadena de strings -->
    async --> para declarar que un metodo es asincronico, al tener async se usa try y catch
    try y catch --> intenta resolver lo que aparece dentro del try y al no poder, el catch agarra el error para poder guardarlo, imprimirlo, no hacer nada etc
    al tener estos metodos no hace falta usar tantos .then, 
    porque? 
    ej: setItem se usa en el try y devuelve la promesa el AWAIT permite esperar para que se resuelva

    en la linea de codigo con el await:
     1.se hace referencia al AsyncStorage importado
     2.setItem pasa dos parametros, clave(referencia de informacion: 'Users') y valor

     el catch agarra el error
     se usa el async storeData para poder guardar tarjetas que se trajeron con el fetch
     de esta manera se puede ver las tarjetas importadas en otro screen
     ej: se usa el store Data de abajo en Screen_ViewImported con la funcion getData
    */

    async storeData(){
      try{
        //se crea una variable en este caso jsonStringify y se asigna (se convierte en string con) -->JSON.stringify(value(objeto o un array))
  const jsonStringify= JSON.stringify(this.state.contactosAGuardar)
  // se guarda con la linea de abajo.
  await AsyncStorage.setItem('Users', jsonStringify);
  /* 
     Alert:
  cuadro de Dialogo con titulo y mensaje, se usa para mostrar mensajes al usuario
  Se puede usar para en base a los botones se tomen ciertas acciones
  en HTML/JavaScript es alert()

  Propiedades:
  Titulo
  Mensaje
  Botones y sus acciones
  cancelable( permite tocar afuera del alert para que cierre, true o false)
  color

  Metodo: Alert.alert
  el metodo recibe parametros: 
  Titulo,
  Mensaje?,
  Botones?( al poner [{ adentro va el text del boton y su evento}]),
  Opciones?(cancelacion de alguna accion)
  */
  Alert.alert("Se han guardado los contactos")
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
         /*  Touchable
         componente que simplifica como los desarrolladores interactuan con el sistema de gestos
         soluciona dos problemas:
         1.proporciona la retroalimentacion(cuando se toca algo haya interaccion, da sensacion de respuesta al usuario) visual para las interacciones del usuario con la app
         2.porporciona la capacidad de cancelar gestos cuando el usuario desplaza fuera del contacto original
        
         Para usar este componente se necesita envolver a los componentes que se quieren presionar
         distintos componentes de Touchable:
         TouchableHighlight
         TouchableNativeFeedback
         TouchableOpacity(opacar, senscacion de interaccion con el componente)
         TouchableWithoutFeedback(configuracion manual de Feedback)

         properties:
         onPress( permite elegir cuando ocurre un evento/accion, mas comun , el evento se dispara al interactuar con el componente)
         onPressIn(el evento se dispara apenas se toca el componente)
         OnPressOut(el vento se dispara apenas se suelta el componente)
         OnLongPress(cuando se mantiene apretado, tiene configuracion de delayLongPress que deja elegir el tiempo de mantener apretado)
         hitSlop(agranda la chance que el usuario aprete ese boton, se usa cuando hay muchos botones chicos, ayuda para no tener que agrandar botones)

          Reemplazo de Touchable es Pressable(no importante)
         */
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
             {/* Button
                caracteristicas basicas y poco personalizable, en REACT/HTML <button/> o <input type="button"/>
                Propiedades importantes:
                onPress
                color
                disabled
                Title
              */}
            <Button  title= 'Seleccionar Contacto' onPress={()=> this.topDown(item)}></Button>
            </Animated.View>
             </TouchableOpacity>   
                      
      )
  }

  render(){
  

    return (
     // View contenedor que admite componentes y diseno con flexboc y estilos, es similar al div de REACT/HTML
     // View puede contoner otros componentes View y cualquier tipo de componente
     // si tenemos un View sin contentido adentro no se visualiza
    <View style={styles.view}>
       <View style={styles.viewMenuIcon}>
      <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
        {/*  IMAGE
        para ordenar las imagenes, carpeta src, entonces se tiene que cambiar donde se encuentran las imagenes( node_modules --> expo --> appentry y ahi se cambia)
        con un package.json se puede nombrar con name un paquete y llmas a las imagenes con @name
        componente para postrar imagenes, pueden ser imagenes locales, remotas y proporcionando los datos
        require permite usar una imagen local
        uri, se pasa un JSON para acceder a imagenes de forma remota, hay que agregar un estilo asi al buscar una imagen por afuera define su tamano
        uri tambien pero con data de la imagen(jpeg,png...etc) para proporcionar los datos de la imagen.
        */}
      <Image source={require('./whitemenu.png')} style={styles.imageIcon}/>
      </TouchableOpacity>
      </View> 
      <SafeAreaView style={styles.safe}>
        {/* TextInput
        componente que permite ingresar texto con teclado, brinda autocorrecion uso automatico de mayuscula etc

        propiedades:
        onChangeText(mas utilizado, permite ir tomando de caracter a caracter a traves que el texto va cambiando, se almacena en variable de estado)
        keyboardType(como se visualiza el teclado)( tiene muchas herramientas que se pueden usar como por ejemplo numeric)
        secureTextEntry( esconder informacion(contrasenas))(true o false)
        multiline(ampliar el textbox), NumberOfLines(cuantas linas quiere para el textbox)(tru o false, no se puede utilizar secureTextEntry con multiline)
        onChange(no se utiliza mas complicado que usar que el onChangeText)
        onFocus
        OnBlur
          
        */}
      <TextInput
        style={styles.input}
        placeholder="Ingresa número de tarjetas a importar"
        onChangeText={ (text)=> this.setState({numeroTarjetasImportadas: text})}
        keyboardType="numeric"
      />
     
      <Pressable style={styles.button} onPress={()=> this.importarDatos()}>
        {/* TEXT
        React Native no puede mostrar texto sin el componente Text vs React/ HTML que no hace falta un tag */}
        {/*Propiedades de Text: 
        disabled(se usa para disabilitar otras de las propiedades),
        onPress, onLongPress(mantener selecionado),
        selectable(permite seleccionar text),
        permite acciones sobre texto y la seleccion de codigo */}
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
    /* Flatlist
        El Flatlist reemplaza el ScrollView, es para visualizar un listado de items
        propiedades:
        data(el arreglo con los items a visualizar)! props obligatorias
        keyExtractor(permite generar la clave unica para cada item a visualizar)opcional
        renderItem(como se visualiza el item) !props obligatorias
        itemSeperatorComponent(solo se usa si es necesario para separar)opcional
        numColumns(cantidad de columnas por defecto 1)opcional
    */
   : <FlatList
    data={this.state.users}
    //el extractor recibe como parametros el propio item que se procesa y el id(idx) despues se utiliza el id para pasarlo a string porque elkey requiere una cadena de caracteres.
    keyExtractor= {(item, idx)=> idx.toString()}
    renderItem={this.renderItem}
    
  
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

   