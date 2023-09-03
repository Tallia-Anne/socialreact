import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
const searchphoto = require('../assets/search.jpg');
import axios from 'axios';
import { BASE_URL } from '../config';
import { Card } from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-loading-spinner-overlay';

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/postes/all`);
        console.log("response.data", response.data);
        const modifiedData = response.data.postes.splice(0, 10).filter((el) => {
          return el.nom.includes(search);
        });
        setFilteredPhotos(modifiedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos from API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  
  

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={searchphoto} style={styles.image}>
        <Text style={styles.texttitle}>Quelle envie ?</Text>
      </ImageBackground>
    
      <TextInput
        placeholder='Barre de recherche'
        style={styles.input}
        keyboardType='default'
        onChangeText={text => setSearch(text)} 
        value={search}
      />
      <AntDesign name="search1" color='white' size={22} style={styles.icone} />
      <View style={styles.photoContainer}>
        {loading ? (
          <Spinner visible={true} textContent={'Chargement...'} textStyle={styles.spinnerText} />
        ) : (
          filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo) => (
              <TouchableOpacity
                style={styles.cardContainer}
                key={photo.id}
              >
                <Card photo={photo} onPress={() => navigation.navigate('Photodetails', { photo })}
                 />
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
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginLeft: 22,
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 25,
    backgroundColor: 'rgba(151, 157, 215, 0.39)',
    padding: 10,
    borderWidth: 0,
    borderColor: "transparent"
  },
  
  icone: {
    position: 'absolute',
    top: 430,
    left: 310,
  },
  
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  texttitle: {
    fontSize: 26,
    color: 'white',
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardContainer: {
    margin: 8,
  },
  spinnerText: {
    color: '#FFF',
  },
});

export default SearchScreen;
