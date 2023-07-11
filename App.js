import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen, RegisterScreen, ValideScreen, ForgotScreen, WelcomeScreen ,ProfileScreen, ChangePasswordScreen, HomeScreen } from './src/screens';
import { NavigationTabs } from './src/navigation';

const Stack = createStackNavigator();
export default function App() {
  
  
  
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShow: false }} >
        <Stack.Screen
          name="NavigationTabs"
          component={NavigationTabs}
          options={{ headerShown: false, }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}

        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}



        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}

        />
        <Stack.Screen
          name="ValideScreen"
          component={ValideScreen}

        />
        
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}

        />
       
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}

        />
        <Stack.Screen
          name="ForgotScreen"
          component={ForgotScreen}

        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}

        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}


