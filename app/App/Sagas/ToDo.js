import { call, put } from 'redux-saga/effects'

import { actions as ToDosActions } from '../Redux/ToDo'
import { actions as UiActions } from '../Redux/Ui'
import { Api } from '../Services/Api'

export function * getToDos (api: Api, action) {
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
