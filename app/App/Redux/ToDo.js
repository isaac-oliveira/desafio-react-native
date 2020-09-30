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
    })
  }
})

export const { actions } = toDoUiSlice

export default toDoUiSlice.reducer
