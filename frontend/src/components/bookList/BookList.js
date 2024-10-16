import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { DELETE_BOOK, TOGGLE_FAVORITE } from '../../redux/slices/BooksSlice.js'
import { selectBook } from '../../redux/slices/BooksSlice.js'
import BookDescriptionModal from '../modals/BookDescriptionModal.js'
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/FiltersSlice.js'
import './BookList.css'

const BookList = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const books = useSelector(selectBook)

  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)

  const [selectedBook, setSelectedBook] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleOpenModal = (book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedBook(null)
  }

  const filteredBooks = books.filter((book) => {
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true

    if (book.title && book.year && book.author) {
      return (
        book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
        book.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
        matchesFavorite
      )
    }
    return false
  })

  const highlightMatched = (text, filter) => {
    if (!filter) return text

    const regex = new RegExp(`(${filter})`, 'gi')
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        )
      }
      return substring
    })
  }

  return (
    <div className="app-block book-list">
      <h2>{t('bookListLabel')}</h2>
      {!books.length ? (
        <p>{t('bookListNoBooksLabel')}</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div
                className="book-info"
                id={book.id}
                onClick={() => handleOpenModal(book)}
                style={{ cursor: 'pointer' }}
              >
                <span>
                  {i + 1}
                  {'. '}
                </span>
                <span>{highlightMatched(book.title, titleFilter)} </span>
                <span>{`(${book.year})`}</span>
                <span>
                  {' '}
                  by{' '}
                  <strong>{highlightMatched(book.author, authorFilter)}</strong>
                </span>
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
                  {t('bookListDeleteBookBtn')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Modal Component */}
      <BookDescriptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        book={selectedBook}
      />
    </div>
  )
}

export default BookList
