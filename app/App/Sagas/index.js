import { all } from 'redux-saga/effects'

import Api from '../Services/Api'

import { getToDos, toggleToDo, createToDo, updateToDo, deleteToDo, refreshToDos } from './ToDoSagas'

const api = Api.create()

export default function* root() {
  yield all([getToDos(api), refreshToDos(api), toggleToDo(api), createToDo(api), updateToDo(api), deleteToDo(api)])
}
