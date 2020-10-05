import React from 'react'
import { Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { actions as SearchActions } from '../Redux/Search'

import { Colors, Images } from '../Themes'

const { height } = Dimensions.get('screen')

type Props = {
  onBack(): void,
  value: string
}

const Search = ({ onBack, value }: Props) => {
  const dispatch = useDispatch()

  function onPress () {
    if (onBack) {
      onBack()
    }
    dispatch(SearchActions.updateQuery(''))
  }

  function onChangeText (value: String) {
    dispatch(SearchActions.updateQuery(value))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={onPress}>
        <Image source={Images.back} />
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
    height: height * 0.075,
    flexDirection: 'row',
    justifyContent: 'center',
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
