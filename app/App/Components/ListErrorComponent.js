import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { Colors, Images } from '../Themes'

const ListErrorComponent = ({ onTryAgain }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opa!</Text>
      <Text style={styles.subtitle}>Tivemos um problema{'\n'}ao carregar seus lembretes.</Text>
      <TouchableOpacity style={styles.btn} onPress={onTryAgain}>
        <Image style={styles.btnImg} source={Images.try} />
        <Text style={styles.btnText}>Tentar novamente</Text>
      </TouchableOpacity>
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
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  btnImg: {
    marginRight: 5
  },
  btnText: {
    color: Colors.a220
  }
})

export default ListErrorComponent
