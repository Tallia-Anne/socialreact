import React from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';

const ValideemailScreen = () => {
    
     const [email, setEmail] = useState('');
  

    const handleValide = async () => {
        try {
            const response = await axios.post('http://10.0.2.2/users/validemail', {
                email,
              
            });
             navigation.navigate('Login');
           
        } catch (error) {
            console.log('Erreur lors de la requête du  valide email  ', error);
        }
    };
    
    return (
        <View style={styles.container} >
            <Text>Valide de l'email</Text>
            <TextInput
                placeholder="Adresse e-mail"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Button title="Confirmer" onPress={handleValide} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ValideemailScreen;
