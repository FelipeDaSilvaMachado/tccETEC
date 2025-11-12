import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import Home from "../../screens/Home";
import { Login } from './screens/Login';
// import Alterar from "../Alterar";
// import { alinhaTitulo } from '../../alinhaTitulo';

const Stack = createStackNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="appLoginSenha" >{/* screenOptions={alinhaTitulo} */}
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        {/* <Stack.Screen name="Cadastro" component={cadastroEngenheiro} options={{ title: 'Cadastrar' }} /> */}
        {/* <Stack.Screen name="Alterar" component={Alterar} options={{ title: 'Alterar Veiculo' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}