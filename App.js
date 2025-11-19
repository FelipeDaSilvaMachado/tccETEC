import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import SplashScreen from './backend/componentes/SplashScreen';
import CadastroEngenheiro from './fontend/screens/CadastroEngenheiro/CadastroEngenheiro' // Sua tela com abas
import LoginEngenheiro from './fontend/screens/LoginEngenheiro/LoginEngenheiro';
import DashboardEng from './fontend/screens/DashboardEng/DashboardEng'

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#001F3F" 
      />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="SplashScreen" 
          screenOptions={{ 
            headerShown: false,
            cardStyle: { backgroundColor: '#FFFFFF' }
          }}
        >
          {/* Splash Screen - Tela inicial */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          
          {/* Tela de Cadastro específica */}
          <Stack.Screen name="CadastroEngenheiro" component={CadastroEngenheiro} />
          
          {/* Tela de Login específica */}
          <Stack.Screen name="LoginEngenheiro" component={LoginEngenheiro} />
          
          {/* Dashboard após login */}
          <Stack.Screen name="DashboardEng" component={DashboardEng} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};