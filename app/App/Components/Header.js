import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import moment from 'moment'

import useAnimation, { AnimationStyle } from '../Hooks/useAnimation'
import { Images, Colors } from '../Themes'
import Search from './Search'
import Animated from 'react-native-reanimated'

const Header = ({ searchMode, searchModeShow, searchModeHide }) => {
  const [showSearch, setShowSearch] = useState(searchMode)

  const searchAnim = useAnimation({
    duration: 250,
    autoPlay: false,
    animationStyle: searchAnimationStyle
  })

  const headerAnim = useAnimation({
    duration: 250,
    autoPlay: false,
    animationStyle: headerAnimationStyle
  })

  useEffect(() => {
    if (searchMode) {
      headerAnim.startAnim(() => {
        setShowSearch(searchMode)
        searchAnim.startAnim()
      })
    } else {
      searchAnim.resetAnim(() => {
        setShowSearch(searchMode)
        headerAnim.resetAnim()
      })
    }
  }, [searchAnim, headerAnim, searchMode])

  if (showSearch) {
    return (
      <Animated.View style={searchAnim.animStyle.searchContainerAnim}>
        <Search onBack={searchMode ? searchModeHide : searchModeShow} />
      </Animated.View>
    )
  }

  return (
    <Animated.View style={headerAnim.animStyle.headerContainerAnim}>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTitle}>Hoje</Text>
          <Text style={styles.headerSubtitle}>{moment().format('dddd, DD [de] MMMM')}</Text>
        </View>
        <TouchableOpacity style={styles.btnSearch} onPress={searchModeShow}>
          <Image source={Images.search['24px']} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
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

const searchAnimationStyle: AnimationStyle = anim => ({
  searchContainerAnim: {
    flex: 1,
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1]
    })
  }
})

const headerAnimationStyle: AnimationStyle = anim => ({
  headerContainerAnim: {
    flex: 1,
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.2]
    })
  }
})

export default Header
