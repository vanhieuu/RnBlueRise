

import {onCheckType} from '@common';
import {Text} from '@components';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import {styles} from './styles';
import {InputFlatProps} from './type';
import { useInterpolate, useSharedTransition } from '@animated';

const UN_ACTIVE_COLOR = 'rgb(159,152,146)';
const ACTIVE_COLOR = '#4788FF';
const ERROR_COLOR = '#FF5F57';

export const InputFlat = forwardRef<any, InputFlatProps>((props, ref) => {
  // props
  const {
    defaultValue,
    label,
    labelTx,
    placeholder,
    placeholderTx,
    placeholderColor = UN_ACTIVE_COLOR,
    trigger,
    nameTrigger,
    inputStyle: inputStyleOverwrite = {},
    errorBorderColor = ERROR_COLOR,
    errorLabelColor = ERROR_COLOR,
    disabledLabelColor = UN_ACTIVE_COLOR,
    activeTintBorderColor = ACTIVE_COLOR,
    activeTintLabelColor = ACTIVE_COLOR,
    unActiveTintBorderColor = UN_ACTIVE_COLOR,
    unActiveTintLabelColor = UN_ACTIVE_COLOR,
    disabledBorderColor = UN_ACTIVE_COLOR,
    disabled = false,
    error = undefined,
    rightChildren = undefined,
    containerStyle: containerStyleOverwrite = {},
    onChangeText,
    onFocus,
    onBlur,
    onSubmit,
    rxRemove,
    ...rest
  } = props;

  // state
  const [t] = useTranslation();
  const [heightContainerInput, setHeightContainerInput] = useState(0);
  const [focused, setFocused] = useState(false);
  const [localDefaultValue, setLocalDefaultValue] = useState('');
  const [value, setValue] = useState('');

  // reanimated
  const progress = useSharedTransition(focused || value.length > 0, {
    duration: 150,
  });

  const bottom = useInterpolate(
    progress,
    [0, 1],
    [0, heightContainerInput - 10],
  );

  const fontLabel = useInterpolate(progress, [0, 1], [14, 12]);

  const labelColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledLabelColor;
      case error:
        return errorLabelColor;
      case focused:
        return activeTintLabelColor;
      default:
        return unActiveTintLabelColor;
    }
  });

  const borderColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledBorderColor;
      case error:
        return errorBorderColor;
      case focused:
        return activeTintBorderColor;
      default:
        return unActiveTintBorderColor;
    }
  });

  // function
  const onLayoutContainerInput = useCallback((e: LayoutChangeEvent) => {
    setHeightContainerInput(e.nativeEvent.layout.height);
  }, []);

  const _onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (onCheckType(onFocus, 'function')) {
        onFocus(e);
      }
      setFocused(true);
    },
    [onFocus],
  );

  const _onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (onCheckType(onBlur, 'function')) {
        onBlur(e);
      }
      setFocused(false);
    },
    [onBlur],
  );

  const _onChangeText = useCallback(
    (text: string) => {
      const actualText =
        rxRemove !== undefined ? text.replace(rxRemove, '') : text;

      if (onCheckType(onChangeText, 'function')) {
        onChangeText(actualText);
      }
      if (
        trigger &&
        onCheckType(trigger, 'function') &&
        nameTrigger &&
        onCheckType(nameTrigger, 'string')
      ) {
        setTimeout(() => {
          trigger(nameTrigger);
        }, 0);
      }
      setValue(actualText);
    },
    [nameTrigger, onChangeText, rxRemove, trigger],
  );

  // effect
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setLocalDefaultValue(String(defaultValue));
    }
  }, [defaultValue]);

  // string
  const labelText = useMemo(
    () => (labelTx && t(labelTx)) || label || undefined,
    [labelTx, label, t],
  );

  const placeHolder = useMemo(
    () => (placeholderTx && t(placeholderTx)) || placeholder || '',
    [placeholder, placeholderTx, t],
  );

  // reanimated style
  const wrapLabelStyle = useAnimatedStyle(() => ({
    bottom: bottom.value,
  }));

  const labelStyle = useAnimatedStyle(() => ({
    fontSize: fontLabel.value,
    color: labelColor.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  // render
  return (
    <Animated.View
      style={[
        styles.container,
        containerStyleOverwrite,
        containerAnimatedStyle,
      ]}>
      <View style={[styles.content as ViewStyle]}>
        {(placeholderTx || placeholder) && value.length === 0 && (
          <View style={[styles.wrapPlaceHolder as ViewStyle]} pointerEvents={'none'}>
            <Text
              tx={placeholderTx}
              text={placeHolder}
              color={placeholderColor}
            />
          </View>
        )}
        {labelText && (
          <Animated.View
            pointerEvents={'none'}
            style={[styles.wrapLabel as ViewStyle, wrapLabelStyle]}>
            <Animated.Text style={[labelStyle]}>
              {labelText ?? ''}
            </Animated.Text>
          </Animated.View>
        )}
        <View style={[styles.flex]} onLayout={onLayoutContainerInput}>
          <TextInput
            defaultValue={localDefaultValue}
            autoCorrect={false}
            selectionColor={activeTintBorderColor}
            underlineColorAndroid={'transparent'}
            clearButtonMode={'never'}
            editable={!disabled}
            style={[styles.input, inputStyleOverwrite]}
            ref={ref}
            onSubmitEditing={onSubmit}
            {...rest}
            onChangeText={_onChangeText}
            onFocus={_onFocus}
            onBlur={_onBlur}
          />
        </View>
        {rightChildren && rightChildren}
      </View>
    </Animated.View>
  );
});
