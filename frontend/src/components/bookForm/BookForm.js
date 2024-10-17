import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FaSpinner } from 'react-icons/fa'
import createBook from '../../utils/CreateBook.js'
import { SET_ERROR } from '../../redux/slices/ErrorSlice.js'
import './BookForm.css'
import {
  ADD_BOOK,
  fetchBookApi,
  fetchBookGoogle,
} from '../../redux/slices/BooksSlice.js'

const BookForm = () => {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    const yearRegex = /^\d{4}$/
    e.preventDefault()
    if (title && yearRegex.test(year) && author) {
      dispatch(ADD_BOOK(createBook({ title, year, author })))
      setTitle('')
      setYear('')
      setAuthor('')
    } else if (!title || !year || !author) {
      dispatch(SET_ERROR('You should fill Title, Year and Author'))
    } else {
      dispatch(SET_ERROR('You should enter a correct Year format'))
    }
  }

  const handleRandomBookViaAPI = async () => {
    try {
      setIsLoading(true)
      await dispatch(fetchBookApi('http://localhost:4000/random-book'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleRandomBookFromGoogle = async () => {
    try {
      setIsLoading(true)
      await dispatch(
        fetchBookGoogle('https://www.googleapis.com/books/v1/volumes?q=4')
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-block book-form">
      <h2>{t('bookFormLabel')}</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">{t('bookFormTitle')}</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="year">{t('bookFormYear')}</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="author">{t('bookFormAuthor')}</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">{t('bookFormAddBookBtn')}</button>
        <button
          type="button"
          onClick={handleRandomBookViaAPI}
          disabled={isLoading}
        >
          {t('bookFormAddRandomApiBtn')}
        </button>
        <button
          type="button"
          onClick={handleRandomBookFromGoogle}
          disabled={isLoading}
        >
          {t('bookFormAddRandomGoogleBtn')}
        </button>
      </form>
      <span>{isLoading && <FaSpinner className="spinner" />}</span>
    </div>
  )
}

export default BookForm
