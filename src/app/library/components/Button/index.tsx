import {AppTheme, useTheme} from '@theme';
import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  title: string;
  iconLeft?: any;
  iconRight?: any;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  activeOpacity?: number;
  loading?: boolean;
};

const Button = ({
  onPress = () => {},
  onLongPress = () => {},
  title = '',
  iconLeft,
  iconRight,
  style,
  textStyle,
  disabled = false,
  activeOpacity = 0.5,
  loading = false,
}: ButtonProps) => {
  const theme = useTheme();
  const styles = buttonStyles(theme);
  return (
    <View style={{padding: 2}}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        activeOpacity={activeOpacity}
        style={[
          disabled
            ? (styles.disabledButton as ViewStyle)
            : (styles.button as ViewStyle),
          style,
        ]}>
        {iconLeft}
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
        {iconRight}
      </TouchableOpacity>
    </View>
  );
};

const buttonStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      backgroundColor: '#42a5f5',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      shadowColor: theme.colors.black_08,
      shadowOffset: {width: 0, height: 0},
      // shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 5,
      // Add any additional styles or override default styles here
    },
    disabledButton: {
      backgroundColor: 'grey',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      shadowColor: theme.colors.black_06,
      shadowOffset: {width: 0, height: 0},
      // shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      // Add any additional styles or override default styles here
    },
  });

export default Button;
