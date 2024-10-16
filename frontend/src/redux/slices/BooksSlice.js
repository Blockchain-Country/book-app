import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import createBook from '../../utils/CreateBook.js'
import { SET_ERROR } from './ErrorSlice.js'

const initialState = []

export const fetchBookApi = createAsyncThunk(
  'BOOK/FETCH_API',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      thunkAPI.dispatch(SET_ERROR(error.message))
      throw error
    }
  }
)

export const fetchBookGoogle = createAsyncThunk(
  'BOOK/FETCH_GOOGLE',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url)
      const items = res.data.items

      if (!items || items.length === 0) {
        throw new Error('No books found')
      }
      const randomIndex = Math.floor(Math.random() * items.length)
      const randomBook = items[randomIndex].volumeInfo

      const title = randomBook.title || 'Unknown Title'
      const year = randomBook.publishedDate
        ? randomBook.publishedDate.split('-')[0]
        : 'Unknown Year'
      const author = randomBook.authors
        ? randomBook.authors[0]
        : 'Unknown Author'
      const description = randomBook.description || 'No description available'
      const image = randomBook.imageLinks?.thumbnail || ''

      return { title, year, author, description, image }
    } catch (error) {
      thunkAPI.dispatch(SET_ERROR(error.message))
      throw error
    }
  }
)

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
  extraReducers: (builder) => {
    builder.addCase(fetchBookApi.fulfilled, (state, action) => {
      if (
        action.payload.title &&
        action.payload.author &&
        action.payload.year
      ) {
        state.push(createBook(action.payload))
      }
    })

    builder.addCase(fetchBookGoogle.fulfilled, (state, action) => {
      if (
        action.payload.title &&
        action.payload.author &&
        action.payload.year &&
        action.payload.description &&
        action.payload.image
      ) {
        state.push(createBook(action.payload))
      }
    })
  },
})

export const { ADD_BOOK, DELETE_BOOK, TOGGLE_FAVORITE } = booksSlice.actions

export const selectBook = (state) => state.booksList

export default booksSlice.reducer
