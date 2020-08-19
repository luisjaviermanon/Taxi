import React from 'react';
import {TextInput,View,StyleSheet,Text,TouchableOpacity,Button} from 'react-native';
import firebase from '../database/firebase2';
export default class Registrarse extends React.Component{
 
    constructor() {
        super();
        this.state = {
            nombre:'',
            telefono:'',
            empresa:'',
            email:'',
            password:''
        }
    }
    
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
      registerUser = () => {
        if(this.state.email === '' && this.state.password === '') {
          Alert.alert('Ingrese los datos para registrarse!')
        } else {
          this.setState({
            isLoading: true,
          })
          
          
          firebase.auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((res) => {
            res.user.updateProfile({
                nombre: this.state.nombre, 
            })
            
          
            
            console.log('Usuario registrado con éxito!')
            this.setState({
              isLoading: false,
              nombre: '',
              telefono:'',
              password:'',         
              email: '', 
              empresa:''
            })
            
            this.props.navigation.navigate('Iniciar')
          })
          .catch(error => this.setState({ errorMessage: error.message }))      
        }
        firebase.database().ref("user/").set(this.state);
      }
      
    render(){
        return(
            <View style={styles.container}>
                <Text style={{color:'#fff', fontSize:25 ,marginBottom:70}}>Formulario de Registro</Text>
                <Text style={{color:'#fff'}}>Nombre</Text>
                
                <TextInput
            style={styles.inputStyle}
            value={this.state.nombre}
          onChangeText={(val) => this.updateInputVal(val, 'nombre')}
        />     
           <Text style={{color:'#fff'}}>Teléfono</Text>
                <TextInput
            style={styles.inputStyle}
            value={this.state.telefono}
            keyboardType='phone-pad'
          onChangeText={(val) => this.updateInputVal(val, 'telefono')}
        />   
           <Text style={{color:'#fff'}}>Empresa</Text>
                <TextInput
            style={styles.inputStyle}
            value={this.state.empresa}
          onChangeText={(val) => this.updateInputVal(val, 'empresa')}
        />  
           <Text style={{color:'#fff'}}>Correo Electrónico</Text>
                <TextInput
            style={styles.inputStyle}
            value={this.state.email}
            keyboardType='email-address'
          onChangeText={(val) => this.updateInputVal(val, 'email')}
            
        />          
         <Text style={{color:'#fff'}}>password</Text>
                <TextInput
                keyboardType='visible-password'
            style={styles.inputStyle}
            value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
            
        />    
    
        <View style={{marginTop:40}}>
        <TouchableOpacity style={styles.button} onPress={() => this.registerUser()}>
                    <Text style={{color:'#fec25a'}}>Registrar</Text>
                </TouchableOpacity>
             
                <Text style={{...styles.title,color:'#fff'}}>Jainero Xpress, tu transporte más seguro.</Text>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fec25a',
    },
    title:{
        textAlign: 'center',
        
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#fff",
        borderBottomWidth: 1,
        color:'#fff'
      },
      button: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius:20
      },
})