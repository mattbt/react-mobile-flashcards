import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Text, Platform, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors'

import CustomButton from './CustomButton'
import { addQuestion } from '../actions'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'

class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }
  toDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }
  addQuestion = () => {
    const { dispatch, deckId } = this.props
    const { question, answer } = this.state

    // Update Redux
    dispatch(addQuestion(question, answer, deckId))

    this.setState(() => ({
      question: '',
      answer: ''
    }))

    // Navigate to Home
    this.toDeck()

    // Save to 'DB' (AsyncStorage)
    addCardToDeck(deckId, { question, answer })

  }

  render(){
    const { deckId } = this.props
    const { question, answer } = this.state

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.inputLabel}>Question</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState((state) => {return{...state, ['question']: text} })}
          value={question}
        />
        <Text style={styles.inputLabel}>Answer</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState((state) => {return{...state, ['answer']: text} })}
          value={answer}
        />
        <CustomButton onPress={this.addQuestion} disabled={(question === '') || (answer === '')}>Add Question</CustomButton>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  inputLabel: {
    fontSize: 20, textAlign: 'center', padding: 20
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 20,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    fontSize: 20
  }
})

function mapStateToProps (deck, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId
  }
}

export default connect(mapStateToProps)(NewQuestion)
