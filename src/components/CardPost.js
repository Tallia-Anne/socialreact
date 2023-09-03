import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const CardPost = ({photo}) => {
  return (
    <View style={styles.item}>
      {/* Afficher les informations de Images s'il y en a */}
      {photo.Images && photo.Images.length > 0 && (
        photo.Images.map((image, index) => (
          <View key={index}>
            <Image source={{ uri: image.image }} style={styles.image} resizeMode="cover" />
           

          </View>
        ))
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  item: {
    fontSize: 12,
    color: 'white',
     margin: 2,
     padding: 2,
    width: 110,
    height: 120
  },
  image: {
    width: '100%',
    height: '100%',
    
  }
})

export default CardPost