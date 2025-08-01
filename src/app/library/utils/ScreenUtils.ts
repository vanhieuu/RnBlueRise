import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export const isIphoneX = () => {
  const dimension = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimension.height >= 812 ||
      dimension.width >= 812 ||
      dimension.height >= 896 ||
      dimension.width >= 896)
  );
};
export const isIpad = () => {
  return Platform.OS === 'ios' && Platform.isPad;
};

export function DynamicSize(
  value: number,
  customWidth?: number,
  standardScreenHeight = 375,
) {
  const dynamicSize = (value * (customWidth || width)) / standardScreenHeight;
  // console.log(dynamicSize)
  return Math.round(dynamicSize);
}

export const heightLize: (size: number, h?: number, hscale?: any) => number = (
  size,
  h,
  hscale,
) => {
  const newSize = size * (h || hscale);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const ifIphoneX = (a: number, b: number) => {
  if (isIphoneX()) {
    return a;
  }
  return b;
};

export default class ScreenUtils {
  static isIphoneX() {
    return isIphoneX();
  }

  static ifIphoneX(a: any, b: any) {
    return ifIphoneX(a, b);
  }

  static getPaddingBottomIphoneX() {
    return ifIphoneX(34, 0);
  }
  static withScreen() {
    return width;
  }
  static heightScreen() {
    return height;
  }
}
