import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors, Images } from '../Themes'

const EmptySearchList = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.search['46px']} />
      <Text style={styles.title}>Nenhum resultado</Text>
      <Text style={styles.subtitle}>Tente buscar por outro termo{'\n'}ou parte da palavra.</Text>
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
    fontWeight: 'bold',
    marginTop: 20
  },
  subtitle: {
    fontSize: 16,
    color: Colors.c300,
    textAlign: 'center'
  }
})
export default EmptySearchList
