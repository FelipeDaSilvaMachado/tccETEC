import React, { useState } from 'react';
import { View, Alert, Text, TextInput, Button, StyleSheet } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/Firebase';

export default function LoginEngenheiro({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            navigation.replace('Dashboard');

            Alert.alert(
                'Sucesso',
                'Usuário logado com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.replace('Dashboard');
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

    return (
        <View style={styles.container}>
            <Text>
                Login!
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />
            {erro ? <Text style={styles.erro}>{erro}</Text> : null}
            <Button
                style={styles.button}
                title='Entrar'
                onPress={handleLogin}
            />
            <Button
                style={styles.button}
                title='Cadastrar'
                onPress={() => navigation.navigate('Cadastro')}
            />
            <Button
                style={styles.button}
                title='Esqueci a senha'
                onPress={handleSenhaReset}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        marginVertical: 5,
    },

    erro: {
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
        color: 'red',
        fontWeight: 'bold',
        width: '70%',
    },
    button: {

        justifyContent: 'center',
        alignItems: 'center',
    },
});