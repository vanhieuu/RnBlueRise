// import {useEffect, useRef} from 'react';
// import {AppState, NativeEventSubscription, Platform} from 'react-native';
// import messaging, {
//   FirebaseMessagingTypes,
// } from '@react-native-firebase/messaging';
// import notifee, {
//   AndroidCategory,
//   AndroidImportance,
//   EventType,
// } from '@notifee/react-native';
// import {
//   checkApplicationPermission,
//   dispatch,
//   requestUserPermission,
//   useSelector,
// } from '@common';

// import {navigate} from '@navigation/navigation-services';
// import {APP_SCREEN} from '@navigation/screen-type';
// import {saveFCMToken} from '@store/localStorage';
// import {appActions} from '@store/appRedux/reducer';
// import {shallowEqual} from 'react-redux';

// const delay = (timeout = 3000): Promise<void> => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// };

// const ConfigNotification = () => {
//   const appState = useRef<string>(AppState.currentState);
//   const appNotifi = useRef<FirebaseMessagingTypes.RemoteMessage | null>(null);
//   const channelIdRef = useRef<string | null>(null); // Lưu channelId để tránh bị null
//   const notiStatus = useSelector(state => state.app.configNoti, shallowEqual);

//   // Tạo kênh thông báo
//   const initializeNotificationChannel = async () => {
//     try {
//       const id = await notifee.createChannel({
//         id: 'default',
//         name: 'Default Channel',
//         description: 'Default notification channel',
//         sound: 'default',
//         importance: AndroidImportance.HIGH,
//         vibration: false,
//       });
//       channelIdRef.current = id;
//     } catch (error) {
//       console.error('Error creating notification channel:', error);
//     }
//   };

//   // Đăng ký nhận thông báo từ FCM
//   const registerForPushNotifications = async () => {
//     try {
//       await checkApplicationPermission();
//       await requestUserPermission();
//       await initializeNotificationChannel();

//       const fcmToken = await messaging().getToken();
//       await saveFCMToken(fcmToken);
//       dispatch(appActions.postToken(fcmToken));
//       console.log('FCM_Token:', fcmToken);
//     } catch (error) {
//       console.error('Error registering for push notifications:', error);
//     }
//   };

//   // Xử lý thay đổi trạng thái ứng dụng
//   const handleAppStateChange = (nextAppState: string) => {
//     if (
//       appState.current.match(/inactive|background/) &&
//       nextAppState === 'active' &&
//       appNotifi.current
//     ) {
//       checkNotifications(appNotifi.current.data);
//     }
//     appState.current = nextAppState;
//   };

//   // Kiểm tra và điều hướng thông báo
//   const checkNotifications = (notification: any) => {
//     const {view} = notification || {};
//     appNotifi.current = null;
//     if (view === 'notification') {
//       navigate(APP_SCREEN.NOTIFICATION);
//     }
//   };

//   // Hiển thị thông báo khi ở foreground
//   const handleForegroundNotification = async (
//     remoteMessage: FirebaseMessagingTypes.RemoteMessage,
//   ) => {
//     const {title, body} = remoteMessage.notification || {};
//     console.log('Foreground Notification:', title, body);
//     await notifee.requestPermission();

//     await notifee.displayNotification({
//       title: title || 'Notification',
//       body: body || 'You have received a new message.',
//       data: remoteMessage.data,
//       android: {
//         channelId: channelIdRef.current ?? 'default',
//         pressAction: {id: 'default'},
//         category: AndroidCategory.ALARM,
//         importance: AndroidImportance.HIGH,
//         timestamp: Date.now(),
//         showTimestamp: true,
//       },
//       ios: {
//         foregroundPresentationOptions: {
//           badge: true,
//           sound: true,
//           banner: true,
//           list: true,
//         },
//       },
//     });
//   };

//   // Sự kiện thông báo khi ở foreground và background
//   const handlePushNotificationEvent = (event: any) => {
//     const notification = event.detail.notification?.data;
//     switch (event.type) {
//       case EventType.DISMISSED:
//         console.log('User dismissed notification:', event.detail.notification);
//         break;
//       case EventType.PRESS:
//       case EventType.ACTION_PRESS:
//         console.log(
//           'User interacted with notification:',
//           event.detail.notification,
//         );
//         checkNotifications(notification);
//         break;
//     }
//   };

//   useEffect(() => {
//     let subscription: NativeEventSubscription;
//     let unsubscribeForeground: () => void;
//     if (notiStatus) {
//       registerForPushNotifications();
//       notifee.onForegroundEvent(handlePushNotificationEvent);
//       notifee.onBackgroundEvent(async event => {
//         if ([EventType.PRESS, EventType.ACTION_PRESS].includes(event.type)) {
//           await delay(2000);
//           handlePushNotificationEvent(event);
//         }
//       });
//       subscription = AppState.addEventListener('change', handleAppStateChange);
//       unsubscribeForeground = messaging().onMessage(
//         handleForegroundNotification,
//       );

//       messaging().setBackgroundMessageHandler(
//         async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
//           console.log('Background Message:', remoteMessage);

//           if (Platform.OS === 'android') {
//             appNotifi.current = remoteMessage;
//           }

//           await notifee.displayNotification({
//             title: remoteMessage.notification?.title || 'New Message',
//             body:
//               remoteMessage.notification?.body || 'You have a new notification',
//             android: {
//               channelId: channelIdRef.current ?? 'default',
//               smallIcon: 'ic_launcher',
//             },
//           });
//         },
//       );
//     }

//     return () => {
//       subscription.remove();
//       unsubscribeForeground();
//     };
//   }, []);

//   return null;
// };

// export default ConfigNotification;
