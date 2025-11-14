import { useState } from "react";
import { Login } from "../backend/componentes/LoginEngenheiro";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function LoginView({ navigation }) {
    const dados = ({
        Login,
    });

    return (
        <View style={styles.container}>
            <Text>
                Login!
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={useState}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry
                value={senha}
                onChangeText={useState}
            />
            {/* {erro ? <Text style={styles.erro}>{erro}</Text> : null} */}
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