import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Colors, Images } from '../Themes'

const ListToDoEmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.sun} />
      <Text style={styles.title}>Tudo limpo!</Text>
      <Text style={styles.subtitle}>Adicione um novo lembrete{'\n'}tocando no ‘+’.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 21,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    color: Colors.c300,
    textAlign: 'center'
  }
})

export default ListToDoEmptyComponent
