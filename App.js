import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import store from './store';

import { purple } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import { Constants } from 'expo'

import { MainNavigator } from './routes'

function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={purple} barStyle='light-content'/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
