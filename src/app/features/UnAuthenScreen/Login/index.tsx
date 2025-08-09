import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {FormLogin} from './components/form-login';
import {BaseScreenLayout, Block, Text} from '@components';
import {FormLoginType} from './components/type';
import ReactNativeBiometrics, {BiometryType} from 'react-native-biometrics';
import {AppModule, dispatch, useSelector} from '@common';
import {images} from '@assets/image';

import {appActions} from '@store/appRedux/reducer';
import {shallowEqual} from 'react-redux';
type Props = {};
const STORAGE_KEY = 'jwtToken';
const LoginScreen = (props: Props) => {
  const [biometricSupported, setBiometricSupported] = useState<
    BiometryType | any
  >('Biometrics');
  const [status, setStatus] = useState('');
  const [jwtToken, setJwtToken] = useState<string>('');
  const rememberLogin = useSelector(
    state => state.app.rememberLogin,
    shallowEqual,
  );

  useEffect(() => {
    // Kiểm tra hỗ trợ sinh trắc học khi load component
    checkBiometricAvailable();
    // Kiểm tra JWT đã lưu chưa
    getSavedToken();
  }, []);

  const checkBiometricAvailable = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();
    setBiometricSupported(available ? biometryType : 'Biometrics');
  };

  const getSavedToken = async () => {
    const token: any = await AppModule.MMKVStorage.getString(STORAGE_KEY);

    if (token && rememberLogin) {
      setJwtToken(token);
      dispatch(appActions.onSetLoginStatus(true));
    }
  };

  const handleBiometricSignIn = async () => {
    setStatus('Đang kiểm tra sinh trắc học...');
    const rnBiometrics = new ReactNativeBiometrics();

    // Kiểm tra lại
    const {available} = await rnBiometrics.isSensorAvailable();
    if (!available) {
      setStatus('Thiết bị không hỗ trợ sinh trắc học');
      return;
    }

    // Tạo/có cặp key chưa?
    const {keysExist} = await rnBiometrics.biometricKeysExist();
    let publicKey;
    if (!keysExist) {
      // Tạo mới
      const result = await rnBiometrics.createKeys();
      publicKey = result.publicKey;
      setStatus('Đã tạo cặp khóa sinh trắc học mới!');
    } else {
      // Lấy publicKey để gửi lên server (nếu cần)
      const result = await rnBiometrics.createKeys();
      publicKey = result.publicKey;
      setStatus('Đã có cặp khóa sinh trắc học!');
    }

    // Thông thường: Bạn sẽ gửi publicKey lên server để mapping với user/device khi đăng ký.

    // Giả lập dữ liệu đăng nhập (nên dùng username/email,...)
    const payload = 'loginRequestData:' + new Date().toISOString();

    // Yêu cầu xác thực sinh trắc học để ký dữ liệu đăng nhập
    rnBiometrics
      .createSignature({
        promptMessage: 'Xác thực để đăng nhập',
        payload,
      })
      .then(async resultObject => {
        const {success, signature} = resultObject;
        if (success) {
          setStatus('Đã ký xác thực, đang gửi lên server...');
          console.log(signature, 'signature');
          dispatch(appActions.onSetTokenLogin(signature!));
          dispatch(appActions.onSetLoginStatus(true));
          // === GIẢ LẬP: Gửi signature, publicKey, payload lên server để xác thực
          // Thực tế, bạn sẽ POST signature + payload + publicKey (nếu lần đầu) lên API
          // Server sẽ kiểm tra signature có hợp lệ với publicKey không, sau đó trả về JWT

          // --- Giả lập trả về JWT ---
          const mockJwt = 'eyJhbGciOi...demo-token...';
          await AppModule.MMKVStorage.setString(STORAGE_KEY, mockJwt);
          setJwtToken(mockJwt);
          setStatus('Đăng nhập thành công! Đã lưu JWT.');
        } else {
          setStatus('Bạn đã huỷ xác thực.');
        }
      })
      .catch(() => {
        setStatus('Lỗi khi ký dữ liệu hoặc sinh trắc học bị lỗi.');
      });
  };

  const handleLogout = async () => {
    await AppModule.MMKVStorage.delete(STORAGE_KEY);
    setJwtToken('');
    setStatus('Đã đăng xuất.');
  };
  const onSubmit = useCallback((data: FormLoginType) => {
    dispatch(appActions.onSetLoginStatus(true));
    console.log(data);
  }, []);

  return (
    <BaseScreenLayout
      backgroundImage={images.bgFull}
      isFullScreenBackground={true}
      contentStyle={{backgroundColor: 'transparent', flex: 1}}>
      <Text colorTheme="white" fontSize={20} textAlign="center">
        BLUEBOARD
      </Text>
      <Block justifyContent="center" block>
        <FormLogin onSubmit={onSubmit} onPressBio={handleBiometricSignIn} />
      </Block>
    </BaseScreenLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
