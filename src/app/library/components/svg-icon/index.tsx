import {SvgComponent} from '@assets/svgIcon';
import {useTheme} from '@theme';
import React, {createElement, memo} from 'react';
import isEqual from 'react-fast-compare';


import {SvgIconProps} from './type';
import { TouchableOpacity } from 'react-native';
import { Block } from '@components';

const SvgIconComponent = ({
  source,
  color = '#000',
  size = 24,
  colorTheme,
  onPress,
  style,
}: SvgIconProps) => {
  // state
  const theme = useTheme();
  // render
  return onPress ? (
    <TouchableOpacity
      style={style}
      disabled={typeof onPress !== 'function'}
      onPress={onPress}>
      {createElement(SvgComponent[source], {
        width: size,
        height: size,
        fill: colorTheme ? colorTheme : color,
        color: colorTheme ? colorTheme : color,
      })}
    </TouchableOpacity>
  ) : (
    <Block style={style}>
      {createElement(SvgComponent[source], {
        width: size,
        height: size,
        fill: colorTheme ? colorTheme : color,
        color: colorTheme ? colorTheme : color,
      })}
    </Block>
  );
};

export const SvgIcon = memo(SvgIconComponent, isEqual);