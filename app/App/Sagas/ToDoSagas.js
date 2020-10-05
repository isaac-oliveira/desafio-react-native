import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'

import { actions as ToDosActions } from '../Redux/ToDo'
import { actions as UiActions } from '../Redux/Ui'

import Api from '../Services/Api'

const api = Api.create()

function * fetchToDos (action: PayloadAction) {
  const filter = action.payload

  let response = null
  if (filter === 'all' || filter === 'late') {
    response = yield call(api.getToDos)
  } else {
    response = yield call(api.getFilteredToDos, filter)
  }
  if (!response.ok) {
    yield put(UiActions.error())
    return
  }

  yield put(UiActions.success())

  if (filter === 'late') {
    const lates = response.data.filter(toDo => moment(toDo.reminder).isBefore(Date.now()) && !toDo.isDone)
    yield put(ToDosActions.setToDos(lates))

    return
  }

  yield put(ToDosActions.setToDos(response.data))
}

function * fetchToggleToDo (action: PayloadAction) {
  const item = action.payload
  yield put(ToDosActions.toggleToDo(item))

  yield call(api.toggleToDo, item)
}

function * fetchUpdateToDo (action: PayloadAction) {
  const { filter, item } = action.payload

  const response = yield call(api.putToDo, item)
  if (response.ok) {
    yield put(ToDosActions.refreshToDos(filter))
  }
}

function * fetchDeleteToDo (action: PayloadAction) {
  const { filter, item } = action.payload

  const response = yield call(api.deleteToDo, item.id)
  if (response.ok) {
    yield put(ToDosActions.refreshToDos(filter))
  }
}

function * fetchCreateToDo (action: PayloadAction) {
  const { filter, item } = action.payload

  const response = yield call(api.postToDo, { ...item, isDone: false, description: '' })
  if (response.ok) {
    yield put(ToDosActions.refreshToDos(filter))
  }
}

export function * createToDo (action: PayloadAction) {
  yield takeLatest(ToDosActions.requestCreateToDo, fetchCreateToDo)
}

export function * updateToDo (action: PayloadAction) {
  yield takeLatest(ToDosActions.requestUpdateToDo, fetchUpdateToDo)
}

export function * deleteToDo (action: PayloadAction) {
  yield takeLatest(ToDosActions.requestDeleteToDo, fetchDeleteToDo)
}

export function * toggleToDo (action: PayloadAction) {
  yield takeLatest(ToDosActions.requestToggleToDo, fetchToggleToDo)
}

export const refreshToDos = function * (action: PayloadAction) {
  yield takeLatest(ToDosActions.refreshToDos, fetchToDos)
}

export const getToDos = function * (action: PayloadAction) {
  yield takeLatest(UiActions.request, fetchToDos)
}
