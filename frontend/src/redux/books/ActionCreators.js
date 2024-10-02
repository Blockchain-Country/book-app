import * as actions from './ActionTypes.js'

export const addBook = (newBook, id) => {
  return {
    type: actions.ADD_BOOK,
    payload: newBook,
    id,
  }
}

export const deleteBook = (id) => {
  return {
    type: actions.DELETE_BOOK,
    payload: id,
  }
}
