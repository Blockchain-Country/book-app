import React from 'react'
import './BookDescriptionModal.css'

const BookDescriptionModal = ({ isOpen, onClose, book }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        <h2>{book.title}</h2>
        <div>
          {book.image ? (
            <img src={book.image} alt={`${book.title} cover`} />
          ) : (
            ''
          )}
        </div>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Published Year:</strong> {book.year}
        </p>
        <p>
          <strong>Description:</strong>{' '}
          {book.description || 'No description available'}
        </p>
      </div>
    </div>
  )
}

export default BookDescriptionModal
