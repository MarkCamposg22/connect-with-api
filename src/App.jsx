import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';

function App() {
    const [loading, setLoading] = useState(false);
    const [cep, setCep] = useState("");

    const handleGetCep = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`)
            const json = await response.json();
            Alert.alert('Seu Endereço: ', `Logradouro: ${json.logradouro}\n Bairro: ${json.bairro}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Consumindo uma API</Text>
            <TextInput
                placeholder='Digite o CEP:'
                style={styles.input}
                value={cep}
                onChangeText={(value) => setCep(value)}
            />
            <TouchableOpacity style={styles.button} onPress={handleGetCep}>
                {loading ? (
                    <ActivityIndicator color="#000" />
                ) : (
                    <Text style={styles.text}>Buscar</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 20, },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 50 },
    input: { borderBottomWidth: 1, borderColor: '#000', width: '90%' },
    button: { backgroundColor: 'lightblue', padding: 10, width: '90%' },
    text: { fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
});

export default registerRootComponent(App);
