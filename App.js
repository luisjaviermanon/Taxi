import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screen/LoginScreen';
import Chat from './screen/ChatScreen';
import Login from './screen/Login';
import Iniciar from './screen/Iniciar';
import Mapa from './components/mapa';
import MapTaxi from './components/MapTaxi';
import DrawerContent from './MyDrawer/MyDrawer';
import Registrarse from './screen/Registrarse.js'
import * as firebase from 'firebase';
const Stack = createStackNavigator();
const Drawer= createDrawerNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyC3EP8ROW-vkeymU2XIyahtt04Vx7KYQnw",
  authDomain: "car-simulator-test-82e49.firebaseapp.com",
  databaseURL: "https://car-simulator-test-82e49.firebaseio.com",
  projectId: "car-simulator-test-82e49",
  storageBucket: "car-simulator-test-82e49.appspot.com",
  messagingSenderId: "60338133662",
  appId: "1:60338133662:web:748af1991c96cae1b9798f",
  measurementId: "G-HR4GCJ1E00",
};

const firebaseDAO = firebase.initializeApp(firebaseConfig);
function MyStack() {
  
  
  return (
    
    <Stack.Navigator
      initialRouteName="Registrarse"
      screenOptions={{
        gestureEnabled:true,
        gestureDirection:'horizontal',
        
        ...TransitionPresets.SlideFromRightIOS,     
        headerShown: false
      }}
      
      >
     
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen}
        firebaseDAO={firebaseDAO}
        options={{ title: 'LoginScreen'},
        {headerLeft: null} 
      }
      />      
      <Stack.Screen 
        name="Mapa" 
        component={Mapa} 
        firebaseDAO={firebaseDAO}
        options={{ title: 'Mapa'},
        {headerLeft: null} 
      }
      />   
       <Stack.Screen 
        name="Registrarse" 
        component={Registrarse} 
        firebaseDAO={firebaseDAO}
        options={{ title: 'Registrarse'},
        {headerLeft: null} 
      }
      />  
      <Stack.Screen 
      
        name="Chat" 
        component={Chat} 
        firebaseDAO={firebaseDAO}
        options={
          {title: 'Chat'}
           
        }
      />
      <Stack.Screen 
      
      name="Iniciar" 
      component={Iniciar} 
      firebaseDAO={firebaseDAO}
      options={
        {title: 'Iniciar'}
         
      }
    />
       
       <Stack.Screen
        name="Login"
        firebaseDAO={firebaseDAO}
        component={Login}
       />
     
     <Stack.Screen
        name="MapTaxi"
        firebaseDAO={firebaseDAO}
        component={MapTaxi}
       />
      
    </Stack.Navigator>

);
}
export default function App() {
  return (
    
    <NavigationContainer>
     <MyStack/>
  </NavigationContainer>
    
  );
}