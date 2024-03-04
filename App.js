

// import { StyleSheet, StatusBar, Platform, PermissionsAndroid, Text, View, Linking, Image, Modal, Button, } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { PersistGate } from 'redux-persist/integration/react'
// import { Provider } from 'react-redux'
// import Routes from './src/Navigation/Routes'
// import { persistor, store } from './src/ReduxToolkit/store'
// import FlashMessage from 'react-native-flash-message'
// import { moderateScale, textScale } from './src/styles/responsiveSize'
// import SplashScreen from 'react-native-splash-screen'
// import { notificationListeners, requestUserPermission } from './src/utils/notificationServices'
// import SpInAppUpdates, {
//   NeedsUpdateResponse,
//   IAUUpdateKind,
//   StartUpdateOptions,
// } from 'sp-react-native-in-app-updates';


// const App = () => {
//   const [updateRequired, setUpdateRequired] = useState()
//   const [modalVisible, setModalVisible] = useState(true);
//   const inAppUpdates = new SpInAppUpdates(true)


//   useEffect(() => {
//     SplashScreen.hide();

//   })

//   const checkUpdate = () => {
//     inAppUpdates.checkNeedsUpdate().then((result) => {
//       if (result.shouldUpdate == true) {
//         setUpdateRequired(true)
//       }
//     })
//   }
//   useEffect(() => {
//     checkUpdate()
//   }, [])


//   // useEffect(() => {
//   //   const checkUpdate = async () => {
//   //     inAppUpdates.checkNeedsUpdate().then(async (result) => {
//   //       if (result.shouldUpdate == true) {
//   //         console.log("update reuired", result.shouldUpdate)
//   //         await inAppUpdates.installUpdate();

//   //         // setUpdateRequired(true)
//   //         Linking.openURL('https://play.google.com/store/apps/details?id=com.omniretailer');
//   //         // Linking.openURL('market://details?id=com.omniretailer')
//   //       }
//   //     })
//   //   }
//   //   checkUpdate()

//   // })


//   // useEffect(() => {
//   //   async function checkForUpdate() {
//   //     inAppUpdates.checkNeedsUpdate({ curVersion: '0.0.8' }).then((result) => {
//   //       if (result.shouldUpdate) {
//   //         let updateOptions  = {};
//   //         if (Platform.OS === 'android') {
//   //           // android only, on iOS the user will be promped to go to your app store page
//   //           updateOptions = {
//   //             updateType: IAUUpdateKind.IMMEDIATE,
//   //           };
//   //         }
//   //         // inAppUpdates.addStatusUpdateListener((onStatusUpdate)=>console.log(onStatusUpdate,"onStatusUpdate"));
//   //         inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
//   //         inAppUpdates.installUpdate(); 
//   //       }
//   //     });

//   //   }
//   //   checkForUpdate();

//   // }, [])




//   useEffect(() => {
//     if (Platform.OS == 'android') {
//       PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res) => {
//         if (!!res && res == 'granted') {
//           requestUserPermission()
//           notificationListeners()
//         }
//       }).catch(error => {
//         alert('something wrong')
//       })
//     } else {

//     }
//   })


//   // useEffect(() => {
//   //   const checkUpdate = () => {
//   //     inAppUpdates.checkNeedsUpdate().then((result) => {
//   //       if (result.shouldUpdate == true) {
//   //         console.log("update reuired", result.shouldUpdate)
//   //         setUpdateRequired(true)
//   //       }
//   //     })
//   //   }
//   //   checkUpdate()
//   // })

//   const openPlayStore = () => {
//     Linking.openURL('https://play.google.com/store/apps/details?id=com.omniretailer')
//       .catch(err => console.error('An error occurred', err));
//   };

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {/* {updateRequired ?
//           // <AppUpdateCompo />
//           <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', gap: 48, backgroundColor: '#FFF' }}>
//             <View>

//               <Image source={ImagePath.NanoPosLogo} style={{ width: 300, height: 300, marginBottom: 16 }} resizeMode='contain' />
//               <Text style={commonStyles.fontBold21}>New update available!</Text>
//             </View>
//             <ButtonCompo title="Update Now" onPress={() => openPlayStore()} style={{ backgroundColor: '#ECE447', width: 320, }} />


//           </View>

//           :
//           <Routes />
//         } */}

