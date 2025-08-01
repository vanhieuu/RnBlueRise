import {useEffect} from 'react';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {View, StyleSheet} from 'react-native';
import {useSelector} from '@common';
import {shallowEqual} from 'react-redux';
import {useTheme} from '@theme';
import {sizeScale} from '@utils';
import { FontDefault } from '../../../themes/typography';

export type MovingTextProps = {
  text: string;
  animationThreshold: number;
  style?: any;
  styleBody: any;
};

export const MovingText = ({
  text,
  animationThreshold,

  styleBody,
}: MovingTextProps) => {
  const translateX = useSharedValue(0);
  const currentFont = useSelector(state => state.app.currentFont, shallowEqual);
  const currentFontSize = useSelector(
    state => state.app.currentFontSize,
    shallowEqual,
  );
  const theme = useTheme();
  const shouldAnimate = text?.length >= animationThreshold;

  const textWidth = text?.length * 8;

  useEffect(() => {
    if (!shouldAnimate) return;

    translateX.value = withRepeat(
      withTiming(-textWidth / 1.75, {
        duration: 7000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [translateX, text, animationThreshold, shouldAnimate, textWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <View style={styleBody}>
      <Animated.Text
        numberOfLines={1}
        style={[
          animatedStyle,
          shouldAnimate && {
            width: textWidth,
            fontFamily: FontDefault[currentFont || 'primary'] ,
            fontWeight: '700',
            fontSize: sizeScale(15 * (currentFontSize / 100 || 1)),
            lineHeight: sizeScale(18 * (currentFontSize / 120 || 1)),
            // color: theme.colors.text,
            color:'white'
          },
        ]}>
        {text}
      </Animated.Text>
    </View>
  );
};
