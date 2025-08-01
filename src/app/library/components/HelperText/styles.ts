import {FontDefault} from '@theme/typography';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 3,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    overflow: 'hidden',
    marginBottom: 15,
  } as ViewStyle,
  text: {
    fontWeight: '400',
    fontSize: 12,
    fontFamily: FontDefault.primary,
  } as TextStyle,
  hiddenView: {
    position: 'absolute',
    zIndex: -999,
    opacity: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // overflow: 'hidden',
  } as ViewStyle,
});
