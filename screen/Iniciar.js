import React from 'react';
import {TextInput,View,StyleSheet,Text,TouchableOpacity,Alert} from 'react-native';
import firebase from '../database/firebase2'
export default class Iniciar extends React.Component{
  
    constructor() {
        super();
        this.state = { 
          email: '', 
          password: '',
          isLoading: false,
          phoneNumber:'',
         
        }
      }
    
      updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
    
      userLogin = () => {
        
        if(this.state.email === '' && this.state.password === '') {
          Alert.alert('¡Ingrese los detalles para iniciar sesión!')
        }
        if(this.state.email === 'Admin' && this.state.password === '1234') {
          Alert.alert('Bienvenido admin')
          this.props.navigation.navigate('Admin')
      } else {
          this.setState({
            isLoading: true,
          })
          firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((res) => {
            console.log(res)
            console.log('User logged-in successfully!')
            this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
            this.props.navigation.navigate('Taxi')
          })
          .catch(error => this.setState({ errorMessage: error.message }))
        }
      }
    render(){
        return(
            <View style={styles.container}>
            <Text style={{...styles.title, fontSize:40, color:'#fff',marginBottom:120}}>JAINERO XPRESS</Text>
            
      
                <TextInput
            style={styles.inputStyle}
             placeholder="Correo"
             value={this.state.email}
             onChangeText={(val) => this.updateInputVal(val, 'email')}
        />    

 
        <TextInput
            style={styles.inputStyle}
             placeholder="contrasena"
             value={this.state.password}
             onChangeText={(val) => this.updateInputVal(val, 'password')}
        />      
       
        <TouchableOpacity style={styles.button} onPress={() => this.userLogin()}>
                    <Text style={{color:'#fec25a'}}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <Text style={{...styles.title, color:'#fff',paddingBottom:20}} onPress={()=>{this.props.navigation.navigate('Registrarse')}}>No tienes cuenta?Registrase</Text>
                
            </View>
        )
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
        marginVertical: 8,
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