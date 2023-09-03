import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Header = ({navigation}) => {
    return (
        <LinearGradient colors={['white', 'white']} start={[0,2]} end={[1,1]} >
      <View style={{ marginHorizontal: 32, paddingVertical: 34 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableOpacity style={styles.check} onPress={() => { navigation.goBack() }}>
                        < AntDesign name='arrowleft' color='black' size={25} />
                    </TouchableOpacity>
                    <FontAwesome name='ellipsis-v' color='black' size={25} style={{fontWeight: 200}}  />
                </View>
                <View style={styles.imageContainer}>
                    <View>
                      
                    </View>
                </View>
            </View>
            
           
            
            
        </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});

export default Header