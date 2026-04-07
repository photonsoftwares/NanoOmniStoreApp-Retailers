import notifee from '@notifee/react-native';

export const createChannel = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'bell',
    importance: 4,
  });
};