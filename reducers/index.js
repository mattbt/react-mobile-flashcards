import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_QUESTION,
} from '../actions/types'

const initDeck = {
  'list': {}
}

function deck (state = initDeck, action){
  switch (action.type) {
    case RECEIVE_DECKS:
      const list = action.payload
      return list
        ? {
            ...state,
            ['list']: JSON.parse(list)
          }
        : state
    case ADD_DECK:
      const title = action.payload
      return {
        ...state,
        list: {
          ...state.list,
          [title]: {
            title,
            questions: []
          }
        }
      }
    case ADD_QUESTION:
      const { question, answer, deckId } = action.payload
      return {
        ...state,
        list: {
          ...state.list,
          [deckId]: {
            ...state.list[deckId],
            questions: [
              ...state.list[deckId].questions,
              {question, answer}
            ]
          }
        }
      }
    default:
      return state
  }
}

export default deck
