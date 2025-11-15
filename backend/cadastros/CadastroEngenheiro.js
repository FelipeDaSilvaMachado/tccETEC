import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase/Firebase';
import { styles } from './Style';

export default function CadastroEngenheiro({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [crea, setCrea] = useState('');
    const [cnpj, setCnpj] = useState('');

    const mascararDados = (dado) => {
        const str = String(dado).trim();
        const len = str.length;
        if (len <= 4) {        
            return str;
        }
        const inicio = str.substring(0, 2);
        const fim = str.substring(len - 2);
        const meioMascarado = '*'.repeat(len - 4);
        return inicio + meioMascarado + fim;
    };

    const handleCadastro = async () => {
        try {
            const credencialUsuario = await createUserWithEmailAndPassword(auth, email, senha);
            const { user } = credencialUsuario;
            const creaMascarado = mascararDados(crea);
            const cnpjMascarado = mascararDados(cnpj);
            await setDoc(doc(db, 'users', user.id), {
                nome: nome,
                crea: creaMascarado,
                cnpj: cnpjMascarado,
            });
            Alert.alert(
                'Sucesso',
                'Usuário cadastrado com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.replace('LoginEngenheiro')
                    }
                ],
                { cancelable: false }
            );
        } catch (err) {
            console.log("Erro completo:", err);
            let mensagemDeErro = 'Não foi possível cadastrar, tente novamente!';
            if (err && err.code) {
                switch (err.code) {
                    case 'auth/invalid-email':
                        mensagemDeErro = 'Formato de e-mail inválido.';
                        break;
                    case 'auth/email-already-in-use':
                        mensagemDeErro = 'Este e-mail já está em uso.';
                        break;
                    case 'auth/weak-password':
                        mensagemDeErro = 'A senha deve ter pelo menos 6 caracteres.';
                        break;
                    default:
                        mensagemDeErro = `Erro: ${err.code}`;
                        break;
                }
            } else if (err && err.message) {
                mensagemDeErro = err.message;
            }
            Alert.alert('Erro', mensagemDeErro);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                keyboardType="numeric"
                value={telefone}
                onChangeText={setTelefone}
            />
            <TextInput
                style={styles.input}
                placeholder="CREA"
                value={crea}
                onChangeText={setCrea}
            />
            <TextInput
                style={styles.input}
                placeholder="CNPJ"
                keyboardType="numeric"
                value={cnpj}
                onChangeText={setCnpj}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleCadastro}
            >
                <Text
                    style={styles.buttonText}
                >
                    Cadastrar
                </Text>
            </TouchableOpacity>
        </View>
    );
};