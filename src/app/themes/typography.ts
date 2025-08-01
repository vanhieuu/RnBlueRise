import {Platform} from 'react-native';

export const FontDefault = {
  primary: Platform.select({
    ios: 'BeVietnamPro-Regular',
    android: 'BeVietnamPro-Regular',
  }) as any,
  secondary: Platform.select({
    ios: 'BeVietnamPro-Regular',
    android: 'BeVietnamPro-Regular',
  }) as string,
  bold:Platform.select({
    ios:'BeVietnamPro-Bold',
    android:'BeVietnamPro-Bold'
  }) as string,
  medium:Platform.select({
    ios:'BeVietnamPro-Medium',
    android:'BeVietnamPro-Medium'
  }) as string,
  popup:Platform.select({
    ios:'roboto-regular',
    android:'roboto-regular'
  }) as string,
};
export type FontFamily = keyof typeof FontDefault;
