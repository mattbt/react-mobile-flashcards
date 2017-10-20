import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'

const initDeck = {
  'list': {}
}

function deck (state = initDeck, action){
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.list
        ? {
            ...state,
            ['list']: JSON.parse(action.list)
          }
        : state
    case ADD_DECK:
      return {
        ...state,
        list: {
          ...state.list,
          [action.title]: {
            title: action.title,
            questions: []
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        list: {
          ...state.list,
          [action.deckId]: {
            ...state.list[action.deckId],
            questions: [
              ...state.list[action.deckId].questions,
              {question: action.question, answer: action.answer}
            ]
          }
        }
      }
    default:
      return state
  }
}

export default deck
