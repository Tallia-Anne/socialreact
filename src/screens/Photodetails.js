import React, {useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Input } from '@rneui/themed';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ModalComments } from '../components';

const Photodetails = ({route, navigation}) => {
     const {photo} = route.params;
    // console.log(photo);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <ScrollView style={styles.wrap} >
            {/* start afficher tous les comments */}
            <ModalComments
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                photoId ={photo.id}
            /> 
            {/* end comments */}
            
            <Header navigation={navigation} />
            {/* start image */}
            {photo.Images && photo.Images.length > 0 && (
                photo.Images.map((image, index) => (
                    <ImageBackground key={index} source={{ uri: image.image }} style={styles.image} >
                                     
                    </ImageBackground>
                ))
            )}
            {/* end image */}
            <View style={styles.container}>
                <View style={styles.containerText} >
                <Text style={styles.title} >{photo.nom}</Text>
                </View>
                {/* start profileUserScreen diriction */}
                <View style={styles.containersectiondeux} >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProfileUserScreen',
                            { user: photo.User })}>
                        <Text style={styles.category} >{ photo.User ? photo.User.nom : 'nom défini'}</Text>
                        </TouchableOpacity>
                    <Text style={styles.date} >{photo.createdAt}</Text>
                </View>
                {/* end profileUserScreen diriction */}
               {/* start desc */}
                <View style={styles.containerText} >
                    <Text style={styles.desc} >{photo.description}</Text>
                </View>
                {/* end desc */}
            </View>
            {/* start button comments press */}
            <View style={styles.comments} >
                <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}>
                    <FontAwesome name='comments-o' color='black' size={35} />
                     <Text>Commentaires</Text>                  
                </TouchableOpacity>
            </View>
            {/* end button comments press */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    
    wrap: {
        width: '100%',
        backgroundColor: 'white',
        },
    
    image: {
        width: '100%',
        height: 350,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 12,
       
    },    
    container: {
        padding: 30,
        width: '100%',
        backgroundColor: 'white',
        marginVertical: -80,
        borderRadius: 73,
    },
    containerText: {
        paddingBottom: 32,
        
    },
  
    containersectiondeux: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 21,
    },

    check: {
        marginVertical: 42,
        marginHorizontal: 22,
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 160,
        elevation: 22,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    
    category: {
        fontWeight: 600,
        fontSize: 18,
        color: 'blue',
    },
     date: {
        fontSize: 18,
    }, desc: {
         lineHeight: 25,
    },
    comments: {
        flex: 1,
        flexDirection: 'row',
        padding: 22,
        gap: 12,
    }
   
   



    


})

export default Photodetails;
