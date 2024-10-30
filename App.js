

import { StyleSheet, StatusBar, Platform, PermissionsAndroid, Linking, } from 'react-native'
import React, { useEffect, } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from './src/ReduxToolkit/store'
import FlashMessage from 'react-native-flash-message'
import { moderateScale, textScale } from './src/styles/responsiveSize'
import SplashScreen from 'react-native-splash-screen'
import { notificationListeners, requestUserPermission } from './src/utils/notificationServices'
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import Routes from './src/Navigation/Routes'


const App = () => {
  const inAppUpdates = new SpInAppUpdates(false)

  useEffect(() => {
    SplashScreen.hide();

  })

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Only request POST_NOTIFICATIONS for Android 13 and above
      if (Platform.Version >= 33) {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res) => {
          if (!!res && res === 'granted') {
            requestUserPermission();
            notificationListeners();
          }
        }).catch(error => {
          Alert.alert('Error', 'Something went wrong while requesting notification permissions');
        });
      } else {
        requestUserPermission();
        notificationListeners();
      }
    } else {
      requestUserPermission();
      notificationListeners();
    }
  }, []);




  const openPlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.omniretailer')
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
        <Routes />
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