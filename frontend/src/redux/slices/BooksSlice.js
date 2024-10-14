import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import createBook from '../../utils/CreateBook.js'

const initialState = []

export const fetchBookApi = createAsyncThunk('BOOK/FETCH_API', async () => {
  const res = await axios.get('http://localhost:4000/random-book')
  return res.data
})

export const fetchBookGoogle = createAsyncThunk(
  'BOOK/FETCH_GOOGLE',
  async () => {
    try {
      const res = await axios.get(
        'https://www.googleapis.com/books/v1/volumes?q=4'
      )
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
      console.error('Error fetching book data:', error)
      return {
        title: 'Unknown',
        year: 'Unknown',
        author: 'Unknown',
        description: 'Error fetching book',
        image: '',
      }
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
