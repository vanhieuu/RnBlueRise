
import { SvgIconTypes } from '@assets/svgIcon';
import { ResizeMode } from '@d11/react-native-fast-image';
import {Colors} from '@theme';

export interface IconProps {
  /**
   * Size of Icon
   * @default 24
   */
  size?: number;

  /**
   * Tint color of icon
   * @default undefined
   */
  color: string;

  /**
   * Overwrite tint color with theme
   */
  colorTheme?: keyof Colors;

  /**
   * Allow onPress to icon
   * @default undefined
   */
  onPress?: () => void;

  /**
   * Icon type
   * @default undefined
   */
  icon: SvgIconTypes;

  /**
   * Custom resizeMode
   * @default contain
   */
  resizeMode?: ResizeMode;
}
