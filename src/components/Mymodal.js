import React from 'react'
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Mymodal = ({ isModalOpen, setIsModalOpen, handleEditProfile, handleListePoste,  }) => {
  return (
    <>
          <Modal
              visible={isModalOpen}
              transparent={true}
              animationType={"slide"}
          >
              
              <View style={styles.modalContainerStyle}>
                  <View style={styles.modalStyle} >
                      <Text style={styles.titleStyle}> Parametre </Text>
                      
                      <TouchableOpacity onPress={() => setIsModalOpen(!setIsModalOpen)} style={styles.close} >
                          <FontAwesome name='close' color='black' size={15} />
                      </TouchableOpacity>
                     
                      
                     
                      
                      <TouchableOpacity style={styles.button} onPress={ handleEditProfile}>
                          <Text>Modifier son profil</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.button} onPress={handleListePoste} >
                          <Text>La liste des postes </Text>
                      </TouchableOpacity>
                      
                  </View>
              </View>
              
          </Modal>
    </>
  )
}

const styles = StyleSheet.create({
    modalContainerStyle: {
        flex: 1,
        justifyContent: 'flex-end',
      
    },
   
    modalStyle: {
        backgroundColor: 'white',
        
        height: 250,
        position: 'relative',
        alignItems: 'center',
        margin: 20,
        borderRadius: 16,
        paddingHorizontal: 30,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
  
    close: {
        position: 'absolute',
        right: 12,
       top:10,
    },
    
    titleStyle : {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 32,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: 'pink',
        marginBottom: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }

});

export default Mymodal