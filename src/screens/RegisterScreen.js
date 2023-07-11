import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const API_URL = 'http://localhost:3000'
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://192.168.1.30:3000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                 const token = data.token;
                 await AsyncStorage.setItem('token', token);
                navigation.navigate('LoginScreen');
                setIsLoggedIn(true);
            } else {
                console.log('Erreur lors de l\'inscription');
            }
        } catch (error) {
            console.log('Erreur lors de la requête d\'inscription', error);
            console.log(error.message); // Affiche le message d'erreur
console.log(error.response); // Affiche la réponse HTTP de l'erreur
        }
    };

    return (
        <View>
            <Text>Inscription</Text>
            <TextInput
                placeholder="Adresse e-mail"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button title="S'inscrire" onPress={handleRegister} />
        </View>
    );
};

export default RegisterScreen;
