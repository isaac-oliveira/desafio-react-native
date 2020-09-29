// @flow
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../Containers/HomeScreen'

const Stack = createStackNavigator()

function AppNavigation () {
  return (
    <Stack.Navigator initialRouteName='HomeScreen' headerMode='none'>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigation
