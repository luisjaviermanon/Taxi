import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
export function DrawerContent(props){
    return(
        <View>
               
    <Drawer.Navigator initialRouteName="Mapa"
     >
      <Drawer.Screen name="Mapa" component={Mapa} />
      <Drawer.Screen name="Iniciar Sesion" component={Iniciar} />
      <Drawer.Screen name="Chat" component={Chat} />
      
    </Drawer.Navigator>
        </View>
    );
}