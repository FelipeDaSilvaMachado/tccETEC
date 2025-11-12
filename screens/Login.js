import Login from "../componentes/Login";
import { auth, db } from "../backend/firebase/Firebase";

export default function LoginView({ navigation }) {
    const dados = ({
        auth,
        db
    });
    return (
        <View style={styles.container}>
            <FlatList
                data={dados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            {/* Coluna da esquerda: texto */}
                            <View style={styles.infoColumn}>
                                {/* <Text style={styles.title}>Código: {item.id}</Text> */}
                                <Text>Email: {item.email}</Text>
                                <Text>Senha: {item.senha}</Text>
                            </View>

                            {/* Coluna da direita: botões */}
                            <View style={styles.actionsColumn}>
                                <IconButton
                                    icon="pencil"
                                    size={24}
                                    iconColor="#3498db"
                                    onPress={() => navigation.navigate('Logar', { Login: item })}
                                />
                                <IconButton
                                    icon="cancel"
                                    size={24}
                                    iconColor="#e74c3c"
                                    onPress={() => handleCancel(item.id)}
                                />
                            </View>
                        </View>
                    </Card>
                )}
            />

            {/* <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity> */}
        </View>
    );
}