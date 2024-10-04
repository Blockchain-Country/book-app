import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addBook } from '../../redux/books/ActionCreators.js'
import booksList from '../../data/books.json'
import './BookForm.css'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const dispath = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title && author) {
      dispath(
        addBook({
          title,
          author,
          id: uuidv4(),
          isFavorite: false,
        })
      )
      setTitle('')
      setAuthor('')
    }
  }

  const handleRandomBook = () => {
    const randomNum = Math.floor(Math.random() * booksList.length)
    const randomBook = booksList[randomNum]
    return dispath(
      addBook({
        ...randomBook,
        id: uuidv4(),
        isFavorite: false,
      })
    )
  }

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
