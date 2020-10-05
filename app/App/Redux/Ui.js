// @flow
import { createSlice } from '@reduxjs/toolkit'

export type State = {
  fetching: boolean,
  error: boolean
}

const INITIAL_STATE: State = {
  fetching: true,
  error: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: INITIAL_STATE,
  reducers: {
    request: (state: State) => ({
      ...state,
      fetching: true,
      error: false
    }),
    error: (state: State) => ({
      ...state,
      fetching: false,
      error: true
    }),
    success: (state: State) => ({
      ...state,
      fetching: false,
      error: false
    })
  }
})

export const { actions } = uiSlice

export default uiSlice.reducer
