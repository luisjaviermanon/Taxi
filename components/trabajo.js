import React from 'react';
import {View,Alert,Text,StyleSheet,AsyncStorage,Button } from 'react-native'
import PlaceInput from './DestinationButton'
const Guardar=()=>{
  <Button title='Prueba'/>
}
export default class Trabajo extends React.Component{
    state={
        trabajo:null,
        latitude:null,
        longitude:null
    }
    
    createTwoButtonAlert = () =>
Alert.alert(
  "Jainero xpress",
  "Quieres guardar tu lugar de trabajo",
  [
    {
      text: "Cancelar",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Guardar", onPress: () =>Guardar}
  ],
  { cancelable: false }
);
    render(){
        return(
           <View style={styles.container}>
                <Text onPress={this.createTwoButtonAlert}>Trabajo</Text>
           </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"
    }
})