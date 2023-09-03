import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen, RegisterScreen, ValideScreen, ForgotScreen, WelcomeScreen, ProfileScreen, Editprofil, ChangePasswordScreen, HomeScreen, Photodetails, ListPostScreen, ProfileUserScreen } from './src/screens';
import { NavigationTabs } from './src/navigation';
import { AuthProvider, AuthContext } from './src/context/AuthContext';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NavigationContainer>
  );
}

function AppContent() {
  const { userInfo } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {userInfo.token ? (
    
        <>
          <Stack.Screen
            name="NavigationTabs"
            component={NavigationTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Editprofil"
            component={Editprofil}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="Photodetails"
            component={Photodetails}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="ListPostScreen"
            component={ListPostScreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="ProfileUserScreen"
            component={ProfileUserScreen}
            options={{ headerShown: false }}
          />
        </>
        
        
      ) : (
          <>
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotScreen"
              component={ForgotScreen}
              options={{ headerShown: false }}

            />
            <Stack.Screen
              name="ChangePasswordScreen"
              component={ChangePasswordScreen}
              options={{ headerShown: false }}
            />
        </>
      )}
    </Stack.Navigator>
  );
}
