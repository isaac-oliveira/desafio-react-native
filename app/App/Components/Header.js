import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import moment from 'moment'

import { Images } from '../Themes'
import Search from './Search'

const Header = ({ searchMode, searchModeShow, searchModeHide, onChangeQuery }) => {
  if (searchMode) {
    return <Search onBack={searchModeHide} onChangeText={onChangeQuery} />
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerTitle}>Hoje</Text>
        <Text style={styles.headerSubtitle}>{moment().format('dddd, DD [de] MMMM')}</Text>
      </View>
      <TouchableOpacity style={styles.btnSearch} onPress={searchModeShow}>
        <Image source={Images.search['24px']} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.a420
  },
  headerSubtitle: {
    fontSize: 18,
    color: Colors.c500
  },
  btnSearch: {
    padding: 15,
    backgroundColor: Colors.a420,
    borderRadius: 50
  }
})

export default Header
