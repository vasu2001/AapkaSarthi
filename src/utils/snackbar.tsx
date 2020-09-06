import Snackbar from 'react-native-snackbar';
import {WHITE, GRAY_DARK} from './colors';

const showSnackbar = (text: string): void => {
  Snackbar.show({
    text,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: GRAY_DARK,
    textColor: WHITE,
    fontFamily: 'Montserrat-Regular',
  });
};

export default showSnackbar;
