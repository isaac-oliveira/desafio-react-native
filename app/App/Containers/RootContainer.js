// @flow
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import AppNavigation from '../Navigation/AppNavigation'

const RootContainer = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  )
}

export default RootContainer
