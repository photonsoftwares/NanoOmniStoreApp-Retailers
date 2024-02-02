

import { StyleSheet, StatusBar, Platform, PermissionsAndroid, } from 'react-native'
import React, { useEffect } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Routes from './src/Navigation/Routes'
import { persistor, store } from './src/ReduxToolkit/store'
import FlashMessage from 'react-native-flash-message'
import { moderateScale, textScale } from './src/styles/responsiveSize'
import SplashScreen from 'react-native-splash-screen'
import { notificationListeners, requestUserPermission } from './src/utils/notificationServices'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();

  })

  useEffect(() => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res) => {
        if (!!res && res == 'granted') {
          requestUserPermission()
          notificationListeners()
        }
      }).catch(error => {
        alert('something wrong')
      })
    } else {

    }
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