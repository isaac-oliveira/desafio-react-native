import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../Themes'

const ErrorList = ({ onTryAgain }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opa!</Text>
      <Text style={styles.subtitle}>Tivemos um problema{'\n'}ao carregar seus lembretes.</Text>
      <TouchableOpacity style={styles.btn} onPress={onTryAgain}>
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
    padding: 5
  },
  btnText: {
    color: Colors.a220
  }
})

export default ErrorList
