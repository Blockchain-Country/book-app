import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import createBook from '../../utils/CreateBook.js'
import { ADD_BOOK } from '../../redux/slices/BooksSlice.js'
import getGoogleBookViaApi from '../../data/getGoogleBookViaApi.js'
import './BookForm.css'

const BookForm = () => {
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
    const res = await axios.get('http://localhost:4000/random-book')
    console.log(res.data)
    return dispatch(ADD_BOOK(createBook(res.data)))
  }

  const handleRandomBookFromGoogle = async () => {
    const { title, year, author, description, image } =
      await getGoogleBookViaApi()
    return dispatch(
      ADD_BOOK(createBook({ title, year, author, description, image }))
    )
  }

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleRandomBookViaAPI}>
          Add Random API
        </button>
        <button type="button" onClick={handleRandomBookFromGoogle}>
          Add Random Google
        </button>
      </form>
    </div>
  )
}

export default BookForm
