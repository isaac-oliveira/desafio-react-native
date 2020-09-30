import { call, put } from 'redux-saga/effects'

import { actions as ToDosActions } from '../Redux/ToDo'
import { actions as UiActions } from '../Redux/Ui'
import { Api } from '../Services/Api'
import { PayloadAction } from '@reduxjs/toolkit'

export function * getToDos (api: Api, action: PayloadAction) {
  const type = action.payload

  let response = null
  if (type === 'all') {
    response = yield call(api.getToDos)
  } else {
    response = yield call(api.getFilteredToDos, type)
  }
  if (!response.ok) {
    yield put(UiActions.error())
    return
  }

  yield put(UiActions.success())
  yield put(ToDosActions.setToDos(response.data))
}

export function * toggleToDo (api: Api, action: PayloadAction) {
  const item = action.payload

  const response = yield call(api.toggleToDo, item)

  if (response.ok) {
    yield put(ToDosActions.toggleToDo(item))
  }
}
