import {Dimensions, Platform} from 'react-native';

let pressing = false;

export default {
  isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 780 ||
        dimen.width === 780 ||
        dimen.height === 812 ||
        dimen.width === 812 ||
        dimen.height === 844 ||
        dimen.width === 844 ||
        dimen.height === 896 ||
        dimen.width === 896 ||
        dimen.height === 926 ||
        dimen.width === 926)
    );
  },
  debounce(callback, second = 1500) {
    if (pressing) {
      return;
    }
    if (!pressing) {
      callback();
    }
    pressing = true;
    setTimeout(() => {
      pressing = false;
    }, second);
  },
};
