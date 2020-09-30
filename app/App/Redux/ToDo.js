// @flow
import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  data: []
}

const toDoUiSlice = createSlice({
  name: 'toDo',
  initialState: INITIAL_STATE,
  reducers: {
    setToDos: (state, action) => ({
      ...state,
      data: action.payload
    }),
    requestToggleToDo: state => ({
      ...state
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

export const { actions } = toDoUiSlice

export default toDoUiSlice.reducer
