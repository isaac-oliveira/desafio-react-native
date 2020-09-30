// @flow
import { combineReducers } from 'redux'
import { updateReducers } from '../Config/ReduxPersist'
import configureStore from './SetupStore'

// import Types
import type { State as ToDoUIState } from '../Features/ToDo/Redux/Ui'
import type { State as ToDoEntityState } from '../Features/ToDo/Redux/Entity'

import ui from './Ui'
import toDo from './ToDo'

const rootReducer = combineReducers({
  ui,
  toDo
})

export default () => {
  const store = configureStore({ rootReducer })
  const persistor = updateReducers(store)

  return { store, persistor }
}

export type GlobalState = {
  ui: {
    toDos: ToDoUIState
  },
  entities: {
    toDos: ToDoEntityState
  }
}
