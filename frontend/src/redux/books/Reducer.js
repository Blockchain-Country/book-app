import * as actions from './ActionTypes.js'

const initialState = []

const booksListReducer = (state = initialState, actionType) => {
  switch (actionType.type) {
    case actions.ADD_BOOK:
      return [...state, actionType.payload]
    case actions.DELETE_BOOK:
      return state.filter((book) => book.id !== actionType.payload)
    default:
      return state
  }
}

export default booksListReducer
