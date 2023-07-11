import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { Background, Btn } from '../components';
import {  green } from '../shared/theme/colors';


const WelcomeScreen = (props) => {
    return (
        <Background>
            <View style={{marginHorizontal: 40, marginVertical: 100}}>
            <Text style={{color:'white', fontSize: 54 }}>Let's start</Text>
                <Text style={{ color: 'white', fontSize: 54, marginBottom: 40 }}>Coding</Text>
                <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate('LoginScreen')} />
                <Btn bgColor='white' textColor='pink' btnLabel="Register" Press={() => props.navigation.navigate('RegisterScreen') } />
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default WelcomeScreen;
