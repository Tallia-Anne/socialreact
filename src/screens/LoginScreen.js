import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Background, Btn } from '../components';
import {  violet } from '../shared/theme/colors';
import { KeyboardAvoidingView } from 'react-native';
const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.1.30:3000/users/login', {
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
                const { token } = data;
                await AsyncStorage.setItem('token', token);
                navigation.navigate('HomeScreen');
               
            } else {
                console.log('Erreur lors de la connexion');
            }
        } catch (error) {
            console.log('Erreur lors de la requête de connexion', error);
        }
    };
    return (
        <Background >
            <View style={{ alignItems: "center", width: 360, height: 500 }}>
                <View style={{  height: 50 }}>
                </View>
                <KeyboardAvoidingView style={styles.container} behavior='height'>
                <View style={{ backgroundColor: 'white', height: 700, width: 360, borderTopLeftRadius: 100, borderTopRightRadius: 100, paddingTop: 100, alignItems:'center' }}>
                    <Text style={{ fontSize: 40, color: 'pink', fontWeight: 'bold' }}>Bienvenue</Text>
                    <Text style={{ fontSize: 19, color: 'grey', fontWeight: 'bold', marginBottom: 20 }}>Login to your account</Text>
                    <Text style={styles.title}>Connexion</Text>
                    <Text aria-label="Label for Username" nativeID="labelUsername">Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse e-mail"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <Text aria-label="Label for Email" nativeID="label Email">Mot de passe</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <Pressable onPress={() => navigation.navigate('ForgotScreen')}>
                        <Text style={styles.forgotText}>Mot de passe oublié</Text>
                    </Pressable>
                    <Btn btnLabel="Se connecter" Press={handleLogin}  />
                    <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.registerText}>Pas de compte ? S'inscrire</Text>
                    </Pressable>
                    </View>
                </KeyboardAvoidingView>
                
            </View>
            
        </Background>
);

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        
        borderWidth: 1,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: 'rgba(151, 157, 215, 0.39)',
        padding: 10,
    },
    registerText: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 20,
    },
    forgotText: {
        fontSize: 16,
        color: violet,
        marginVertical: 10,
    },
 
});

export default LoginScreen;
