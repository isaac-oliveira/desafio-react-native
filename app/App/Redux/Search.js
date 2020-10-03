// @flow
import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
  query: ''
}

const searchSlice = createSlice({
  name: 'search',
  initialState: INITIAL_STATE,
  reducers: {
    updateQuery: (state, action) => ({
      ...state,
      query: action.payload
    })
  }
})

export const { actions } = searchSlice

export default searchSlice.reducer
