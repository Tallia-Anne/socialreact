import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { Alert } from 'react-native';
export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const register = (email, password) => {
        // setIsLoading(true);
        axios.post(`${BASE_URL}/users/register`, {
            email,
            password
        })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                // setIsLoading(false)
                console.log(userInfo);
                navigation.navigate('LoginScreen');
            })
            .catch(e => {
                console.log(`register error ${e}`);
                setIsLoading(false)
            })
    }
    
    const login = (email,password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/users/login`, {
            email, password
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setIsLoading(false)
           
        }).catch(e => {
            console.log(`login error ${e}`);
            setIsLoading(false)
        });       
       
        
    }
    
    const logout = () => {
        setUserInfo({});
        AsyncStorage.removeItem('userInfo');
        Alert.alert('Déconnexion', 'Vous avez été déconnecté avec succès.');
    }
    
    // console.log(userInfo);
    return(
        <AuthContext.Provider
            value={{
                isLoading,
                register,
                login,
                userInfo,
                logout,
            }}>
        {children}
        </AuthContext.Provider>
    );
    
};