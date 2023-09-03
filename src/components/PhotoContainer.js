import React, {  useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import CardPost from './CardPost';
import { BASE_URL } from '../config';


const PhotoContainer = ({userId, navigation}) => {
   
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/postes/afficher/${userId}`);
            console.log('response.data', response.data);
            setData(response.data.postes);
            setLoading(false);
            console.log(response.data.postes);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
            setLoading(false);
        }
    };

       return (
           <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
               {loading ? (
                   <Spinner visible={true} textContent={'Chargement...'} textStyle={styles.spinnerText} />
               ) : (
                   data.length > 0 ? (
                       data.map((photo) => (
                           <TouchableOpacity key={photo.id} onPress={() => navigation.navigate('Photodetails', { photo })} >
                               <CardPost photo={photo}  />
                           </TouchableOpacity>
                       ))
                   ) : (
                       <Text>Aucune donnée trouvée</Text>
                   )
               )}

           </View>
    );
}

const styles = StyleSheet.create({
 
    spinnerText: {
        color: '#FFF',
    },
});

export default PhotoContainer;
