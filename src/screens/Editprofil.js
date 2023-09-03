import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components';

const Editprofil = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const [image, setImage] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch user data using the id and update the state variables
    fetch(`${BASE_URL}/users/profile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNom(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
        setImage(data.image); // Assuming you get the image path from the server
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async () => {
    const apiUrl = `${BASE_URL}/users/update/${id}`;

    try {
      // Send user data to the server for updating the profile
      const userData = {
        image, // Use the new image path if provided, otherwise use the existing image path
        nom,
        prenom,
        email,
      };

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data);

      // You can navigate to the profile screen or perform other actions after a successful update
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    console.log(image);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <View style={{ margin: 50 }}>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Nom"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={nom}
            onChangeText={(text) => setNom(text)}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Prenom"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={prenom}
            onChangeText={(text) => setPrenom(text)}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Add a new TextInput for the new image path */}
        <View style={styles.action}>
          <FontAwesome name="image" size={20} />
          <TextInput
            placeholder="Chemin d'accès de l'image"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={image}
            onChangeText={(text) => setImage(text)}
          />
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
          <Text style={styles.panelButtonTitle}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: '#333333',
  },
});

export default Editprofil;
