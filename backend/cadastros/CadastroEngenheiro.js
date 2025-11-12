import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';


export default function cadastroEngenheiro({ navigation }) {
    const [formEngenherio, setFormEngenheiro] = useState({
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        crea: '',
    });

    const handleChange = (field, value) => {
        setFormEngenheiro({ ...formEngenherio, [field]: value });
    };

    const handleSubmit = async () => {
        if (!formEngenherio) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }
        // await cadastroEngenheiro(formEngenherio);
        // navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={String(formEngenherio.nome || '')}
                onChangeText={(value) => handleChange('nome', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={String(formEngenherio.email || '')}
                onChangeText={(value) => handleChange('marca', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={String(formEngenherio.senha || '')}
                onChangeText={(value) => handleChange('senha', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                keyboardType="numeric"
                value={String(formEngenherio.telefone || '')}
                onChangeText={(value) => handleChange('telefone', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="CREA"
                value={String(formEngenherio.crea || '')}
                onChangeText={(value) => handleChange('crea', value)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}