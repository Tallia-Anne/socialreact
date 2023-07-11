import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { WelcomeScreen } from '../screens';
import { Foundation as FoundationIcons } from 'react-native-vector-icons';
const Tabs = createBottomTabNavigator();

const NavigationTabs = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="HomeScreen"

                component={HomeScreen}
                options={
                    {

                        tabBarlabel: "Accueil",
                        tabBarActibeTinColor: "#333",
                        tabBarInactiveTintColor: "#888",
                        title: "Accueil",
                        tabBarIcon: ({ color, size }) => (
                            <FoundationIcons name="home" color={color} size={size} />)
                    }
                }
            />
           
           

            <Tabs.Screen
                name="ProfileScreen"

                component={ProfileScreen}
                options={
                    {

                        tabBarlabel: "Profile",
                        tabBarActibeTinColor: "#333",
                        tabBarInactiveTintColor: "#888",
                        title: "Profile",
                        tabBarIcon: ({ color, size }) => (
                            <FoundationIcons name="widget" color={color} size={size} />)
                    }
                }
            />
            <Tabs.Screen
                name="WelcomeScreen"

                component={WelcomeScreen}
                options={
                    {

                        tabBarlabel: "WelcomeScreen",
                        tabBarActibeTinColor: "#333",
                        tabBarInactiveTintColor: "#888",
                        title: "Welcome",
                        tabBarIcon: ({ color, size }) => (
                            <FoundationIcons name="widget" color={color} size={size} />)
                    }
                }
            />

        </Tabs.Navigator>
    );
}

const styles = StyleSheet.create({})

export default NavigationTabs;