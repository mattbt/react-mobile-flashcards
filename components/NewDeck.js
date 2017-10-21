import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { white, purple, lightgreen, red } from '../utils/colors'
import CustomButton from './CustomButton'

import { addDeck } from '../actions'
import { saveDeckTitle, getDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'


class NewDeck extends Component {
  state = {
    title: '',
    submitDisabled: true,
    error: ''
  }

  submit = () => {
    const { dispatch } = this.props
    const { title } = this.state

    // Update Redux
    dispatch(addDeck(title))

    this.setState({
      title: '',
      submitDisabled: true,
      error: ''
    })

    // Navigate to Home
    this.toHome()

    // Save to 'DB' (AsyncStorage)
    saveDeckTitle(title)

  }

  titleChanged = (title) => {
    const { list } = this.props
    this.setState({
      title: title,
      submitDisabled: ((title === '') || list[title]) ? true : false,
      error: list[title]
        ? 'a deck with this title already exists'
        : ''
    })

  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'NewDeck'
    }))
  }
  render(){
    const { title, submitDisabled, error } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.titleChanged}
          value={title}
        />
        <CustomButton onPress={this.submit} disabled={submitDisabled}>Save Deck</CustomButton>
        <Text style={{color: red, textAlign: 'center'}}>{error}</Text>
      </View>
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

function mapStateToProps (deck) {
  const { list } = deck

  return {
    list
  }
}

export default connect(mapStateToProps)(NewDeck)
