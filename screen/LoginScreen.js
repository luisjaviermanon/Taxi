import React from 'react';
import {View,TouchableOpacity,TextInput,Text,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
export default class LoginScreen extends React.Component{
    state = {
        name: '',
      };
    continuar=()=>{
        this.props.navigation.navigate('Chat', { name: this.state.name });
    };
   render(){
       return(
           <View style={styles.container}>
               <View style={{marginHorizontal:32}}>
                    <Text style={styles.header}>Usuario</Text>
                    <TextInput style={styles.input} 
                    placeholder='Nombre'
                    onChangeText={name=>{this.setState({name});
                    }}
                    value={this.state.name}
                    />
                    <View style={{alignItems:'flex-end',marginTop:64}}>
                    <TouchableOpacity style={styles.continuar} onPress={this.continuar}>
                        <Ionicons name='md-arrow-round-forward' color='#fff'/>
                    </TouchableOpacity>
                    </View>
               </View>
           </View>
       );
   }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f4f5f7'
    },
    cicle:{
        width:500,
        height:500,
        borderRadius:500/2,
        backgroundColor:'#fff',
        position:'absolute',
        left:-128,
        top:-20
    },
    header:{
        fontWeight:"800",
        fontSize:30,
        color:'#514E5A',
        marginTop:32
    },
    input:{
        marginTop:32,
        height:50,        
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:'#BAB7C3',
        borderRadius:30,
        paddingHorizontal:16,
        color:'#514E5A'
    },
    continuar:{
        width:70,
        height:70,
        borderRadius:70/2,
        backgroundColor:'#fec25a',
        alignItems:'center',
        justifyContent:'center'
    }
})