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

export const toggleFavorite = (id) => {
  return {
    type: actions.TOGGLE_FAVORITE,
    payload: id,
  }
}
