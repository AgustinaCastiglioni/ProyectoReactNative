
import React, {Component} from 'react';
import{
  View,
Text,
TouchableOpacity


} from 'react-native'

export default class MenuPress extends Component {
    constructor(props){
        super(props);
        this.state={
         
        }
    }
    render(){
      return (
  
        
<View style={{width: 30, height: 30, backgroundColor: "#A4A4A4", left: 10, top:10, justifyContent: "center", alignSelf: "left", borderRadius: 10, marginTop: 10}}>
      <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
      <Text style={{fontWeight: "bold", fontSize: 20, justifyContent:"center", alignSelf: "center", color: "#2B2B2B"}}>=</Text>
      </TouchableOpacity>
      </View> 
      );
    }
    
    }