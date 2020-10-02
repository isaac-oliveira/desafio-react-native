// @flow
import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  fetching: false,
  error: null,
  data: []
}

const toDoSlice = createSlice({
  name: 'toDo',
  initialState: INITIAL_STATE,
  reducers: {
    requestToggleToDo: state => ({
      ...state
    }),
    requestCreateToDo: state => ({
      ...state
    }),
    requestUpdateToDo: state => ({
      ...state
    }),
    requestDeleteToDo: state => ({
      ...state
    }),
    refreshToDos: state => ({
      ...state
    }),
    setToDos: (state, action) => ({
      ...state,
      data: action.payload
    }),
    toggleToDo: (state, action) => ({
      ...state,
      data: state.data.map(item => {
        if (item.id !== action.payload.id) {
          return item
        }

        return {
          ...item,
          isDone: !item.isDone
        }
      })
    })
  }
})

export const { actions } = toDoSlice

export default toDoSlice.reducer
