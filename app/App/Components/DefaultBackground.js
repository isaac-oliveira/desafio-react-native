import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import type { ViewStyle } from 'react-native'

import { Images } from '../Themes'

type Props = {
  children: React.ReactNode,
  style: ViewStyle
}

const DefaultBackground = ({ children, style }: Props) => {
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
