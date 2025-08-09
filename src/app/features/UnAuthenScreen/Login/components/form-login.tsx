import React, {memo, useCallback, useEffect, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {FormProvider, useForm} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Input} from './input';
import {Block, SvgIcon, Text} from '@components';
import {useTheme} from '@theme';

import {FormLoginType} from './type';
import {buttonStyle, styles} from '../style';
import {navigate} from '@navigation/navigation-services';
import {APP_SCREEN} from '@navigation/screen-type';
import Button from '@library/components/Button';
import {createThemedStyles} from '@utils';
import {dispatch, useSelector} from '@common';
import {shallowEqual} from 'react-redux';
import {appActions} from '@store/appRedux/reducer';

interface FormLoginProps {
  onSubmit: (data: FormLoginType) => void;
  onPressBio: () => void;
}

const FormLoginComponent = ({onSubmit, onPressBio}: FormLoginProps) => {
  // state
  const rememberLogin = useSelector(
    state => state.app.rememberLogin,
    shallowEqual,
  );
  const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  );

  const validate = useMemo<yup.ObjectSchema<FormLoginType>>(
    () =>
      yup
        .object()
        .shape({
          name: yup
            .string()
            .required('SĐT không được để trống')
            .matches(phoneRegex, 'SĐT không hợp lệ'),
          password: yup
            .string()
            .required('Mật khẩu không được để trống')
            .min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
        })
        .required(),
    [],
  );

  const formMethod = useForm<FormLoginType>({
    mode: 'onSubmit',
    resolver: yupResolver(validate),
  });
  const theme = useTheme();

  // function
  const onSubmitKey = useCallback(() => {
    formMethod.handleSubmit(onSubmit)();
  }, [formMethod, onSubmit]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      formMethod.clearErrors;
    }, 3000);

    return clearTimeout(timeOut);
  }, [formMethod, onSubmit]);

  // render
  return (
    <Block style={styles(theme).block}>
      <FormProvider {...formMethod}>
        <Input
          name={'name'}
          placeholder={'Số điện thoại phụ huynh'}
          typeInput={'outline'}
          secureTextEntry={false}
          leftChild={true}
          leftIcon="UserIcon"
          inputMode="numeric"
          title=""
          // defaultValue="vanhieudev@gmail.com"
        />

        <Input
          name={'password'}
          secureTextEntry={true}
          placeholder={'Nhập mật khẩu'}
          leftChild={true}
          leftIcon="LockIcon"
          typeInput={'outline'}
          title=""
          // defaultValue="123456ls"
        />
      </FormProvider>
      <Block direction="row" justifyContent="flex-end">
        {/* <TouchableOpacity
          onPress={() => navigate(APP_SCREEN.FORGOT_PASSWORD_NAV)}>
          <Text
            colorTheme="newUiPrimary"
            fontSize={16}
            fontWeight="bold"
            fontFamily="primary">
            Quên mật khẩu
          </Text>
        </TouchableOpacity> */}
      </Block>
      <Block direction="row" alignItems="center" justifyContent="space-between">
        <TouchableOpacity
          onPress={onSubmitKey}
          style={buttonStyle(theme).button}>
          <Text style={styles(theme).text} colorTheme="white">
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={eStyles.buttonBiometric} onPress={onPressBio}>
          <SvgIcon
            source="FingerPrintIcon"
            size={40}
            style={{alignSelf: 'flex-end'}}
          />
        </TouchableOpacity>
      </Block>
      <TouchableOpacity
        onPress={() => dispatch(appActions.onSetRememberLogin(!rememberLogin))}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Block
          width={10}
          height={10}
          borderWidth={1}
          borderColor={theme.colors.newUiPrimary}>
          <Text
            colorTheme={rememberLogin ? 'newUiPrimary' : 'transparent'}
            fontSize={12}>
            {rememberLogin ? '☑' : '☐'}
          </Text>
        </Block>
        <Text
          colorTheme="newUiPrimary"
          fontSize={12}
          fontWeight="bold"
          fontFamily="primary">
          {' '}
          Lưu thông tin đăng nhập
        </Text>
      </TouchableOpacity>
    </Block>
  );
};

export const FormLogin = memo(FormLoginComponent, isEqual);
const eStyles = createThemedStyles({
  buttonBiometric: {
    // flex: 1,
    width: 40,
    height: 40,
    alignItems: 'center',
  },
});
