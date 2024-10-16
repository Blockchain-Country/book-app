import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const errorSlice = createSlice({
  name: 'ERROR',
  initialState,
  reducers: {
    SET_ERROR: (state, action) => {
      return action.payload
    },
    CLEAR_ERROR: () => {
      return initialState
    },
  },
})

export const { SET_ERROR, CLEAR_ERROR } = errorSlice.actions

export const selectError = (state) => state.error

export default errorSlice.reducer
