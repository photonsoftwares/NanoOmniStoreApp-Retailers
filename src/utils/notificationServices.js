
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import NavigationServices from '../Navigation/NavigationServices';




import notifee, { AndroidImportance } from '@notifee/react-native';

// import Tts from 'react-native-tts';
import { Alert } from 'react-native';
import { playSound } from '../utils/soundService';


// Tts.setDefaultLanguage('en-US');
// Tts.setDefaultRate(0.5);
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('Authorization status::', authStatus);

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}


export const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log("old fcmToken", fcmToken, fcmToken == null)

    if (fcmToken == null) {
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
//         // onDisplayNotification(remoteMessage)
//         // NavigationService.navigate("Test1")


//     });


//     messaging().onNotificationOpenedApp(remoteMessage => {
//         // console.log(
//         //     'Notification caused app to open from background state:',
//         //     remoteMessage,
//         // );
//         if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Notification") {
//             setTimeout(() => {
//                 NavigationServices.navigate("Notification", { data: remoteMessage?.data })
//             }, 1200);
//         }

//     });

//     // 

//     messaging().onMessage(async remoteMessage => {
//         // console.log("forground notification", remoteMessage)
//         Alert.alert(`${remoteMessage?.notification?.title}`, `${remoteMessage?.notification?.body}`)
//         // if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Notification") {
//         //     setTimeout(() => {
//         //         NavigationService.navigate("Notification", { data: remoteMessage?.data })
//         //     }, 1200);
//         // }

//     })

//     // Check whether an initial notification is available
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {

//             // console.log("kill State Remote Message", remoteMessage)
//             if (remoteMessage) {
//                 // console.log(
//                 //     'Notification caused app to open from quit state:',
//                 //     remoteMessage.notification,
//                 // );

//                 if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Notification") {
//                     setTimeout(() => {
//                         NavigationServices.navigate("Notification", { data: remoteMessage?.data })
//                     }, 1200);
//                 }

//                 // setTimeout(() => {
//                 //     // NavigationService.navigate("Notification")
//                 //     console.log("Navigate In Kill State")
//                 // }, 1200);

//             }

//         });


//     // Handle messages received when the app is in the background or terminated
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//         // console.log('setBackgroundMessageHandler message:', remoteMessage);
//     });

//     return unsubscribe;
// }
// export async function notificationListeners() {

//     const unsubscribe = messaging().onMessage(async remoteMessage => {

//         console.log("🔥 FULL PAYLOAD:", JSON.stringify(remoteMessage, null, 2));

//         const title = remoteMessage?.notification?.title || 'New Order';
//         const body = remoteMessage?.notification?.body || 'New order received';

//         Alert.alert(title, body);

//        playSound(`New order received. ${body}`);
//     });

//     messaging().onNotificationOpenedApp(remoteMessage => {
//         if (remoteMessage?.data?.redirect_to === "Notification") {
//             NavigationServices.navigate("Notification", {
//                 data: remoteMessage?.data
//             });
//         }
//     });

//     messaging().getInitialNotification().then(remoteMessage => {
//         if (remoteMessage?.data?.redirect_to === "Notification") {
//             NavigationServices.navigate("Notification", {
//                 data: remoteMessage?.data
//             });
//         }
//     });

//     return unsubscribe;
// }





// Listen to background & foreground FCM messages
messaging().onMessage(async remoteMessage => {
    const title = remoteMessage?.notification?.title || 'New Order';
    const body = remoteMessage?.notification?.body || 'New order received';

    // 🔔 Show local notification
    await notifee.displayNotification({
        title: title,
        body: body,
        android: {
            channelId: 'orders',
            importance: AndroidImportance.HIGH,
            smallIcon: 'ic_launcher', // your app icon
        },
    });
          Alert.alert(`New order received. ${body}`)
    // 🔊 Play sound
    playSound(`New order received. ${body}`);
});

// Background messages (app running in background)
messaging().setBackgroundMessageHandler(async remoteMessage => {
    const title = remoteMessage?.notification?.title || 'New Order';
    const body = remoteMessage?.notification?.body || 'New order received';

    await notifee.displayNotification({
        title,
        body,
        android: {
            channelId: 'orders',
            importance: AndroidImportance.HIGH,
            smallIcon: 'ic_launcher',
        },
    });

    playSound(`New order received. ${body}`);
});

// Create Android notification channel once
export async function createNotificationChannel() {
    await notifee.createChannel({
        id: 'orders',
        name: 'Order Notifications',
        importance: AndroidImportance.HIGH,
        sound: 'default', // or your custom sound file
    });
}
// export async function notificationListeners() {

//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//         console.log('A new FCM message arrived!', remoteMessage);

//         const title = remoteMessage?.notification?.title || 'New Order';
//         const body = remoteMessage?.notification?.body || 'New order received';

//         // Alert show
//         Alert.alert(title, body);

//         // 🔊 TTS SOUND
//         Tts.stop(); // previous voice stop
//         Tts.speak(`New order received. ${body}`);
//     });

//     messaging().onNotificationOpenedApp(remoteMessage => {
//         if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Notification") {
//             setTimeout(() => {
//                 NavigationServices.navigate("Notification", { data: remoteMessage?.data })
//             }, 1200);
//         }
//     });

//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             if (remoteMessage) {
//                 if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Notification") {
//                     setTimeout(() => {
//                         NavigationServices.navigate("Notification", { data: remoteMessage?.data })
//                     }, 1200);
//                 }
//             }
//         });

//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//         console.log('Background message:', remoteMessage);
//     });

//     return unsubscribe;
// }
