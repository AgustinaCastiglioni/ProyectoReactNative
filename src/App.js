import React, {Component} from 'react';
import{

 

} from 'react-native'
// estan todas las screen(components) importadas
import Screen_Import from "./Screens/Screen_Import"
import Screen_ViewImported from './Screens/Screen_ViewImported'
import Screen_SearchModify from './Screens/Screen_SearchModify'
import Screen_Recycle from './Screens/Screen_Recycle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AcercaDe from './Screens/AcercaDe.js'
// importacion del gesture handler
import 'react-native-gesture-handler';

/* 
Instalaciones necesarias para nave general:
npm install o expo install...
react-native-gesture-handler,
react-native-reanimated,
react-native-screens,
react-native-safe-area-context
*/

// abajo es el componente que envuelve toda la aplicacion, a toda la navegacion
//adentro del navigation container vamos a indicar las pantallas que se van a utilizar
// npm install @react-navigation/native
import {NavigationContainer} from '@react-navigation/native';

// abajo es el uso de la instalacion del stack navigator, npm install @react-navigation/stack
//permite tener funcion createStackNavigator
import {createStackNavigator} from '@react-navigation/stack';

/* Stack Navigator
no tiene ningun tipo de menu que se genera automaticamente
hay que disenar el menu(la navegacion)
muy basico y permite navegar como una pagina web
al usar stack, el navigation container tiene un stack.navigator(contiene las pantallas que se quieren visualizar)
adentro del stack.navifator hay stack.screen con name y su componente(su screen)

como navegar a una pantalla:
en un evento como onPress, la navegacion se recibe como una prop, se accede a navigation y despues navigate a (la pantalla)
con la linearlidad de stack se puede ir para atras para eso sirve el goback(this.props.navigation.goback)
para hacer un push a tu misma pantalla this.props.navigation.push a (pantalla que estes)

Como pasar parametros entre paginas como objeto json:
se le puede agregar como segundo parametro al navigate un objeto({valor:1}), el primer parametro es la pantalla al cual queres ir
para recibir ese objeto se usa this.props.route.params.valor(nombre del parametro que mande) --> el route.params es importante
en el caso que no se mande un parametro a una pantalla que esperaba un parametro se tiene que definir un valor inicial 

ej:
incluir initialParams = {{valor:0}} en el stack screen de la pantalla que necesitab recibir el objeto

screenOptions --> propiedad para mofificar el estilo del encabezado(le podes dar un mismo estilo a todos los encabezados)
options se usa para modificar solo una pantalla en particular(el title en options define cada pantalla sola)
ambas propiedades se agregan al Stack.Screen,
 reciben un objeto Json:
 title, define el titulo a todas las pantallas por eso no se usa tanto(mejor hacer titulo para cada pantalla)
 headerStyle, headerTintColor, headerTitleStyle --> estilos para el encabezado

*/
const Stack= createStackNavigator();
//abajo es el uso de la instalacion del drawer navigator
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer= createDrawerNavigator();

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
     
    }
}



  render(){
 
    return (
<NavigationContainer>
  <Drawer.Navigator 
  initialRouteName="Importar Tarjetas"
  drawerType="back" 
  overlayColor="#EAEAEA"
  drawerContentOptions={{
    activeTintColor: "grey",
    itemStyle: {borderRadius: 20},
    labelStyle: {fontWeight: "bold"}
  }}
  >
     <Drawer.Screen name="Importar Tarjetas" component={Screen_Import}/>
     <Drawer.Screen name="Ver Tarjetas Importadas" component={Screen_ViewImported}/>
     <Drawer.Screen name="Buscar y Editar Tarjetas" component={Screen_SearchModify}/>
     <Drawer.Screen name="Papelera de Reciclaje" component={Screen_Recycle}/>
     <Drawer.Screen name="Acerca De" component={AcercaDe}/>
  </Drawer.Navigator>
</NavigationContainer>
    
    
    );
  }
  
  }
