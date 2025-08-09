import {StyleSheet, Dimensions, StyleProp} from 'react-native';
import {AppTheme} from '@theme';
import {ImageStyle} from '@d11/react-native-fast-image';
import {createThemedStyles} from '@utils';
const {width} = Dimensions.get('screen');
const heightImage = (width * 266) / 221;
export const styles = (theme: AppTheme) =>
  createThemedStyles({
    text: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: '700',
    },
    block: {
      // marginHorizontal: 16,
      paddingHorizontal:16,
      backgroundColor:theme.colors.body,
      flex:1
    },
    screens: {
      backgroundColor: theme.colors.white,
      paddingTop: 5,
    },
    modalView: {
      width: '90%',
      borderRadius: 10,
      height: 180,
      backgroundColor: theme.colors.white,
    },
  });

export const buttonStyle = (theme: AppTheme) =>
  createThemedStyles({
    button: {
      textAlign: 'center',
      // paddingVertical:10,
      height: 48,
      backgroundColor: theme.colors.newUiPrimary,
      borderRadius: 8,
      shadowColor: theme.colors.newUiPrimary,
      // shadowColor:'rgba(255, 176, 0, 0.16)',
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.3,
      elevation: 7,
      marginTop: 20,
      marginBottom: 20,
      flex:1
    },
    socialButton: {
      borderRadius: 16,
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 5,
      // alignContent:'center'
    },
    hideModalButton: {
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '40%',
      height: 40,
      borderRadius: 20,
    },
    contactButton: {
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      width: '40%',
      height: 40,
      borderRadius: 20,
    },
  });

export const newUiStyle = (theme: AppTheme) =>
  StyleSheet.create({
    linearBackground: {
      flex: 1,
    },
    bottomView: {
      flex: 1,
      backgroundColor: theme.colors.white,
      position: 'absolute',
      width: '100%',
      bottom: 0,
      borderTopRightRadius: 32,
      borderTopLeftRadius: 32,
      height: '90%',
    },
    imageBackgroundStyle: {
      width: width,
      height: heightImage,
      backgroundColor: 'transparent',
    },
    pageView: {
      flex: 1,
    },
    imageStyle: {
      width: 160,
      height: 160,
      resizeMode: 'contain',
      marginVertical: 16,
      alignSelf: 'center',
    } as StyleProp<ImageStyle>,
    buttonStyle: {
      height: 48,
      backgroundColor: theme.colors.newUiPrimary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginHorizontal: 24,
      marginBottom: 8,
    },
    buttonContactStyle: {
      height: 48,
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginHorizontal: 24,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.newUiPrimary,
    },
  });
