import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import moment from 'moment'

import Search from './Search'

import useAnimation, { AnimationStyle } from '../Hooks/useAnimation'

import { Images, Colors } from '../Themes'

const Header = ({ style, animStyle, searchMode, searchModeShow, searchModeHide }) => {
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

  return (
    <Animated.View style={[style, animStyle]}>
      {showSearch && (
        <Animated.View style={searchAnim.animStyle.searchContainerAnim}>
          <Search onBack={searchMode ? searchModeHide : searchModeShow} />
        </Animated.View>
      )}
      {!showSearch && (
        <Animated.View style={[styles.headerExpanded, headerAnim.animStyle.headerContainerAnim]}>
          <View>
            <Text style={styles.headerTitle}>Hoje</Text>
            <Text style={styles.headerSubtitle}>{moment().format('dddd, DD [de] MMMM')}</Text>
          </View>
          <TouchableOpacity style={styles.btnSearch} onPress={searchModeShow}>
            <Image source={Images.search['24px']} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  headerExpanded: {
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
      outputRange: [0.3, 1]
    })
  }
})

const headerAnimationStyle: AnimationStyle = anim => ({
  headerContainerAnim: {
    flex: 1,
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.3]
    })
  }
})

export default Header
