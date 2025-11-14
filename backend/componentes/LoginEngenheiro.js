import React, { useState } from 'react';
import { View, Alert, Text } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/Firebase';

export default function Login({ navigation }) {
    const logar = useState({
        email,
        senha,
    });

    const [erro, setErro] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, logar);
            navigation.replace('Perfil');
        } catch (err) {
            console.log('Erro de login', err.message);
            setErro('Erro ao fazer login. Verifique os dados inseridos!');
        }
    };

    const handleSenhaReset = async () => {
        if (!email) {
            Alert.alert('Informe seu email para recuperar a senha!');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Sucesso', 'Email para recuperar a senha foi enviado, verifique sua caixa de entrada!');
        } catch (err) {
            Alert.alert('Erro', 'Não foi possivel enviar o email de recuperação de senha!');
        }
    };

    return (
        <View>
            {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        </View>
    );
};