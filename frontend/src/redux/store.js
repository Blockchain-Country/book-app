import { configureStore } from '@reduxjs/toolkit'
import booksSlice from './slices/BooksSlice.js'
const store = configureStore({
  reducer: {
    booksList: booksSlice,
  },
})
export default store
