import { configureStore } from '@reduxjs/toolkit'
import booksListReducer from './books/Reducer.js'

const store = configureStore({
  reducer: {
    booksList: booksListReducer,
  },
})
export default store
