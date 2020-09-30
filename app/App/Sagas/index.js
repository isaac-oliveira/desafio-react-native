import { all, takeLatest } from 'redux-saga/effects'

import { actions as UiActions } from '../Redux/Ui'
import { actions as ToDosActions } from '../Redux/ToDo'

import Api from '../Services/Api'

import { getToDos, toggleToDo } from './ToDoSagas'

const api = Api.create()

export default function * root () {
  yield all([takeLatest(UiActions.request, getToDos, api), takeLatest(ToDosActions.requestToggleToDo, toggleToDo, api)])
}
