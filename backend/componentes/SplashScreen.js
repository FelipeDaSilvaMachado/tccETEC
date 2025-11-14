import React, { useEffect } from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Define a duração do splash (4 segundos)
        const timer = setTimeout(() => {
            navigation.replace('CadastroEngenheiro'); // Após o tempo, navega para a tela de cadastroEngenheiro
        }, 5000);

        return () => clearTimeout(timer); // limpa o timer quando o componente for desmontado
    }, [navigation]);

    return (
        <View style={styles.splashContainer}>
            <Image
                source={{ uri: 'https://cdn.prod.website-files.com/651c2bbd8c40de720b290d09/652ee2f1cf47c99855956167_planejamento-e-controle-de-obras.avif' }}
                style={styles.splashImage}
            />
            <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        </View>
    );
};

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5e5e5',
    },
    splashImage: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    loader: {
        marginTop: 20,
    },
});

export default SplashScreen;