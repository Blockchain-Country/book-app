import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  author: '',
  onlyFavorite: false,
}

const filtersSlice = createSlice({
  name: 'FILTER',
  initialState,
  reducers: {
    SET_TITLE_FILTER: (state, action) => {
      return { ...state, title: action.payload }
    },
    SET_AUTHOR_FILTER: (state, action) => {
      return { ...state, author: action.payload }
    },
    SET_ONLY_FAVORITE: (state) => {
      state.onlyFavorite = !state.onlyFavorite
    },
    RESET_FILTERS: () => {
      return initialState
    },
  },
})

export const {
  SET_TITLE_FILTER,
  SET_AUTHOR_FILTER,
  SET_ONLY_FAVORITE,
  RESET_FILTERS,
} = filtersSlice.actions

export const selectTitleFilter = (state) => state.filters.title
export const selectAuthorFilter = (state) => state.filters.author
export const selectOnlyFavoriteFilter = (state) => state.filters.onlyFavorite

export default filtersSlice.reducer
