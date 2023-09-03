import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text, Button, TextInput} from 'react-native';
import { BASE_URL } from '../config';
import axios from 'axios';


const InputComments = ({ photoId , userId }) => {
    const [description, setDescription] = useState('');
   
    const handleSendComments = async () => {
        try {
            const SendComments = {
                description,
                userId,    
                photoId,
            }
            await axios.post(`${BASE_URL}/comments/new/${photoId}/${userId}`, SendComments)
            // console.log(photoId)
            // console.log(userId)
            setDescription('');
        } catch (error) {
            console.error('Error : l\'envoie du comments n\'a pas était :', error);
        }
    }
    
    
    return (
        <View style={styles.container} >
           
            <Text style={styles.label} >Commentaires:</Text>
            <TextInput
                style={styles.input}
                placeholder="Description du postes"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Button title="Envoyer" onPress={handleSendComments} />
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
        width: 250,
        height: 200,
    },
})

export default InputComments;
