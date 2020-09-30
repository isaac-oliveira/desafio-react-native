import { all, takeLatest } from 'redux-saga/effects'

import { actions as UiActions } from '../Redux/Ui'
import Api from '../Services/Api'

import { getToDos } from './ToDo'

const api = Api.create()

export default function * root () {
  yield all([takeLatest(UiActions.request, getToDos, api)])
}
