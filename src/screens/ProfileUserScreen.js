import React, {  useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { PhotoContainer } from '../components';
import Header from '../components/Header';


const ProfileUserScreen = ({ navigation, route }) => {
    
   const { user } = route.params;
    // console.log(user);
   
   
 
   
    
    
    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     setTimeout(() => {
    //         setRefreshing(false);
    //     }, 2000);
    // }, []);
    
    
  

   

  
    
   
    

    return (
        <ScrollView style={styles.container}>
            <Header navigation={navigation} />
            <View style={{
                flex: 0.5, backgroundColor: '#212121', paddingTop: 42, paddingRight: 32, justifyContent: 'flex-start',
                alignItems: 'flex-end', height: 260, 
                
            }}
               
            
            >
                <View style={{ flexDirection: 'row', gap: 42, padding: 12 }} >
               
                </View>
            </View>
           
           
                <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {user.image ? (
                        <Image
                            source={{ uri: user.image }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.placeholderImage} />
                    )}
                    </View>
                            <View style={{ marginTop: 20 }}  >
                                <Text style={{ fontWeight: 'bold', fontSize: 25, textAlign: 'center', paddingBottom: 22 }}>{user.nom} {user.prenom} </Text>
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', paddingBottom: 12, fontSize: 18 }}>Description:</Text>
                        <Text style={{ textAlign: 'left' }}>Description text</Text>
                    </View>
                   
                            
                </View>
          
            
            <View style={styles.postes}>
                
                <Text style={styles.postestitle}>Mes postes</Text>
                
                
                
                 <PhotoContainer userId={user.id} navigation={navigation} />  
                
              
                
                
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
    },
     profileHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }, profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        position: 'absolute',
        bottom: 62,
        zIndex: 2,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'lightgray', // Change to any color you prefer
        position: 'absolute',
        bottom: 62,
        zIndex: 2,
    },
    profileTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: 22,
    },
});

export default ProfileUserScreen;
