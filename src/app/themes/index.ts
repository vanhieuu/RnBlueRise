import {Theme, useTheme as useThemeRN} from '@react-navigation/native';

import {ColorDefault, ColorDark} from './color';
import { FontDefault } from './typography';
type ColorDefault = typeof ColorDefault;
type ColorDark = typeof ColorDark;

export type Colors = ColorDefault & ColorDark;
export type AppTheme = Theme & {colors: Colors};

const Default: AppTheme = {
  dark: false,
  colors: ColorDefault,
 fonts: {
    regular: {
      fontFamily: FontDefault.primary,
      fontWeight: '400',
    },
    medium: {
      fontFamily: FontDefault.medium,
      fontWeight: '500',
    },
    bold: {
      fontFamily: FontDefault.bold,
      fontWeight: '700',
    },
    heavy: {
      fontFamily: FontDefault.bold,
      fontWeight: '700',
    },
  },
};
const Dark: AppTheme = {
  dark: true,
  colors: ColorDark,
 fonts: {
     regular: {
      fontFamily: FontDefault.primary,
      fontWeight: '400',
    },
    medium: {
      fontFamily: FontDefault.medium,
      fontWeight: '500',
    },
    bold: {
      fontFamily: FontDefault.bold,
      fontWeight: '700',
    },
    heavy: {
      fontFamily: FontDefault.bold,
      fontWeight: '700',
    },
  },
};
export const MyAppTheme = {
  default: Default,
  dark: Dark,
};

export type ThemeType = keyof typeof MyAppTheme;

export const useTheme = () => {
  const payload = useThemeRN() as AppTheme;
  return payload;
};
