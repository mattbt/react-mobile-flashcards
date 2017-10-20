import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { white, purple, red, lightgray, gray, lightgreen } from '../utils/colors'

import CustomButton from './CustomButton'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'


class Quiz extends Component {
  state = {
    currentView: 'front',
    currentQuestion: 0,
    correctCount: 0
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  correctAnswer() {
    this.checkQuizEnd()
    this.setState((state) => {
      return {
        ...state,
        ['currentQuestion']: state.currentQuestion + 1,
        ['correctCount']: state.correctCount + 1
      }
    })
    this.flipCard()
  }
  incorrectAnswer() {
    this.checkQuizEnd()
    this.setState((state) => {
      return {
        ...state,
        ['currentQuestion']: state.currentQuestion + 1
      }
    })
    this.flipCard()
  }

  checkQuizEnd(){
    const { currentQuestion } = this.state
    const { currentDeck } = this.props

    // last question? clear today notification, set tomorrow notification
    if(currentDeck.questions.length === currentQuestion + 1){
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  flipCard() {
    const { currentView } = this.state

    if (currentView === 'back') {

      this.setState((state) => {return {...state, ['currentView']: 'front'}})
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 7,
        tension: 2
      }).start();
    } else {
      this.setState((state) => {return {...state, ['currentView']: 'back'}})
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 7,
        tension: 2
      }).start();
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }

  render(){
    const { currentDeck } = this.props
    const { currentView, currentQuestion, correctCount } = this.state
    const { questions } = currentDeck
    const qnum = questions.length

    const frontAnimatedStyle = {
        transform: [
          { rotateY: this.frontInterpolate}
        ]
      }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View style={styles.container}>
        { (currentQuestion < qnum) &&
          <View style={styles.center}>
            <Text style={styles.countText}>Card {currentQuestion + 1} of {qnum}</Text>
            <Text style={styles.qText}>{currentView === 'front' ? "Question" : "Answer"}</Text>
            <View>
              <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                <Text style={styles.flipText}>
                  {questions[currentQuestion].question}
                </Text>
              </Animated.View>
              <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack, {opacity: this.backOpacity}]}>
                <Text style={styles.flipText}>
                  {questions[currentQuestion].answer}
                </Text>
              </Animated.View>
            </View>
            { currentView === 'front' &&
              <CustomButton
                onPress={() => this.flipCard()}
                disabled={false}
                style={{backgroundColor: purple}}
                >View Answer</CustomButton>
            }

            { currentView === 'back' &&
              <View style={styles.center}>
                <CustomButton
                  onPress={() => this.correctAnswer()}
                  style={{margin: 5}}
                  disabled={false}
                  >Correct</CustomButton>
                <CustomButton
                  onPress={() => this.incorrectAnswer()}
                  disabled={false}
                  style={{backgroundColor: red, margin: 5}}
                  >Incorrect</CustomButton>
              </View>
            }
          </View>
        }

        {(currentQuestion === qnum) &&
          (correctCount < (qnum/2)
          ? <View style={styles.center}>
              <Text style={[styles.resultSubTitle, {color: red}]}>Not so well</Text>
              <Text style={[styles.resultTitle, {color: red}]}>
                {Math.ceil((correctCount * 100) / qnum)} %
              </Text>
              <Text>{correctCount} / {qnum} correct</Text>
            </View>
          : <View style={styles.center}>
              <Text style={styles.resultSubTitle}>Good job!</Text>
              <Text style={styles.resultTitle}>
                {Math.ceil((correctCount * 100) / qnum)} %
              </Text>
              <Text>{correctCount} / {qnum} correct</Text>
            </View>)
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightgray,
  },
  flipCard: {
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 40,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width:0,
      height: 3
    },
    width: 220,
    alignItems: 'center',
    backgroundColor: white,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: white,
    position: "absolute",
    top: 0,
  },
  countText: {
    fontSize: 15,
    color: gray
  },
  qText: {
    fontSize: 20,
    color: gray,
    fontWeight: 'bold',
  },
  flipText: {
    fontSize: 18,
    color: gray,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize:  40,
    color: lightgreen,
  },
  resultSubTitle: {
    fontSize:  20,
    color: lightgreen,
    marginTop: 20
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

export default connect(mapStateToProps)(Quiz)
