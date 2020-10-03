// @flow
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistReducer } from 'redux-persist'

import Reactotron from '../Config/ReactotronConfig'
import Config from '../Config/DebugConfig'
import persistConfig from '../Config/ReduxPersist'

import type { Reducer } from './Entities'
import rootSaga from '../Sagas'

type Configuration = {
  rootReducer: Reducer<any>
}

export default ({ rootReducer }: Configuration) => {
  const sagaMonitor = Config.useReactotron ? Reactotron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

  const store = configureStore({
    reducer: persistReducer(persistConfig.storeConfig, rootReducer),
    middleware: [sagaMiddleware],
    enhancers: Config.useReactotron ? [Reactotron.createEnhancer()] : null
  })

  sagaMiddleware.run(rootSaga)

  return store
}
