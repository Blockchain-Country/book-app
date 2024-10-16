import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/BooksSlice.js'
import filtersReducer from './slices/FiltersSlice.js'
import errorReducer from './slices/ErrorSlice.js'

const store = configureStore({
  reducer: {
    booksList: booksReducer,
    filters: filtersReducer,
    error: errorReducer,
  },
})
export default store
