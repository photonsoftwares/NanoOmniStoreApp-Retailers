

import { StyleSheet, StatusBar, } from 'react-native'
import React, { useEffect } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Routes from './src/Navigation/Routes'
import { persistor, store } from './src/ReduxToolkit/store'
import FlashMessage from 'react-native-flash-message'
import { moderateScale, textScale } from './src/styles/responsiveSize'
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();

  })
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
        <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
        <FlashMessage
          titleStyle={{
            marginRight: moderateScale(5),
            fontSize: textScale(16)
          }}
          position='top'
        />
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})