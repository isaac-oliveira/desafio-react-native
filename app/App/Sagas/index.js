import { all } from 'redux-saga/effects'

import { getToDos, toggleToDo, createToDo, updateToDo, deleteToDo, refreshToDos } from './ToDoSagas'

export default function * root () {
  yield all([getToDos(), refreshToDos(), toggleToDo(), createToDo(), updateToDo(), deleteToDo()])
}
