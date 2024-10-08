import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { DELETE_BOOK, TOGGLE_FAVORITE } from '../../redux/slices/BooksSlice.js'
import './BookList.css'

const BookList = () => {
  const books = useSelector((state) => state.booksList)
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    books.forEach((book) => {
      if (book.id === id && book.isFavorite === false) {
        dispatch(DELETE_BOOK(id))
      }
    })
  }

  const handleFavorite = (id) => {
    dispatch(TOGGLE_FAVORITE(id))
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
                <span onClick={() => handleFavorite(book.id)}>
                  {!book.isFavorite ? (
                    <AiOutlineStar className="star-icon" />
                  ) : (
                    <AiFillStar className="star-icon" />
                  )}
                </span>
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
