

import { StyleSheet, StatusBar, Platform, PermissionsAndroid, Alert, } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from './src/ReduxToolkit/store'
import FlashMessage from 'react-native-flash-message'
import { moderateScale, textScale } from './src/styles/responsiveSize'
import SplashScreen from 'react-native-splash-screen'
import { notificationListeners, requestUserPermission } from './src/utils/notificationServices'
import Routes from './src/Navigation/Routes'
import SpInAppUpdates, { IAUInstallStatus, IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates'
import UpdatePopup from './src/Components/UpdatePopup'


const App = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    checkUpdate()
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




  const checkUpdate = async () => {
    const inAppUpdates = new SpInAppUpdates(false); // isDebug = false
    try {
      const result = await inAppUpdates.checkNeedsUpdate();
      console.log("checkUpdate", result)
      if (result.shouldUpdate) {
        setPopupVisible(true); // Show the update popup
      }
    } catch (e) {
      console.log('Error checking for update:', e);
    }
  };

  const handleUpdate = async () => {
    setPopupVisible(false); // Hide the popup
    const inAppUpdates = new SpInAppUpdates(false);

    let updateOptions: StartUpdateOptions = {};
    if (Platform.OS === 'android') {
      updateOptions = {
        updateType: IAUUpdateKind.IMMEDIATE,
      };
    } else if (Platform.OS === 'ios') {
      updateOptions = {
        title: 'Update available',
        message:
          'There is a new version of the app available on the App Store. Do you want to update it?',
        buttonUpgradeText: 'Update',
        buttonCancelText: 'Cancel',
      };
    }

    try {
      inAppUpdates.addStatusUpdateListener(downloadStatus => {
        console.log('Download status:', downloadStatus);
        if (downloadStatus.status === IAUInstallStatus.DOWNLOADED) {
          console.log('Update downloaded, installing...');
          inAppUpdates.installUpdate();
        }
      });
      await inAppUpdates.startUpdate(updateOptions);
    } catch (e) {
      console.log('Error during update:', e);
    }
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
        <UpdatePopup
          visible={isPopupVisible}
          handleUpdate={handleUpdate}
          onClose={() => setPopupVisible(false)}
        />
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})