import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Button, Text, Dimensions, ScrollView, ImageBackground, Pressable } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isLoading, register} = useContext(AuthContext)
   

    return (
         // container
        <ScrollView style={{ flex: 1, backgroundColor: '#ffffffff' }}
            showsHorizontalScrollIndicator={false}
            
        > 
            {/* image */}
            <ImageBackground
                source={require('../assets/font.jpg')}
                style={{height:Dimensions.get('window').height /2.5,}}
            >
               
            </ImageBackground>
            {/* image */}
            {/* FormulaireContainer */}
            <View style={styles.bottomView}>
                <View style={{ padding: 40 }}>
                    
                    <Text style={{ color: '#4632A1', fontSize: 26 }}>Inscription du compte</Text>
                  
                    
                    {/* Formulaire */}
                    <View style={styles.formFormulaire}>
                        <View style={styles.inputForm}>
                        <Text aria-label="Label for Email" nativeID="label Email" style={styles.label}>Email :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Adresse e-mail"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            />
                        </View>
                        <View style={styles.inputForm}>
                        <Text aria-label="Label for Email" nativeID="label Email" style={styles.label}>Mot de passe :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            secureTextEntry
                            value={password}
                            onChangeText={text => setPassword(text)}
                            />
                        </View>
                       
                        <Button title="S'inscrire" color="#841584" onPress={() => register(email, password)}  />
                        
                    </View>
                    {/* Formulaire */}
                    
                </View>
            </View>
            {/* FormulaireContainer */}
            
        </ScrollView>
        // container
    );
};

const styles = StyleSheet.create({
    brandView: {
        justifyContent: 'center',
        alignItems:'center',
        flex: 1,
    },
    brandViewText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }, 
    bottomView: {
        flex: 1.5,
        backgroundColor: '#ffffff',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        
    },
    
  
    formFormulaire: {
        marginTop: 50,
        width: '100%',       
    },
    label: {
        marginBottom: 12,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 50,
        marginBottom: 25,
        backgroundColor: 'rgba(151, 157, 215, 0.39)',
        padding: 10,
        borderWidth: 0, borderColor: "transparent"
    },
    registerText: {
        fontSize: 16,
        color: 'blue',
        marginBottom: 20,
    },
    
    buttonlogin: {
        width: 230,
        height: 51,
        flexShrink: 0,
        boxShadow: '0px 4px 4px 0px #816BDB',
        borderRadius: 18,
        marginBottom: 20,
    }
   
});

export default RegisterScreen;
