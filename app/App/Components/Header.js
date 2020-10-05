import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native'
import type { ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import moment from 'moment'

import Search from './Search'

import useAnimation, { AnimationStyle } from '../Hooks/useAnimation'

import { Images, Colors } from '../Themes'

const { height } = Dimensions.get('screen')

type Props = {
  animStyle: ViewStyle,
  searchMode: boolean,
  searchModeShow(): void,
  searchModeHide(): void
}

const Header = ({ animStyle, searchMode, searchModeShow, searchModeHide }: Props) => {
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
    <Animated.View style={[styles.container, animStyle]}>
      {showSearch && (
        <Animated.View style={[styles.headerColapsed, searchAnim.animStyle.searchContainerAnim]}>
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
  container: {
    height: height * 0.3
  },
  headerColapsed: {
    height: height * 0.075
  },
  headerExpanded: {
    height: height * 0.3,
    padding: 30,
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
      outputRange: [0.1, 1]
    })
  }
})

const headerAnimationStyle: AnimationStyle = anim => ({
  headerContainerAnim: {
    flex: 1,
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.1]
    })
  }
})

export default Header
