import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'

import { Images } from '../Themes'

const DefaultBackground = ({ children, style }) => {
  return (
    <ImageBackground style={[style, styles.container]} source={Images.appBackground}>
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default DefaultBackground
