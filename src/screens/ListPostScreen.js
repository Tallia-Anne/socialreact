import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Header, ModalEditPost } from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';
import { BASE_URL } from '../config';

const ListPostScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    // console.log('user', userInfo);
    let decodedToken;
    try {
        const trimmedToken = userInfo.token;
        decodedToken = jwtDecode(trimmedToken);
    } catch (error) {
        console.log('Error decoding token:', error);
    }

    const userName = decodedToken ? decodedToken.name : '';
    const userId = decodedToken.id;

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/postes/afficher/${userId}`);
            console.log('response.data', response.data.postes);
            setData(response.data.postes);
            setLoading(false);
            // console.log(response.data.postes);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false);
        }
    };
    
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchPhotos();
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const oneAnimal = ({ item }) => {
        const images = item.Images;

        const handleDelete = async () => {
           
             try {
                 await axios.delete(`${BASE_URL}/postes/delete/${item.id}`);
                 const updatedData = data.filter((article) => article.id !== item.id);
                 setData(updatedData);
                 Alert.alert('Le poste etait supprimer')
                
             } catch (error) {
                 console.error('Error deleting article:', error);
                
             }
            
        }
        
        return (
            <View style={styles.item}>
                <View style={styles.avatarContainer}>
                    {images.map((image, index) => (
                        <Image key={index} source={{ uri: image.image }} style={styles.avatar} />
                    ))}
                    <TouchableOpacity style={styles.edit} onPress={() => setIsModalOpen(!isModalOpen)}>
                        <FontAwesome name='pencil' color='white' size={15} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contenu}>
                    <Text style={styles.name}>{item.nom}</Text>
                    <TouchableOpacity onPress={handleDelete}>
                    <View style={styles.iconeContainer} >
                        <FontAwesome name='trash' color='white' size={22} />
                        </View>
                    </TouchableOpacity>
                </View>
                <ModalEditPost
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    postId={item.id}
                    
                />
            </View>
        );
    };

    const headerComponent = () => {
        return <Text style={styles.listHeadline}>Liste des Postes</Text>;
    };

    const itemSeparator = () => {
        return <View style={styles.separator} />;
    };

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Header navigation={navigation} />
            <FlatList
                ListHeaderComponentStyle={styles.listHeader}
                ListHeaderComponent={headerComponent}
                data={data}
                renderItem={oneAnimal}
                // ListEmptyComponent={<Text>Ceci est un flatlist</Text>}
                ItemSeparatorComponent={itemSeparator}
                keyExtractor={(item) => item.id.toString()} // Assuming "id" is a unique identifier for each item
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    listHeader: {
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listHeadline: {
        color: '#333',
        fontSize: 21,
        fontWeight: 'bold',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 23,
        padding: 22
        // justifyContent: 'space-between'
    },
    avatarContainer: {
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        height: 89,
        width: 89,
        justifyContent: 'center',
        alignItems: 'center',
    },
    edit: {
        backgroundColor: 'green',
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 12,
        top: 12,
        borderRadius: 100,
    },
    contenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    avatar: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
    },
    name: {
        flex: 1,
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 12,
        marginRight: 9, // Add marginRight to create a gap between name and icon
    },
    iconeContainer: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: 'red',
        borderRadius: 100,
        height: 49,
        width: 49,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#CCC',
    },
});

export default ListPostScreen;
