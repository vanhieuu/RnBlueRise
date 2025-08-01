import {isIos, CustomOmit} from '@common';
import {NativeModules} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {MMKV} from 'react-native-mmkv';



export const storage = new MMKV();

export const getVersion = (): string => {
  return DeviceInfo.getVersion();
};
export const getAppName = (): string => {
  return DeviceInfo.getApplicationName();
};
export const getDeviceId = (): string => {
  return DeviceInfo.getDeviceId();
};




const ImportanceChannel = {
  DEFAULT: 3,
  HIGH: 4,
  MAX: 5,
  LOW: 2,
  MIN: 1,
  NONE: 0,
  UNSPECIFIED: -1000,
};


export const getBuildNumber = (): string => {
  return DeviceInfo.getBuildNumber();
};


type Image = {
  uri: string;
  width?: number;
  height?: number;
};
type ImageResponse = {
  uri: string;
  name: string;
};


export type MMKVOption = {
  id: string;
  cryptKey: string;
};
export const MMKVStorage = {
  setString: async (key: string, value: string) => {
    const res = await storage.set(key, value);
    return res;
  },
  setNumber: async (key: string, value: number) => {
    const res = await storage.set(key, value);
    return res;
  },
  setBoolean: async (key: string, value: boolean) => {
    const res = await storage.set(key, value);
    return res;
  },
  getString: async (key: string) => {
    const res: string | undefined = await storage.getString(key);
    return res;
  },
  getNumber: async (key: string, option?: MMKVOption) => {
    const res: number | undefined = await storage.getNumber(key);
    return res;
  },
  getBoolean: async (key: string, option?: MMKVOption) => {
    const res: boolean | undefined = await storage.getBoolean(key);
    return res;
  },
  getAllKeys: async (option?: MMKVOption) => {
    const res: Array<string> = await storage.getAllKeys();
    return res;
  },
  clearAll: async (option?: MMKVOption) => {
    const res = await storage.clearAll();
    return res;
  },
  delete: async (key: string, option?: MMKVOption) => {
    const res = await storage.delete(key);
    return res;
  },
};


