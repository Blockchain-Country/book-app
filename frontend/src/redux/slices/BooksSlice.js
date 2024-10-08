import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const booksSlice = createSlice({
  name: 'BOOKS',
  initialState,
  reducers: {
    ADD_BOOK: (state, action) => {
      state.push(action.payload)
    },
    DELETE_BOOK: (state, action) => {
      return state.filter((book) => book.id !== action.payload)
    },
    TOGGLE_FAVORITE: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite
        }
      })
    },
  },
})

export const { ADD_BOOK, DELETE_BOOK, TOGGLE_FAVORITE } = booksSlice.actions

export const selectBook = (state) => state.booksList

export default booksSlice.reducer
