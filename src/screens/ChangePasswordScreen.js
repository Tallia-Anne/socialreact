import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';

const ChangePasswordScreen = () => {
    const navigation = useNavigation();

    const [forget, setForget] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.1.30:3000/users/updatepassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    forget,
                    password,
                }),
            });

            if (response.ok) {
                navigation.navigate('LoginScreen');
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error("Failed to send the form");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Mot de passe oublié</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe oublié"
                    value={forget}
                    onChangeText={(text) => setForget(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Button title="Valider" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 100,
        paddingVertical: 100,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: 'pink',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});

export default ChangePasswordScreen;
