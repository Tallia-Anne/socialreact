import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShowComments from './ShowComments';
import InputComments from './InputComments';
import { AuthContext } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';

const ModalComments = ({ isModalOpen, setIsModalOpen, photoId }) => {
    const [showAllComments, setShowAllComments] = useState(true);
    const [showInputForm, setShowInputForm] = useState(false);

    const { userInfo } = useContext(AuthContext);
    // console.log('userf', userInfo);
    let decodedToken;
    try {
        const trimmedToken = userInfo.token;
        decodedToken = jwtDecode(trimmedToken);



    } catch (error) {
        console.log('Error decoding token:', error);
    }
    const userId = decodedToken.id;
    
    const handleShowAllComments = () => {
        setShowAllComments(true);
        setShowInputForm(false);
    };

    const handleWriteComment = () => {
        setShowAllComments(false);
        setShowInputForm(true);
    };

    return (
        <>
            <Modal visible={isModalOpen} transparent={true} animationType={"slide"}>
                <View style={styles.modalContainerStyle}>
                    <View style={styles.modalStyle}>
                        <Text style={styles.titleStyle}> Commentaires: </Text>

                        <TouchableOpacity onPress={() => setIsModalOpen(!setIsModalOpen)} style={styles.close}>
                            <FontAwesome name='close' color='black' size={15} />
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}  onPress={handleShowAllComments}  >
                                <Text style={styles.text} >Afficher </Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style={styles.button} onPress={handleWriteComment}>
                                <Text style={styles.text}>Écrire </Text>
                            </TouchableOpacity>
                           
                        </View>
                        {showAllComments && <ShowComments photoId={photoId}  userId={userId} />}
                        {showInputForm && <InputComments photoId={photoId} userId={userId} />}
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainerStyle: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalStyle: {
        backgroundColor: 'white',
        height: 550,
        
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
    buttonContainer: {
        flexDirection: 'row',
        gap: 52
    }, 
    button: {
        padding: 12,
        backgroundColor: 'pink',
        borderRadius: 21,
        color: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        
    },
    text: {
        color: 'white'
    }
});

export default ModalComments;
