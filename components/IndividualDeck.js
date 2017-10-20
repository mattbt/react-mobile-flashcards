import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, purple, gray } from '../utils/colors'

import CustomButton from './CustomButton'


class IndividualDeck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }
  render(){
    const { currentDeck } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{currentDeck.title}</Text>
        <Text style={styles.subtitle}>{currentDeck.questions.length} {1 === currentDeck.questions.length ? 'card' : 'cards'}</Text>
        <CustomButton
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            {deckId: currentDeck.title},
          )}
          style={{margin: 5}}
          disabled={0 === currentDeck.questions.length}
        >Start Quiz</CustomButton>
        <CustomButton
          onPress={() => this.props.navigation.navigate(
            'NewQuestion',
            {deckId: currentDeck.title},
          )}
          disabled={false}
          style={{backgroundColor: purple, margin: 5}}
        >+ Question</CustomButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems: 'center'
  },
  title: {
    paddingTop: 30,
    fontSize: 26
  },
  subtitle: {
    paddingTop: 10,
    fontSize: 20,
    color: gray,
    marginBottom: 15
  }
})

function mapStateToProps (deck, { navigation }) {
  const { deckId } = navigation.state.params
  const { list } = deck
  return {
    deckId,
    currentDeck: list[deckId]
  }
}

export default connect(mapStateToProps)(IndividualDeck)