//         <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
//         <Routes />
//         <FlashMessage
//           titleStyle={{
//             marginRight: moderateScale(5),
//             fontSize: textScale(16)
//           }}
//           position='top'
//         />
//         <Modal visible={updateRequired}>
//           <View
//             style={{
//               // backgroundColor: COLORS.background,
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               paddingHorizontal: 10,
//             }}
//           >
//             {/* <Text style={commonStyles.h2Text}>New Update Available</Text> */}
//             <Text >
//               A new version of the app is available. Please update to continue.
//             </Text>
//             <View style={{ marginTop: 15 }}>
//               <Button
//                 title={'Update'}
//                 onPress={() => Linking.openURL('market://details?id=com.omniretailer')}
//               />
//             </View>
//           </View>
//         </Modal>
//       </PersistGate>
//     </Provider>
//   )
// }

// export default App

// const styles = StyleSheet.create({})







/////


import { StyleSheet, StatusBar, Platform, PermissionsAndroid, Text, View, Linking, Image, Modal, Button, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Routes from './src/Navigation/Routes'
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


const App = () => {
  const [updateRequired, setUpdateRequired] = useState()
  const [modalVisible, setModalVisible] = useState(true);
  const inAppUpdates = new SpInAppUpdates(true)


  useEffect(() => {
    SplashScreen.hide();

  })

  // const checkUpdate = () => {
  //   inAppUpdates.checkNeedsUpdate().then((result) => {
  //     if (result.shouldUpdate == true) {
  //       setUpdateRequired(true)
  //     }
  //   })
  // }
  // useEffect(() => {
  //   checkUpdate()
  // }, [])


  // useEffect(() => {
  //   const checkUpdate = async () => {
  //     inAppUpdates.checkNeedsUpdate().then(async (result) => {
  //       if (result.shouldUpdate == true) {
  //         console.log("update reuired", result.shouldUpdate)
  //         await inAppUpdates.installUpdate();

  //         // setUpdateRequired(true)
  //         Linking.openURL('https://play.google.com/store/apps/details?id=com.omniretailer');
  //         // Linking.openURL('market://details?id=com.omniretailer')
  //       }
  //     })
  //   }
  //   checkUpdate()
  // })


  useEffect(() => {
    async function checkForUpdate() {
      inAppUpdates.checkNeedsUpdate({ curVersion: '0.0.8' }).then((result) => {
        if (result.shouldUpdate) {
          let updateOptions = {};
          if (Platform.OS === 'android') {
            // android only, on iOS the user will be promped to go to your app store page
            updateOptions = {
              updateType: IAUUpdateKind.IMMEDIATE,
            };
          }
          // inAppUpdates.addStatusUpdateListener((onStatusUpdate)=>console.log(onStatusUpdate,"onStatusUpdate"));
          inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
          inAppUpdates.installUpdate();
        }
      });

    }
    checkForUpdate();

  }, [])




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


  // useEffect(() => {
  //   const checkUpdate = () => {
  //     inAppUpdates.checkNeedsUpdate().then((result) => {
  //       if (result.shouldUpdate == true) {
  //         console.log("update reuired", result.shouldUpdate)
  //         setUpdateRequired(true)
  //       }
  //     })
  //   }
  //   checkUpdate()
  // })

  const openPlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.omniretailer')
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* {updateRequired ?
          // <AppUpdateCompo />
          <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', gap: 48, backgroundColor: '#FFF' }}>
            <View>

              <Image source={ImagePath.NanoPosLogo} style={{ width: 300, height: 300, marginBottom: 16 }} resizeMode='contain' />
              <Text style={commonStyles.fontBold21}>New update available!</Text>
            </View>
            <ButtonCompo title="Update Now" onPress={() => openPlayStore()} style={{ backgroundColor: '#ECE447', width: 320, }} />


          </View>

          :
          <Routes />
        } */}

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