import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { BASE_URL } from '../config';
import axios from 'axios';

const InputCommentsEdit = ({ photoId, userId, commentId, onCancelEdit }) => {
    const [description, setDescription] = useState('');

    const handleUpdateComment = async () => {
        try {
            const updatedComment = {
                description,
                userId,
                photoId,
            };
            await axios.put(`${BASE_URL}/comments/update/${commentId}`, updatedComment);
            onCancelEdit(); // Annuler l'édition et masquer le formulaire
        } catch (error) {
            console.error('Erreur lors de la mise à jour du commentaire :', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Modifier le commentaire :</Text>
            <TextInput
                style={styles.input}
                placeholder="Nouvelle description du commentaire"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Button title="Mettre à jour" onPress={handleUpdateComment} />
            <Button title="Annuler" onPress={onCancelEdit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        paddingBottom: 15,
        fontSize: 14,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        width: 190,
        height: 50,
    },
});

export default InputCommentsEdit;
