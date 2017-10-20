export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveDecks(list){
  return {
    type: RECEIVE_DECKS,
    list
  }
}
export function addDeck(title){
  return {
    type: ADD_DECK,
    title
  }
}
export function addQuestion(question, answer, deckId){
  return {
    type: ADD_QUESTION,
    question,
    answer,
    deckId
  }
}
