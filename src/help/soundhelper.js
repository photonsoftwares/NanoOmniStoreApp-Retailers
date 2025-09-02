import SoundPlayer from 'react-native-sound-player';

const playBeep = () => {
    try {
        // Android: use playSoundFile(name, extension) -> no extension in name
        SoundPlayer.playSoundFile('beep', 'mp3');
        // iOS: automatically finds file in bundle
    } catch (e) {
        console.log('Cannot play sound', e);
    }
};

export { playBeep };
