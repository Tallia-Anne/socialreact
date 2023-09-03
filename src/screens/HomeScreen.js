import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import { Card } from '../components';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const { userInfo } = useContext(AuthContext);
    console.log(userInfo);
    console.log(userInfo.token);
    const navigation = useNavigation();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/postes/all`);
            setData(response.data.postes);
            setLoading(false);
            // console.log(response.data.postes);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false);
        }
    };

    
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.photoContainer}>
                {loading ? (
                    <Spinner visible={true} textContent={'Chargement...'} textStyle={styles.spinnerText} />
                ) : (
                    data.length > 0 ? (
                        data.map((photo) => (
                            <TouchableOpacity style={styles.cardContainer}
                            key={photo.id}
                            >
                                <Card photo={photo}  onPress={() => navigation.navigate('Photodetails', { photo })} />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>Aucune donnée trouvée</Text>
                    )
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    photoContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cardContainer: {
        margin: 8, // Espacement entre les cartes
    },
    spinnerText: {
        color: '#FFF',
    },
});

export default HomeScreen;
