import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.container} >
            <Text>Profile</Text>
        </View>
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

export default ProfileScreen;