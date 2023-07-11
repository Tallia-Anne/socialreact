import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, Btn } from '../components';


const ForgotScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.1.30:3000/users/forgetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                // If the submission is successful, navigate to ChangePasswordScreen
                navigation.navigate('ChangePasswordScreen');
            } else {
                // Handle the error case
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Mot de passe oublié</Text>
    
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse e-mail"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <Button title="S'inscrire" onPress={handleSubmit} />
                </View>
            </View>
        </Background>
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
    subtitle: {
        fontSize: 19,
        color: 'grey',
        fontWeight: 'bold',
        marginBottom: 20,
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

export default ForgotScreen;
