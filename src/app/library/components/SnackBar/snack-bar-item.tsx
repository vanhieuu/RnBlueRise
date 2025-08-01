/* eslint-disable no-undef */
import {sharedTiming, useSharedTransition} from '@animated';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {
  BG_ERROR,
  BG_INFO,
  BG_SUCCESS,
  BG_WARN,
  DURATION_ANIMATED,
} from './constants';
import {styles} from './styles';
import {SnackBarItemProps, TypeMessage} from './type';
import {height} from '@utils';
import {SvgIcon} from '../svg-icon';
import {Block} from '../Block';

const getColor = (
  typeMessage: TypeMessage,
  borderLeftColor: Omit<SnackBarItemProps, 'item' | 'onPop'>,
): string => {
  const {
    borderLeftColorError,
    borderLeftColorInfo,
    borderLeftColorSuccess,
    borderLeftColorWarn,
  } = borderLeftColor;
  switch (typeMessage) {
    case 'success':
      return borderLeftColorSuccess ? borderLeftColorSuccess : BG_SUCCESS;
    case 'info':
      return borderLeftColorInfo ? borderLeftColorInfo : BG_INFO;
    case 'warn':
      return borderLeftColorWarn ? borderLeftColorWarn : BG_WARN;
    case 'error':
      return borderLeftColorError ? borderLeftColorError : BG_ERROR;
    default:
      return borderLeftColorSuccess ? borderLeftColorSuccess : BG_SUCCESS;
  }
};

const getIcon = (type: TypeMessage) => {
  switch (type) {
    case 'success':
      return <SvgIcon source="SuccessIcon" size={20} />;
    case 'error':
      return <SvgIcon source="ErrorIcon" size={20} />;

    default:
      return <SvgIcon source="SuccessIcon" size={20} />;
  }
};

export const SnackItem = memo(
  ({
    item,
    onPop,
    borderLeftColorError,
    borderLeftColorInfo,
    borderLeftColorSuccess,
    borderLeftColorWarn,
  }: SnackBarItemProps) => {
    // state
    const [isShow, setIsShow] = useState<boolean>(true);

    // reanimated
    const opacity = useSharedTransition(isShow, {duration: DURATION_ANIMATED});
    const translateY = useSharedValue(item.position === 'top' ? -150 : height);
    const translateX = useSharedValue(0);

    // function
    const _onClose = useCallback(() => {
      setIsShow(false);
    }, []);

    // effect
    useEffect(() => {
      const id = setTimeout(() => {
        setIsShow(false);
      }, item.interval + DURATION_ANIMATED);

      return () => {
        clearTimeout(id);
      };
    }, [item.interval]);

    useEffect(() => {
      if (isShow) {
        translateY.value = sharedTiming(
          item.position === 'top' ? 10 : height - 200,
          {
            duration: DURATION_ANIMATED,
            easing: Easing.inOut(Easing.ease),
          },
        );
      } else {
        translateX.value = sharedTiming(-999, {
          duration: DURATION_ANIMATED,
          easing: Easing.inOut(Easing.ease),
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShow]);

    useEffect(() => {
      let id: NodeJS.Timeout | null = null;
      if (!isShow) {
        id = setTimeout(() => {
          onPop(item);
        }, DURATION_ANIMATED);
      }
      return () => {
        if (id) {
          clearTimeout(id);
        }
      };
    }, [isShow, item, onPop]);

    // animated style
    const itemBarAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {translateY: translateY.value},
        {translateX: translateX.value},
      ],
      opacity: opacity.value,
    }));

    // render
    return (
      <Animated.View
        style={[styles.itemBar as ViewStyle, itemBarAnimatedStyle]}>
        {getIcon(item.type)}
        <Block width={10} />
        <Text
          style={[
            styles.text,
            {
              color: getColor(item.type, {
                borderLeftColorError,
                borderLeftColorInfo,
                borderLeftColorSuccess,
                borderLeftColorWarn,
              }),
            },
          ]}>
          {item.msg}
        </Text>
        <Animated.View>
          <TouchableOpacity onPress={_onClose}>
            <Text
              style={{
                color: getColor(item.type, {
                  borderLeftColorError,
                  borderLeftColorInfo,
                  borderLeftColorSuccess,
                  borderLeftColorWarn,
                }),
              }}>
              X
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  },
  () => true,
);
