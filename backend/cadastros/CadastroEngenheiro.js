import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase/Firebase';
import { styles } from './Style';

export default function CadastroEngenheiro({ navigation }) {
    const [formEngenheiro, setFormEngenheiro] = useState({
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        crea: '',
        cnpj: '',
    });

    const handleCadastro = async () => {
        try {
            const credencialUsuario = await createUserWithEmailAndPassword(auth, formEngenheiro.email, formEngenheiro.senha);
            const { user } = credencialUsuario;
            setDoc(doc(db, 'users', user.id), formEngenheiro);

            Alert.alert(
                'Sucesso',
                'Usuário cadastrado com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.replace('Login')
                    }
                ],
                { cancelable: false }
            );
        } catch (err) {
            // 1. Loga o erro completo para debug
            console.log("Erro completo:", err);

            // 2. Tenta pegar a mensagem do erro. Se não tiver, usa a mensagem genérica.
            let mensagemDeErro = 'Não foi possível cadastrar, tente novamente!';

            // Se o erro for um objeto e tiver uma mensagem, usamos ela.
            if (err && err.message) {
                mensagemDeErro = err.message;
            }
            // Se for um erro do Firebase, podemos traduzir (opcional, mas bom)
            else if (err && err.code) {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        mensagemDeErro = 'Este e-mail já está em uso. Tente outro.';
                        break;
                    // ... outros casos
                    default:
                        mensagemDeErro = `Erro: ${err.code}`;
                        break;
                }
            }

            Alert.alert('Erro', mensagemDeErro);
        }
    };

    const handleInputChange = (nomeDoCampo, novoValor) => {
        setFormEngenheiro({
            ...formEngenheiro,
            [nomeDoCampo]: novoValor,
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                value={String(formEngenheiro.nome || '')}
                onChangeText={(value) => handleInputChange('nome', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={String(formEngenheiro.email || '')}
                onChangeText={(value) => handleInputChange('email', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={String(formEngenheiro.senha || '')}
                onChangeText={(value) => handleInputChange('senha', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                keyboardType="numeric"
                value={String(formEngenheiro.telefone || '')}
                onChangeText={(value) => handleInputChange('telefone', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="CREA"
                value={String(formEngenheiro.crea || '')}
                onChangeText={(value) => handleInputChange('crea', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="CNPJ"
                value={String(formEngenheiro.cnpj || '')}
                onChangeText={(value) => handleInputChange('cnpj', value)}
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