import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import { actions as ToDosActions } from '../Redux/ToDo'
import { actions as UiActions } from '../Redux/Ui'

import { Api } from '../Services/Api'

function * fetchToDos (api: Api, action: PayloadAction) {
  const { filter, query } = action.payload

  let response = null
  if (filter === 'all') {
    response = yield call(api.getToDos)
  } else {
    response = yield call(api.getFilteredToDos, filter)
  }
  if (!response.ok) {
    yield put(UiActions.error())
    return
  }

  if (query) {
    yield put(UiActions.success())
    yield put(
      ToDosActions.setToDos(response.data.filter(item => item.title.toLowerCase().includes(query.toLowerCase())))
    )
    return
  }

  yield put(UiActions.success())
  yield put(ToDosActions.setToDos(response.data))
}

function * fetchToggleToDo (api: Api, action: PayloadAction) {
  const item = action.payload
  yield put(ToDosActions.toggleToDo(item))

  yield call(api.toggleToDo, item)
}

function * fetchUpdateToDo (api: Api, action: PayloadAction) {
  const { filter, item } = action.payload

  const response = yield call(api.putToDo, item)
  if (response.ok) {
    yield put(ToDosActions.refreshToDos(filter))
  }
}

function * fetchDeleteToDo (api: Api, action: PayloadAction) {
  const { filter, item } = action.payload

  const response = yield call(api.deleteToDo, item.id)
  if (response.ok) {
    yield put(ToDosActions.refreshToDos(filter))
  }
}

function * fetchCreateToDo (api: Api, action: PayloadAction) {
  const { filter, item } = action.payload

  const response = yield call(api.postToDo, { ...item, isDone: false, description: '' })
  if (response.ok) {
    yield put(ToDosActions.refreshToDos(filter))
  }
}

export function * createToDo (api: Api, action: PayloadAction) {
  yield takeLatest(ToDosActions.requestCreateToDo, fetchCreateToDo, api)
}

export function * updateToDo (api: Api, action: PayloadAction) {
  yield takeLatest(ToDosActions.requestUpdateToDo, fetchUpdateToDo, api)
}

export function * deleteToDo (api: Api, action: PayloadAction) {
  yield takeLatest(ToDosActions.requestDeleteToDo, fetchDeleteToDo, api)
}

export function * toggleToDo (api: Api, action: PayloadAction) {
  yield takeLatest(ToDosActions.requestToggleToDo, fetchToggleToDo, api)
}

export const refreshToDos = function * (api: Api, action: PayloadAction) {
  yield takeLatest(ToDosActions.refreshToDos, fetchToDos, api)
}

export const getToDos = function * (api: Api, action: PayloadAction) {
  yield takeLatest(UiActions.request, fetchToDos, api)
}
