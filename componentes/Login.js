import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export default function Login() {
    const [login, setLogin] = useState({
        'email': '',
        'senha': '',
    });

    useEffect(() => {
        fetchAppLoginSenha(setLogin);
    }, {});

    // const handleCancel = (id) => {
    //     Alert.alert(
    //         [
    //             { text: 'Logar', style: 'login' },
    //             { text: 'Cancelar', onPress: () => CloseEvent },
    //         ]
    //     );
    // };
    do {
        const logar = login;
        if (!logar) {
            Alert.alert(
                [
                    {
                        text: 'Digite o email e senha!',
                    },
                ],
            );
        }
    } while (logar == false);
}