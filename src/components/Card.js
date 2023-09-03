import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const Card = ({ photo, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                
              
                {/* Afficher les informations de Images s'il y en a */}
                {photo.Images && photo.Images.length > 0 && (
                    photo.Images.map((image, index) => (
                        <View key={index}>
                            <Image source={{ uri: image.image }} style={styles.image} />
                            <Text style={styles.name}>{photo.nom}</Text>
                          
                        </View>
                    ))
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        padding: 16,
        width: 150,
        height: 210,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 180,
        borderRadius: 8,
        backgroundColor: '#D0CCD0'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
      
    },
});

export default Card;
