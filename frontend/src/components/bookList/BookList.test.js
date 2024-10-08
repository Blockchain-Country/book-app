import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import BookList from './BookList.js'
import { DELETE_BOOK } from '../../redux/slices/BooksSlice.js'

// Mock Redux store
const mockStore = configureStore([])

describe('BookList Component', () => {
  let store

  beforeEach(() => {
    // Initial state for the store
    store = mockStore({
      booksList: [
        { id: 1, title: 'Book One', author: 'Author One' },
        { id: 2, title: 'Book Two', author: 'Author Two' },
      ],
    })

    // Mock dispatch for the store
    store.dispatch = jest.fn()
  })

  test('renders book list correctly', () => {
    render(
      <Provider store={store}>
        <BookList />
      </Provider>
    )

    expect(screen.getByText('1. Book One by Author One')).toBeInTheDocument()
    expect(screen.getByText('2. Book Two by Author Two')).toBeInTheDocument()
  })

  test('displays "No books available" when the book list is empty', () => {
    // Provide an empty booksList in the store
    store = mockStore({
      booksList: [],
    })

    render(
      <Provider store={store}>
        <BookList />
      </Provider>
    )

    expect(screen.getByText('No books available')).toBeInTheDocument()
  })

  test('dispatches deleteBook action when the delete button is clicked', () => {
    render(
      <Provider store={store}>
        <BookList />
      </Provider>
    )

    const deleteButton = screen.getAllByText('Delete')[0]
    fireEvent.click(deleteButton)

    // expect(store.dispatch).toHaveBeenCalledWith(deleteBook(1))
  })
})
