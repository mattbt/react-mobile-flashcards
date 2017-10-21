export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

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
