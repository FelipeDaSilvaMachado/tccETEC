import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './backend/componentes/SplashScreen';
import CadastroEngenheiro from './backend/cadastros/CadastroEngenheiro';
import LoginEngenheiro from './backend/componentes/LoginEngenheiro';

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen name="CadastroEngenheiro" component={CadastroEngenheiro} options={{ title: 'Cadastrar' }} />
        <Stack.Screen name="Login" component={LoginEngenheiro} options={{ title: 'Login' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};