import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import  { gray } from '../utils/colors'

export default function DeckCard ({ deck }) {
  return (
    <View style={styles.card}>
      <Text style={{fontSize: 20}}>{deck.title}</Text>
      <Text>{deck.qnum} {1 == deck.qnum ? 'card' : 'cards'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center'
  }
})
