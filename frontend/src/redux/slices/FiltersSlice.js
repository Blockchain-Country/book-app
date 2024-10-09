import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
}

const filtersSlice = createSlice({
  name: 'FILTER',
  initialState,
  reducers: {
    SET_TITLE_FILTER: (state, action) => {
      return { ...state, title: action.payload }
    },
  },
})

export const { SET_TITLE_FILTER } = filtersSlice.actions

export const selectTitleFilter = (state) => state.filters.title

export default filtersSlice.reducer
