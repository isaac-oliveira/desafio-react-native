import React from 'react'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors, Images } from '../Themes'

const Search = ({ onBack, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={onBack}>
        <Image source={Images.voltar} />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Image style={styles.searchImg} source={Images.search.white} />
        <TextInput style={styles.input} placeholder='Buscar' value={value} onChangeText={onChangeText} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnBack: {
    padding: 10
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: Colors.c200,
    borderRadius: 50
  },
  searchImg: {
    margin: 10
  },
  input: {
    flex: 1,
    marginRight: 20,
    color: Colors.a420
  }
})

export default Search
