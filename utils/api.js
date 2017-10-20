import { AsyncStorage } from 'react-native'
export const FLASHCARD_STORAGE_KEY = 'flashcards:decks'


// getDecks: return all of the decks along with their titles, questions, and answers.
export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then((results) => results)
}

// getDeck: take in a single id argument and return the deck associated with that id.
export function getDeck(deckId) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then((results) => {
    return JSON.parse(results)[deckId]
  })
}

// saveDeckTitle: take in a single title argument and add it to the decks.
export function saveDeckTitle(deckTitle){
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [deckTitle]: {
      title: deckTitle,
      questions: []
    }
  }))
}

// addCardToDeck: take in two arguments, title and card, and will add the card
// to the list of questions for the deck with the associated title.
export function addCardToDeck(deckTitle, card){
  getDeck(deckTitle)
    .then((result) => {
      const updatedDeck = {
        ...result,
        ['questions']: [
          ...result.questions,
          card
        ]
      }
      return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [deckTitle]: updatedDeck
      }))
    })
}
