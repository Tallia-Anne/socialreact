
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ImageBackground, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';
const addimage = require('../assets/pinterest5.jpg')

const AddPost = ({navigation}) => {
    const { userInfo } = useContext(AuthContext);
    console.log(userInfo);
   
    let decodedToken;
    try {
        const trimmedToken = userInfo.token;
        decodedToken = jwtDecode(trimmedToken);
        console.log(decodedToken);
    } catch (error) {
        console.log('Error decoding token:', error);
    }

    const [nom, setNom] = useState('');
    const [ref, setRef] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const handleAddSubmit = async () => {
        try {
            const response = await fetch(`${ BASE_URL }/postes/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom,
                    image,
                    ref,
                    description,
                    userId: decodedToken.id, // Inclure l'ID de l'utilisateur dans le corps de la requête
                }),
            });

            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la création du poste.');
            }

            const data = await response.json();
            console.log(data);

            Alert.alert('Succès', 'Poste créé avec succès !');
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.error('Erreur lors de la création du poste :', error);
            Alert.alert('Erreur', error.message || 'Une erreur est survenue lors de la création du poste.');
        }
    };
    console.log(userInfo)

    return (
        <View style={styles.container}>
            <View style={styles.containerhero}>
            <ImageBackground source={addimage} style={styles.hero} >
                <Text>Ajouter un poste</Text>
            </ImageBackground>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="le lien de l'image"
                    value={image}
                    onChangeText={(text) => setImage(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Titre du poste"
                    value={nom}
                    onChangeText={(text) => setNom(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="La reference"
                    value={ref}
                    onChangeText={(text) => setRef(text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Description du postes"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <Button title="Créer le poste" onPress={handleAddSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    containerhero: {
        width: '100%',
        height: 250,
       paddingBottom: 20,
},
    hero: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
    },
});

export default AddPost;
