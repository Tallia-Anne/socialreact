import React, {useState} from 'react'
import { ImageBackground, View, Modal, StyleSheet, Text, TouchableOpacity,TextInput, Button } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from '../config';
import axios from 'axios';

const ModalEditPost = ({ isModalOpen, setIsModalOpen, postId }) => {
    const [nom, setNom] = useState('');
    const [ref, setRef] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    
    const handleUpdatePost = async () => {
        try {
            const updatedPost = {
                nom,
                ref,
                image,
                description,
            };

            // Send a PUT request to update the post with the correct postId
            await axios.put(`${BASE_URL}/postes/update/${postId}`, updatedPost);

            // Close the modal after successful update
            setIsModalOpen(false);
            console.log(postId);
            setNom('');
            setRef('');
            setImage('');
            setDescription('');
        } catch (error) {
            console.error('Error updating the post:', error);
        }
    };
    
    return (
        <>
            <Modal
                visible={isModalOpen}
                transparent={true}
                animationType={"slide"}
            >

                <View style={styles.modalContainerStyle}>
                    <View style={styles.modalStyle} >
                        <Text style={styles.titleStyle}> Modifier </Text>
                        <TouchableOpacity onPress={() => setIsModalOpen(!setIsModalOpen)} style={styles.close} >
                            <FontAwesome name='close' color='black' size={15} />
                        </TouchableOpacity>
                        <View>
                            {/* image input */}
                            <TextInput
                                style={styles.input}
                                placeholder="le lien de l'image"
                                value={image}
                                onChangeText={(text) => setImage(text)}
                            />
                            {/* titre input */}
                            <TextInput
                                style={styles.input}
                                placeholder="Titre du poste"
                                value={nom}
                                onChangeText={(text) => setNom(text)}
                            />
                            {/* ref input */}
                            <TextInput
                                style={styles.input}
                                placeholder="La reference"
                                value={ref}
                                onChangeText={(text) => setRef(text)}
                            />
                            {/* description input */}
                            <TextInput
                                style={styles.input}
                                placeholder="Description du postes"
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                            />
                            <Button title="Modifier le poste" onPress={handleUpdatePost}/>
                        </View>

                    </View>
                </View>

            </Modal>
        </>
    )
}


const styles = StyleSheet.create({
    modalContainerStyle: {
        flex: 1,
        justifyContent: 'center',

    },

    modalStyle: {
        backgroundColor: 'white',
        height: 400,
        position: 'relative',
        alignItems: 'center',
        margin: 20,
        borderRadius: 16,
        paddingHorizontal: 30,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    close: {
        position: 'absolute',
        right: 12,
        top: 10,
    },

    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 32,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: 'pink',
        marginBottom: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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

export default ModalEditPost;