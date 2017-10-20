import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, lightgray, gray } from '../utils/colors'
import DeckCard from './DeckCard'
import { AppLoading } from 'expo'

import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'

class DeckList extends Component {
  state = {
    ready: false
  }
  componentDidMount(){
      const { dispatch } = this.props

      getDecks()
        .then((list) => {
          dispatch(receiveDecks(list))
        })
        .then(() => this.setState(() => ({
          ready: true
        })))
  }

  render(){
    const { decklist } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <ScrollView style={styles.container}>
        { 0 === decklist.length
          ? <Text style={styles.noDecks}>No decks found</Text>
          : decklist.map((deck) => (
              <TouchableOpacity
                style={styles.item}
                key={deck.title}
                onPress={() => this.props.navigation.navigate(
                  'IndividualDeck',
                  { deckId: deck.title }
                )}>
                <DeckCard deck={deck} />
              </TouchableOpacity>
            ))
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightgray
  },
  noDecks: {
    fontSize: 18,
    color: gray,
    textAlign: 'center',
    margin: 10
  },
  item:{
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width:0,
      height: 3
    }
  }
})

function mapStateToProps (deck) {

  return {
    decklist: Object.keys(deck.list).map((k) => {
      const { title, questions } = deck.list[k]
      return {
        title,
        qnum: questions.length
      }
    })
  }
}

export default connect(mapStateToProps)(DeckList)
