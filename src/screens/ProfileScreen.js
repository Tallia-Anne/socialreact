import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, RefreshControl, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import jwtDecode from 'jwt-decode';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { BASE_URL } from '../config';
import { PhotoContainer } from '../components';
import Mymodal from '../components/Mymodal';

const ProfileScreen = ({ navigation, route }) => {
    const { logout } = useContext(AuthContext);
    const { userId } = route.params;

    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    
    
    useEffect(() => {
        fetchUserProfile(userId);
    }, [userId]);

    const fetchUserProfile = async (userId) => {
        try {
            const response = await axios.get(`${ BASE_URL }/users/profile/${userId}`);
            // console.log('API response:', response.data);
            setUserProfile(response.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setLoading(false);
            setError('Error fetching user profile');
        }
    };

    const handleEditProfile = () => {
        navigation.navigate('Editprofil', { id: userId });
    };
    
    const handleListePoste = () => {
        navigation.navigate('ListPostScreen');
    };
    
    
    let decodedToken;
    try {
        const trimmedToken = userProfile.token;
        decodedToken = jwtDecode(trimmedToken);


        // console.log(decodedToken.id);
    } catch (error) {
        console.log('Error decoding token:', error);
    }
    
    console.log('profile', decodedToken);
    

    return (
        <ScrollView style={styles.container}>
            <Mymodal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleEditProfile={handleEditProfile}
                handleListePoste={handleListePoste}
                userId={userId}
            />
            <View style={{
                flex: 0.5, backgroundColor: '#212121', paddingTop: 42, paddingRight: 32, justifyContent: 'flex-start',
                alignItems: 'flex-end', height: 260, 
                
            }}
               
            
            >
                <View style={{ flexDirection: 'row', gap: 42, padding: 12 }} >
                <TouchableOpacity onPress={logout}>
                    <FontAwesome name='power-off' color='white' size={15} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}  style={{backgroundColor: 'white', borderRadius: 50, width: 25, height:25, justifyContent: 'center', alignItems: 'center' }} >
                        <FontAwesome name='ellipsis-v' color='pink' size={15} />
                    </TouchableOpacity>
                </View>
            </View>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </View>
            ) : error ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Error fetching user profile</Text>
                </View>
            ) : (
                <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                         <Image
                                    source={{ uri: decodedToken.image }}
                            style={{ width: 100, height: 100, borderRadius: 100 / 2, borderWidth: 3, borderColor: '#FFFFFF', position: 'absolute', bottom: 62, zIndex: 2 }}
                        /> 
                    </View>
                            <View style={{ marginTop: 20 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                                <Text style={{ fontWeight: 'bold', fontSize: 25, textAlign: 'center', paddingBottom: 22 }}>{decodedToken ? decodedToken.nom : 'logout'} {decodedToken ? decodedToken.prenom : 'logout'}</Text>
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', paddingBottom: 12, fontSize: 18 }}>Description:</Text>
                                <Text style={{ textAlign: 'left' }}>{ decodedToken ? decodedToken.description : 'non défini'}</Text>
                    </View>
                   
                            
                </View>
            )}
            
            <View style={styles.postes}>
                
                <Text style={styles.postestitle}>Mes postes</Text>
                
                {/* postes */}
                
                 <PhotoContainer userId={ userId} navigation={navigation} /> 
                
                {/* postes */}
                
                
            </View>
          
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    commandButton: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: 200,
        flexDirection: 'row',
        gap: 12,
    },
    panelButtonTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
  
    postestitle: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 22,
        textAlign: 'center',
    }
    
});

export default ProfileScreen;
