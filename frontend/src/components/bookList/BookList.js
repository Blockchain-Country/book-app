import { useDispatch, useSelector } from 'react-redux'
import { deleteBook } from '../../redux/books/ActionCreators.js'
import './BookList.css'

const BookList = () => {
  const books = useSelector((state) => state.booksList)
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              <div className="book-info" id={book.id}>
                {i + 1}. {book.title} by {book.author}
              </div>
              <div className="book-actions">
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList
