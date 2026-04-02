

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
<<<<<<< HEAD
=======
    checkUpdate();
  });

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     // Only request POST_NOTIFICATIONS for Android 13 and above
  //     if (Platform.Version >= 33) {
  //       PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //       )
  //         .then(res => {
  //           if (!!res && res === 'granted') {
  //             requestUserPermission();
  //             notificationListeners();
  //           }
  //         })
  //         .catch(error => {
  //           // Alert.alert(
  //           //   'Error',
  //           //   'requesting notification permissions',error,
  //           // );
  //            console.log('Notification permission error:', error);
  //         });
  //     } else {
  //       requestUserPermission();
  //       notificationListeners();
  //     }
  //   } else {
  //     requestUserPermission();
  //     notificationListeners();
  //   }
  // }, []);
  useEffect(() => {
  const requestNotifications = async () => {
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          // Android 13+ POST_NOTIFICATIONS
          const res = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (res === 'granted') {
            await requestUserPermission();
            notificationListeners();
          } else {
            console.log('Notification permission denied by user');
          }
        } else {
          // Android 12 ya lower
          console.log('Android <13, skipping POST_NOTIFICATIONS');
          await requestUserPermission();
          notificationListeners();
        }
      } else {
        // iOS
        await requestUserPermission();
        notificationListeners();
      }
    } catch (error) {
      console.log('Notification permission error:', error);
    }
  };

  requestNotifications();
}, []);

  const checkUpdate = async () => {
    const inAppUpdates = new SpInAppUpdates(false); // isDebug = false
    try {
      const result = await inAppUpdates.checkNeedsUpdate();
      console.log('checkUpdate', result);
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
>>>>>>> 88a2e06 (all)

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