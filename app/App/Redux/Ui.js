// @flow
import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  fetching: true,
  error: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: INITIAL_STATE,
  reducers: {
    request: state => ({
      ...state,
      fetching: true,
      error: false
    }),
    error: state => ({
      ...state,
      fetching: false,
      error: true
    }),
    success: state => ({
      ...state,
      fetching: false,
      error: false
    })
  }
})

export const { actions } = uiSlice

export default uiSlice.reducer
