import {useTheme} from '@theme';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {View, ViewStyle} from 'react-native';

import {DividerProps} from './type';

const DividerComponent = (props: DividerProps) => {
  // state
  const {height = 1, colorTheme, color = '#bbb',width} = props;
  const theme = useTheme();

  // style
  const divider = useMemo<ViewStyle>(
    () => ({
      width,
      height,
      backgroundColor: colorTheme ? theme.colors[colorTheme] as string : color,
    }),
    [color, colorTheme, height, theme.colors],
  );

  // render
  return <View style={[divider]} />;
};
export const Divider = memo(DividerComponent, equals);
