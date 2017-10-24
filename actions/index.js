import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_QUESTION,
} from './types'

export function receiveDecks(list){
  return {
    type: RECEIVE_DECKS,
    payload: list
  }
}
export function addDeck(title){
  return {
    type: ADD_DECK,
    payload: title
  }
}
export function addQuestion(question, answer, deckId){
  return {
    type: ADD_QUESTION,
    payload: {
      question,
      answer,
      deckId
    }
  }
}
