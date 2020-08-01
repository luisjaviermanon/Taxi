import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
export default class Login extends React.Component{
    
      
    Whatsapp=()=>{
        const OpenURLButton = ({ url, children }) => {
            const handlePress = useCallback(async () => {
              // Checking if the link is supported for links with custom URL scheme.
              const supported = await Linking.canOpenURL(url);
          
              if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
              } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
              }
            }, [url]);
          
            return <Button title={children} onPress={handlePress} />;
          };
        <OpenURLButton url={Linking.openURL('https://api.whatsapp.com/send?phone=+18299692128')}/>
    }
    render(){ 
        return(
           
            <View style={styles.container}>
            
                <Text style={{...styles.title, fontSize:40, color:'#fff',marginBottom:120}}>JAINERO XPRESS</Text>
                <Text style={{...styles.title, fontSize:20, color:'#fff',padding:10}}>Bienvenido</Text>
                <Text style={{...styles.title, color:'#fff',paddingBottom:20}}>Jainero Xpress tu trasporte mas seguro</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('Iniciar')}}>
                    <Text style={{color:'#fec25a'}}>Iniciar</Text>
                </TouchableOpacity>
                
               <View style={{marginTop:20}}>
                <Text onPress={()=> this.Whatsapp()} style={{color:'#fff'}}> 
                <Ionicons name='logo-whatsapp' style={{color:'#4caf50',fontSize:40 }}/>Precione para pedidos o llamadas via whatsapp
                </Text>
                </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
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
    button: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius:20
      },
      what:{
          color:'#4caf50',
          fontSize:40,
          
      }
})