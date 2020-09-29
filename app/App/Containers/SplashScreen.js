import React from 'react'
import { StyleSheet, Image } from 'react-native'
import DefaultBackground from '../Components/DefaultBackground'
import { Images } from '../Themes'

const SplashScreen = () => {
  return (
    <DefaultBackground style={styles.container}>
      <Image style={styles.img} source={Images.toDo} />
    </DefaultBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SplashScreen
