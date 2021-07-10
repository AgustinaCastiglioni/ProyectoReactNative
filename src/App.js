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
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack= createStackNavigator();
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
