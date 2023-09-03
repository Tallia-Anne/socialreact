import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

import AntDesign from 'react-native-vector-icons/AntDesign';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import { AddPost } from '../screens';
const Tabs = createBottomTabNavigator();

const NavigationTabs = () => {
    const { userInfo } = useContext(AuthContext);
    // console.log(userInfo);
    // console.log(userInfo.token);

    let decodedToken;
    try {
        const trimmedToken = userInfo.token;
        decodedToken = jwtDecode(trimmedToken);


        // console.log(decodedToken.id);
    } catch (error) {
        console.log('Error decoding token:', error);
    }

    // Utilisez les informations extraites du jeton pour obtenir le nom de l'utilisateur
    const userName = decodedToken ? decodedToken.name : '';
    const userId = userInfo && userInfo.token ? jwtDecode(userInfo.token).id : null;
    // console.log('userId',userId);
    // console.log(decodedToken)
    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="HomeScreen"

                component={HomeScreen}
                options={
                    {
                        tabBarShowLabel: false,
                        tabBarlabel: "Accueil",
                        tabBarActibeTinColor: "#333",
                        tabBarInactiveTintColor: "#888",
                        title: "Accueil",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="home" color={color} size={size} />)
                    }
                }
            />
           
            <Tabs.Screen
                name="AddPost"

                component={AddPost}
                options={
                    {

                        tabBarShowLabel: false,
                        tabBarlabel: "AddPost",
                        tabBarActibeTinColor: "#333",
                        tabBarInactiveTintColor: "#888",
                        title: "AddPost",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="plus" color={color} size={size} />)
                    }
                }
            />

            <Tabs.Screen
                name="ProfileScreen"
                initialParams={userId ? { userId: userId } : null}
                component={ProfileScreen}
                options={
                    {
                        tabBarShowLabel: false,
                        tabBarlabel: "Profile",
                        tabBarActibeTinColor: "#333",
                        tabBarInactiveTintColor: "#888",
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="user" color={color} size={size} />)
                    }
                }
            />
            
            <Tabs.Screen
                name="SearchScreen"

                component={SearchScreen}
                options={
                    {
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarlabel: "Search",
                        tabBarActibeTinColor: "#333",
                        tabBarInactiveTintColor: "#888",
                        title: "Search",
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="search1" color={color} size={size} />)
                    }
                }
            />
           

        </Tabs.Navigator>
    );
}

const styles = StyleSheet.create({})

export default NavigationTabs;