import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { DELETE_BOOK, TOGGLE_FAVORITE } from '../../redux/slices/BooksSlice.js'
import { selectBook } from '../../redux/slices/BooksSlice.js'
import { selectTitleFilter } from '../../redux/slices/FiltersSlice.js'
import './BookList.css'

const BookList = () => {
  const dispatch = useDispatch()
  const books = useSelector(selectBook)
  const titleFilter = useSelector(selectTitleFilter)

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

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(titleFilter.toLowerCase())
  })

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {!books.length ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
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
