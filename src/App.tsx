import { Text, StyleSheet, View } from 'react-native';
import React, { PropsWithChildren } from 'react'

// Navigation 

import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Screens
import Signup from './screens/Signup';
import Login from './screens/Login';

export type RootStackPramList = {
  Signup: undefined;
  Login: undefined;
  
}

 const Stack = createNativeStackNavigator<RootStackPramList>()

function App() {
 

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Signup' screenOptions={{ headerShown: false }}>
    <Stack.Screen 
        name="Signup"
        component={Signup}
        />
        <Stack.Screen 
         name='Login'
         component={Login}
        />

        </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
