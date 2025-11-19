import React, { useState } from 'react';
import { Alert } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/Firebase';

export default function LogEngenheiro({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, senha);

            Alert.alert(
                'Sucesso',
                'Usuário logado com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.replace('DashboardEng');
                        },
                    },
                ],

                { cancelable: false }
            );
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

    return {
        email,
        setEmail,
        senha,
        setSenha,
        erro,
        setErro,
    };
};