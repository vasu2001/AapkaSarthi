import {Platform} from 'react-native';
import {navRef} from './NavigationRef';

export default {
  onNotification: (notification: object) => {
    navRef.current?.navigate('Scheduled');
  },
  onRegistrationError: () => {
    console.log('registration error');
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
};
