import {Platform, StatusBar, Dimensions} from 'react-native';
import {isIphoneX} from '../library/utils/ScreenUtils';

const {height, width} = Dimensions.get('window');
const standardLength = width > height ? width : height;
const offset =
  width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight;

const deviceHeight =
  isIphoneX() || Platform.OS === 'android' && offset
    ? standardLength - (offset ? offset : 0)
    : standardLength;

export function RFPercentage(percent:number) {
  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
}

// guideline height for standard 5" device screen is 680 deviceHeight <= 568 ? fontSize :
export function RFValueVertical(fontSize:number, standardScreenHeight = 680) {
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

export function RFValueHorizontal(
  fontSize:number,
  customWidth?:number,
  standardScreenHeight = 375,
) {
  const heightPercent = Math.round(
    (fontSize * (customWidth || width)) / standardScreenHeight,
  );
  return heightPercent > fontSize + 5 ? fontSize + 5 : heightPercent;
}

export function DynamicFont(fontSize:number, customWidth:number, standardScreenHeight = 375) {
  const heightPercent = Math.round(
    (fontSize * (customWidth || width)) / standardScreenHeight,
  );
  return heightPercent > fontSize + 5
    ? fontSize + 5
    : heightPercent <= fontSize - 3
    ? fontSize - 3
    : heightPercent;
}
