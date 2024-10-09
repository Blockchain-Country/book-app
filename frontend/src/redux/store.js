import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/BooksSlice.js'
import filtersReducer from './slices/FiltersSlice.js'

const store = configureStore({
  reducer: {
    booksList: booksReducer,
    filters: filtersReducer,
  },
})
export default store
