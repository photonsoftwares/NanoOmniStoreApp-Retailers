<<<<<<< Updated upstream
import Sound from 'react-native-sound';
import Tts from 'react-native-tts';

Tts.setDefaultLanguage('en-US');
Tts.setDefaultRate(0.5);

Sound.setCategory('Playback');

export const playSound = (message = 'New order received') => {
    const sound = new Sound('bell', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('❌ Sound load error:', error);

            // 🔊 FALLBACK → TTS
            Tts.stop();
            Tts.speak(message);

            return;
        }

        console.log('✅ Sound loaded');

        sound.play((success) => {
            if (success) {
                console.log('🔔 Sound played');
            } else {
                console.log('❌ Sound failed');

                // 🔊 FALLBACK → TTS
                Tts.stop();
                Tts.speak(message);
            }
            sound.release();
        });
    });
=======
import notifee, { AndroidImportance } from '@notifee/react-native';

export const playNotificationSound = async (title, body) => {
  await notifee.displayNotification({
    title: title || 'New Order',
    body: body || 'You got a new order',
    android: {
      channelId: 'default',
      pressAction: {
        id: 'default',
      },
    },
  });
>>>>>>> Stashed changes
};