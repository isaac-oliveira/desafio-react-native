import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import RootContainer from './App/Containers/RootContainer'
import configureStore from './App/Redux'

import StorybookUI from './storybook'
import Config from './App/Config/DebugConfig'
import SplashScreen from './App/Containers/SplashScreen'
import { Colors } from './App/Themes'

const { store, persistor } = configureStore()

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={Colors.a120} />
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<SplashScreen />}>
          <RootContainer />
        </PersistGate>
      </Provider>
    </>
  )
}

if (__DEV__) {
  import('./App/Config/ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

export default Config.useStorybook ? StorybookUI : App
