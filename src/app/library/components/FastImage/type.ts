
import {ViewStyle, StyleProp} from 'react-native';
import { Source,ImageStyle } from "@d11/react-native-fast-image";
import { ImageTypes } from '@assets/image';

type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center';

export interface ImageProps {
  /**
   * Overwrite image style
   * @default undefined
   */
  style: ImageStyle;

  /**
   * Overwrite wrap image style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Source image(local)
   * @default undefined
   */
  source: ImageTypes;

  /**
   * Custom resizeMode
   * @default contain
   */
  resizeMode?: ResizeMode;
  /**
   * Check is using Animated
   * @default false
   */
  isAnimated?: boolean;
}
