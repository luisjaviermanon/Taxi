import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screen/LoginScreen';
import Chat from './screen/ChatScreen';
import Admin from './screen/Admin.js'
import Iniciar from './screen/Iniciar';
import PassengerScreen from './screen/mapa';
import DriverScreen from './screen/MapTaxi';
import Registrarse from './screen/Registrarse.js'
import HomeScreen from './screen/HomeScreen.js'
const Stack = createStackNavigator();
const Drawer= createDrawerNavigator();


function MyStack() {
  
  
  return (
    
    <Stack.Navigator
      initialRouteName="Iniciar"
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
    
        options={{ title: 'LoginScreen'},
        {headerLeft: null} 
      }
      />    
      <Stack.Screen 
        name="Admin" 
        component={Admin} 
       
        options={{ title: 'Admin'},
        {headerLeft: null} 
      }
      />    
    
      <Stack.Screen 
        name="PassengerScreen" 
        component={PassengerScreen} 
       
        options={{ title: 'PassengerScreen'},
        {headerLeft: null} 
      }
      />   
       <Stack.Screen 
        name="Registrarse" 
        component={Registrarse} 
      
        options={{ title: 'Registrarse'},
        {headerLeft: null} 
      }
      />  
      <Stack.Screen 
      
        name="Chat" 
        component={Chat} 
        
        options={
          {title: 'Chat'}
           
        }
      />
      <Stack.Screen 
      
      name="Iniciar" 
      component={Iniciar} 
     
      options={
        {title: 'Iniciar'}
         
      }
    />
   
     
     <Stack.Screen
        name="DriverScreen" 
        component={DriverScreen} 
        
        options={
          {title: 'DriverScreen'}
           
        }
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