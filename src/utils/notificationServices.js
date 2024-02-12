// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
// import { Alert } from 'react-native';

// export async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//         console.log('Authorization status:', authStatus);
//         getFcmToken()
//     }
// }


// const getFcmToken = async () => {
//     let fcmToken = await AsyncStorage.getItem('fcmToken')
//     console.log("old fcmToken", fcmToken)

//     if (!fcmToken) {
//         try {
//             const token = await messaging().getToken()
//             if (token) {
//                 await AsyncStorage.setItem('fcmToken', token)
//                 console.log("new fcmToken", token)

//             }
//             console.log("fcm token:", token)
//         } catch (error) {
//             console.log("error in creating token")
//         }
//     }


// }


// export async function notificationListeners() {
//     // const unsubscribe = messaging().onMessage(async remoteMessage => {
//     //     console.log('A new FCM message arrived!', remoteMessage);
//     //     onDisplayNotification(remoteMessage)
//     // });


//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//             'Notification caused app to open from background state:',
//             remoteMessage,
//         );

//     });

//     // 

//     messaging().onMessage(async remoteMessage => {
//         console.log("forground notification", remoteMessage)
//         alert("forground notification",remoteMessage)
//     })

//     // Check whether an initial notification is available
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             if (remoteMessage) {
//                 console.log(
//                     'Notification caused app to open from quit state:',
//                     remoteMessage.notification,
//                 );

//             }
//         });

//     // return unsubscribe;
// }











///
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import NavigationServices from '../Navigation/NavigationServices';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}


const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log("old fcmToken", fcmToken)

    if (!fcmToken) {
        try {
            const token = await messaging().getToken()
            if (token) {
                await AsyncStorage.setItem('fcmToken', token)
                console.log("new fcmToken", token)

            }
            console.log("fcm token:", token)
        } catch (error) {
            console.log("error in creating token")
        }
    }


}


// export async function notificationListeners() {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//         console.log('A new FCM message arrived!', remoteMessage);
//         // NavigationService.navigate("Setting")

//         if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Setting") {
//             setTimeout(() => {
//                 NavigationService.navigate("Setting", { data: remoteMessage?.data })
//             }, 1200);
//         }
//     });





//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//             'Notification caused app to open from background state:',
//             remoteMessage,
//         );

//     });




//     // 
//     // messaging().onMessage(async remoteMessage => {
//     //     console.log("forground notification", remoteMessage)
//     //     alert("forground notification", remoteMessage)
//     // })

//     // Check whether an initial notification is available
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             if (remoteMessage) {
//                 console.log(
//                     'Notification caused app to open from quit state:',
//                     remoteMessage.notification,
//                 );

//             }
//         });

//     return unsubscribe;
// }


// export async function notificationListeners() {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//         console.log('A new FCM message arrived!', remoteMessage);
//         // onDisplayNotification(remoteMessage)
//         // NavigationService.navigate("Test1")


//     });


//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//             'Notification caused app to open from background state:',
//             remoteMessage,
//         );
//         setTimeout(() => {
//             NavigationService.navigate("Notification")
//             console.log("Navigate")
//         }, 1200);
//     });

//     // 

//     messaging().onMessage(async remoteMessage => {
//         console.log("forground notification", remoteMessage)
//         alert(`forground notification${remoteMessage?.notification?.title}`,)
//     })

//     // Check whether an initial notification is available
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {

//             console.log("kill State Remote Message", remoteMessage)
//             if (remoteMessage) {
//                 console.log(
//                     'Notification caused app to open from quit state:',
//                     remoteMessage.notification,
//                 );

//                 setTimeout(() => {
//                     NavigationService.navigate("Notification")
//                     console.log("Navigate In Kill State")
//                 }, 1200);

//             }

//         });


//     // Handle messages received when the app is in the background or terminated
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//         console.log('setBackgroundMessageHandler message:', remoteMessage);
//     });

//     return unsubscribe;
// }









export async function notificationListeners() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);
        // onDisplayNotification(remoteMessage)
        // NavigationService.navigate("Test1")


    });


    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );
        if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Notification") {
            setTimeout(() => {
                NavigationService.navigate("Notification", { data: remoteMessage?.data })
            }, 1200);
        }

    });

    // 

    messaging().onMessage(async remoteMessage => {
        console.log("forground notification", remoteMessage)
        alert(`forground notification${remoteMessage?.notification?.title}`,)
        // if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Notification") {
        //     setTimeout(() => {
        //         NavigationService.navigate("Notification", { data: remoteMessage?.data })
        //     }, 1200);
        // }
    })

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {

            console.log("kill State Remote Message", remoteMessage)
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );

                if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Notification") {
                    setTimeout(() => {
                        NavigationServices.navigate("Notification", { data: remoteMessage?.data })
                    }, 1200);
                }

                // setTimeout(() => {
                //     // NavigationService.navigate("Notification")
                //     console.log("Navigate In Kill State")
                // }, 1200);

            }

        });


    // Handle messages received when the app is in the background or terminated
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('setBackgroundMessageHandler message:', remoteMessage);
    });

    return unsubscribe;
}
