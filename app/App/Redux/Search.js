// @flow
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type State = {
  query: ?string
}

const INITIAL_STATE: State = {
  query: ''
}

const searchSlice = createSlice({
  name: 'search',
  initialState: INITIAL_STATE,
  reducers: {
    updateQuery: (state: State, action: PayloadAction) => ({
      ...state,
      query: action.payload
    })
  }
})

export const { actions } = searchSlice

export default searchSlice.reducer
