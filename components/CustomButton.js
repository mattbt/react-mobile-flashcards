import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, white, lightgreen, gray } from '../utils/colors'

export default function CustomButton ({ children, onPress, disabled, style = {} }){
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, disabled ? {backgroundColor: gray} : {}, style]}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: lightgreen,
    width: 170,
    padding: 20,
    margin: 20,
    borderRadius: 3,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center'
  },
})
