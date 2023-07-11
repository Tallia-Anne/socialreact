import React from 'react';

import {  StyleSheet, TouchableOpacity, Text } from 'react-native';

const Btn = ({ bgColor, btnLabel, textColor, Press }) => {
    return (
        <TouchableOpacity
            onPress={Press}
            style={{
                backgroundColor: bgColor,
                borderRadius: 100,
                alignItems: 'center',
                width: 250,
                paddingVertical: 5,
                marginVertical:10,
            }}>
            <Text style={{ color: textColor, fontSize: 25, fontWeight: 'bold'}}>{btnLabel}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default Btn;
