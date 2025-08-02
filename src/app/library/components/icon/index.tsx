

import {useTheme} from '@theme';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {StyleProp, TouchableOpacity} from 'react-native';


import {IconProps} from './type';
import FastImage, { ImageStyle } from '@d11/react-native-fast-image';
import { enhance } from '@utils';

const SIZE = 24;

const IconComponent = (props: IconProps) => {
  // state
  const {
    size = SIZE,
    icon,
    colorTheme,
    resizeMode = 'contain',
    onPress,
    color,
  } = props;
  const theme = useTheme();
  // style
  const style = useMemo<StyleProp<ImageStyle>>(
    () => enhance([{width: size, height: size}]),
    [size],
  );

  // render
  return (
    <TouchableOpacity
      disabled={typeof onPress !== 'function'}
      onPress={onPress}>
      <FastImage
        style={style}
        tintColor={colorTheme ? theme.colors[colorTheme] : color}
        resizeMode={resizeMode}
        source={icon[icon]}
      />
    </TouchableOpacity>
  );
};
export const Icon = memo(IconComponent, equals);
