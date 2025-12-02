import { Text, StyleSheet, View } from 'react-native';
import React, { PropsWithChildren } from 'react'

// Navigation 

import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Screens
import Signup from './screens/Signup';
import Login from './screens/Login';
import EmailVerify from './screens/EmailVerify';
import Home from './screens/Home';

export type RootStackPramList = {
  Signup: undefined;
  Login: undefined;
  EmailVerify: undefined;
  Home: undefined;
  
}

 const Stack = createNativeStackNavigator<RootStackPramList>()

function App() {
 

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
    <Stack.Screen 
        name="Signup"
        component={Signup}
        />
        <Stack.Screen 
         name='Login'
         component={Login}
        />
        <Stack.Screen
        name='EmailVerify'
        component={EmailVerify}
        />
        <Stack.Screen
        name='Home'
        component={Home}
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
