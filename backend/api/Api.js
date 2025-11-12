import { Alert } from "react-native";
// import API_URL = '../api';
// import { api } from '../api';

const cadastro = api;

export const fetchEngenheiro = async (setFormEngenheiro) => {
    try {
        const response = await fetch(cadastro);
        if (!response.ok) {
            throw new Error('Erro ao buscar o engenheiro');
        }
        const data = await response.json();
        console.log('Engenheiros recebidos da API:', data);
        setRegistros(data.data);
    } catch (error) {
        console.error('Erro ao buscar o engenheiro:', error);
        throw error;
    }
};

export const cadastroEngenheiro = async (engenheiroData) => {
    try {
        const response = await fetch(cadastro, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(engenheiroData),
        });

        // Verifica se a API retornou status 204 (sem conteúdo)
        if (response.status === 204) {
            Alert.alert('Sucesso!', 'Cadastro realizado!');
            return {};
        }

        // Caso a API retorne conteúdo, tentamos converter para JSON
        const textResponse = await response.text();
        console.log('Resposta bruta da API:', textResponse);
        let responseData;
        try {
            responseData = JSON.parse(textResponse);
        } catch (error) {
            console.warn('A resposta não é um JSON válido.');
            responseData = null;
        }
        if (!response.ok || !responseData) {
            throw new Error(responseData?.message || 'Erro desconhecido na API');
        }
        return responseData;
    } catch (error) {
        console.error('Erro ao cadastrar o engenheiro:', error.message);
        Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
        return null;
    }
};

export const deleteEngenheiro = async (engenheiroId, setFormEngenheiro) => {
    try {
        const response = await fetch(`${API_URL}${engenheiroId}`, {
            method: 'DELETE',
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
                Alert.alert('Sucesso!', responseData.message);
                // Atualiza a lista localmente
                setFormEngenheiro((prevFromEngenheiro) => {
                    const novaLista = prevFromEngenheiro.filter(
                        (engenheiro) => engenheiro.codigo !== engenheiroId
                    );
                    console.log('Nova lista de engenheiros:', novaLista);
                    return novaLista;
                });
            } else {
                Alert.alert('Erro', responseData.message);
            }
        } else {
            // Caso a resposta não seja ok, tenta processar a mensagem de erro
            const textResponse = await response.text();
            let responseData = null;
            try {
                responseData = JSON.parse(textResponse);
            } catch (error) {
                console.warn('A resposta não é um JSON válido.');
                responseData = null;
            }
            throw new Error(
                responseData?.message || 'Erro desconhecido ao excluir o engenheiro'
            );
        }
    } catch (error) {
        console.error('Erro ao excluir engenheiro:', error.message);
        Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
    }
};

export const updateEngenheiro = async (engenheiroId, updatedData, navigation) => {
    try {
        const response = await fetch(`${API_URL}${engenheiroId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        console.log('Dados enviados:', updatedData);
        if (response.status === 200) {
            Alert.alert('Sucesso!', 'Engenheiro atualizado com sucesso!');
            navigation.navigate('Home');
        } else {
            const textResponse = await response.text();
            let responseData;
            try {
                responseData = JSON.parse(textResponse);
            } catch (error) {
                console.warn('A resposta não é um JSON válido.');
                responseData = null;
            }
            throw new Error(
                responseData?.message || 'Erro desconhecido ao atualizar o engenheiro'
            );
        }
    } catch (error) {
        console.error('Erro ao atualizar o engenheiro:', error.message);
        Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
    }
};