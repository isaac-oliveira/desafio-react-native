// @flow
import { combineReducers } from 'redux'
import { updateReducers } from '../Config/ReduxPersist'
import configureStore from './SetupStore'

// import Types
import type { State as UIState } from './Ui'
import type { State as ToDoState } from './ToDo'
import type { State as SearchState } from './Search'

import ui from './Ui'
import toDo from './ToDo'
import search from './Search'

const rootReducer = combineReducers({
  ui,
  toDo,
  search
})

export default () => {
  const store = configureStore({ rootReducer })
  const persistor = updateReducers(store)

  return { store, persistor }
}

export type GlobalState = {
  ui: UIState,
  toDo: ToDoState,
  search: SearchState
}
