// import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { storage as MMKV } from '../common/native-module/app-module';
import { AppModule } from '@common';
const STORE_LANGUAGE_KEY = 'settings.lang';

const getAppLanguage = async () => {
  try {
    const storage = await MMKV.getString(STORE_LANGUAGE_KEY);
    if (storage) {
      return storage;
    }
    return 'en';
  } catch (error) {
    return 'en';
  }
};
const setAppLanguage = async (language: any) => {
  try {
    await MMKV.set(STORE_LANGUAGE_KEY, language);
  } catch (error) {}
};

export const saveFCMToken = async (token:string) => {
  try {
    await AppModule.MMKVStorage.setString('@FCMToken', token);
    return 'THANH_CONG';
  } catch (e) {
    return e;
  }
};

export const getFCMToken = async () => {
  try {
    let fcmToken = await AppModule.MMKVStorage.getString('@FCMToken');
    if (!fcmToken) {
      console.log('FCM token is missing');
      return;
    }
    return fcmToken;
  } catch (e) {
    return '';
  }
};
export const removeFCMToken = async () => {
  try {
    await AppModule.MMKVStorage.delete('@FCMToken');
    return 'THANH_CONG';
  } catch (e) {
    return e;
  }
};





module.exports = {
  getAppLanguage,
  setAppLanguage,
  removeFCMToken,
  saveFCMToken,
  getFCMToken
};
