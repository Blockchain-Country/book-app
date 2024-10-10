import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ADD_BOOK } from '../../redux/slices/BooksSlice.js'
import createBook from '../../utils/CreateBook.js'
import booksList from '../../data/books.json'
import './BookForm.css'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const dispath = useDispatch()

  const handleSubmit = (e) => {
    const yearRegex = /^\d{4}$/
    e.preventDefault()
    if (title && yearRegex.test(year) && author) {
      dispath(ADD_BOOK(createBook({ title, year, author })))
      setTitle('')
      setYear('')
      setAuthor('')
    }
  }

  const handleRandomBook = () => {
    const randomNum = Math.floor(Math.random() * booksList.length)
    const randomBook = booksList[randomNum]
    return dispath(ADD_BOOK(createBook(randomBook)))
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
        <button type="button" onClick={handleRandomBook}>
          Add Random
        </button>
      </form>
    </div>
  )
}

export default BookForm
