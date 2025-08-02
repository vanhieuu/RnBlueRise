import {sizeScale} from '@common';
import {ColorDefault} from '@theme/color';
import {StyleSheet} from 'react-native';
const WIDTH_OTP = 45;
const HEIGHT_OTP = 50;
export const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpView: {
    width: WIDTH_OTP,
    height: HEIGHT_OTP,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ColorDefault.border,
  },
  otpViewActive: {
    borderColor: ColorDefault.newUiPrimary,
  },
  otpText: {
    fontSize: sizeScale(14),
    color: '#000',
    textAlignVertical: 'bottom',
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    // width: '100%',
    flex: 1,
    position: 'absolute',
    textAlign: 'center',
    height: HEIGHT_OTP,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    color: 'transparent',
    opacity: 0,
  },
});
