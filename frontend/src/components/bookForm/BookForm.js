import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import createBook from '../../utils/CreateBook.js'
import {
  ADD_BOOK,
  fetchBookApi,
  fetchBookGoogle,
} from '../../redux/slices/BooksSlice.js'
import './BookForm.css'

const BookForm = () => {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    const yearRegex = /^\d{4}$/
    e.preventDefault()
    if (title && yearRegex.test(year) && author) {
      dispatch(ADD_BOOK(createBook({ title, year, author })))
      setTitle('')
      setYear('')
      setAuthor('')
    }
  }

  const handleRandomBookViaAPI = async () => {
    // const res = await axios.get('http://localhost:4000/random-book')
    // return dispatch(ADD_BOOK(createBook(res.data)))
    dispatch(fetchBookApi())
  }

  const handleRandomBookFromGoogle = async () => {
    // const { title, year, author, description, image } =
    //   await getGoogleBookViaApi()
    // return dispatch(
    //   ADD_BOOK(createBook({ title, year, author, description, image }))
    // )
    dispatch(fetchBookGoogle())
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
        <button type="button" onClick={handleRandomBookViaAPI}>
          {t('bookFormAddRandomApiBtn')}
        </button>
        <button type="button" onClick={handleRandomBookFromGoogle}>
          {t('bookFormAddRandomGoogleBtn')}
        </button>
      </form>
    </div>
  )
}

export default BookForm
