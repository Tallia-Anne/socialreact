import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from '../config';
import axios from 'axios';
import InputCommentsEdit from './InputCommentsEdit';

const ShowComments = ({ photoId, userId }) => {
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/comments/commentsAll/${photoId}`)
            .then(response => {
                setComments(response.data.commentaires);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des commentaires:', error);
            });
    }, [photoId]);

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`${BASE_URL}/comments/delete/${commentId}`);
            const updatedComments = comments.filter(comment => comment.id !== commentId);
            setComments(updatedComments);
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire:', error);
        }
    };

    const handleEditComment = (commentId) => {
        setEditingCommentId(commentId);
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
    };

    return (
        <ScrollView style={styles.commentsContainer}>
            {comments.length === 0 ? (
                <Text style={styles.noCommentsText}>Aucun commentaire pour le moment.</Text>
            ) : (
                comments.map((comment, index) => (
                    <View style={styles.bublecomments} key={index}>
                        <View style={styles.username} >
                            <Image source={{ uri: comment.User.image }} style={styles.usernameImage} />
                            <Text style={styles.commentUsernameNom}>{comment.User.nom} </Text>
                        </View>

                        <View style={styles.edit}>
                            <Text style={styles.commentaires}>{comment.description}</Text>
                            {comment.User.id === userId && (
                                <TouchableOpacity onPress={() => handleEditComment(comment.id)}>
                                    <FontAwesome name='pencil' color='green' size={15} />
                                </TouchableOpacity>
                            )}
                        </View>

                        {comment.User.id === userId && (
                            <Button title="Supprimer" onPress={() => handleDeleteComment(comment.id)} />
                        )}

                        {editingCommentId === comment.id && (
                            <InputCommentsEdit
                                photoId={photoId}
                                userId={userId}
                                commentId={comment.id}
                                onCancelEdit={handleCancelEdit}
                            />
                        )}
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    noCommentsText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
    },
    commentsContainer: {
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        padding: 22,
    },
    bublecomments: {
        paddingBottom: 26,
        marginBottom: 12,
        padding: 15,
        shadowColor: '#000',
        backgroundColor: '#f8f6f9',
        borderRadius: 16,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 5,
        elevation: 4,
    },

    edit: {
        flex: 1,
        flexDirection: 'row',
        gap: 12
    },

    username: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 12,
        paddingBottom: 12,
    },
    usernameImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'pink'
    },
    commentUsernameNom: {
        fontWeight: 'bold',
    },
    commentaires: {
        zIndex: 112,
    }
});

export default ShowComments;
