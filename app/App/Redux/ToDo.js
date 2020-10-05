// @flow
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ToDoType } from '../Entities/ToDo'

export type State = {
  data: ToDoType[]
}

const INITIAL_STATE: State = {
  data: []
}

const toDoSlice = createSlice({
  name: 'toDo',
  initialState: INITIAL_STATE,
  reducers: {
    requestToggleToDo: (state: State) => ({
      ...state
    }),
    requestCreateToDo: (state: State) => ({
      ...state
    }),
    requestUpdateToDo: (state: State) => ({
      ...state
    }),
    requestDeleteToDo: (state: State) => ({
      ...state
    }),
    refreshToDos: (state: State) => ({
      ...state
    }),
    setToDos: (state: State, action: PayloadAction) => ({
      ...state,
      data: action.payload
    }),
    toggleToDo: (state: State, action: PayloadAction) => ({
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
