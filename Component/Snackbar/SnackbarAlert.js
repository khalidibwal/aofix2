// SnackbarService.js
import Snackbar from 'react-native-snackbar';

export const showSnackbar = (message, duration) => {
  Snackbar.show({
    text: message,
    duration: duration,
    backgroundColor:'red'
  });
};
