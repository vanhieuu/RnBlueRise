import {isIos, CustomOmit} from '@common';
import {useEffect} from 'react';
import {NativeModules} from 'react-native';

import {hexStringFromCSSColor} from '../string';
import {MMKV} from 'react-native-mmkv';

const {AppModule} = NativeModules;

export const storage = new MMKV();

export const getVersion = (): string => {
  return AppModule.getVersion();
};
export const getAppName = (): string => {
  return AppModule.getAppName();
};
export const getDeviceId = (): string => {
  return AppModule.getDeviceId();
};
export const setAppBadges = (count: number) => {
  if (typeof count !== 'number' || !isIos) {
    return;
  }
  AppModule.setBadges(count);
};
export const clearNotification = () => {
  AppModule.clearNotification();
};
export const clearCache = () => {
  AppModule.clearCache();
};
export const checkChannelExist = (channelId: string) => {
  return new Promise<boolean>(rs => {
    if (isIos) {
      rs(false);
    }
    AppModule.checkChannelExist(channelId).then((res: boolean) => {
      rs(res);
    });
  });
};

export const deleteChannel = (channelId: string) => {
  if (isIos) {
    return;
  }
  AppModule.deleteChannel(channelId);
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

type Channel = {
  channelId: string;
  channelName: string;
  channelDescription?: string;
  playSound?: boolean;
  soundName?: string;
  importance?: keyof typeof ImportanceChannel;
  vibrate?: boolean;
};
export const createChannel = (channel: Channel) => {
  const actualChannel: CustomOmit<Channel, 'importance'> & {
    importance?: number;
  } = {
    ...channel,
    vibrate: channel?.vibrate ?? true,
    importance: channel.importance
      ? ImportanceChannel[channel.importance] ?? ImportanceChannel.HIGH
      : undefined,
  };
  return new Promise<boolean>(rs => {
    if (isIos) {
      rs(false);
    }
    AppModule.createChannel(actualChannel).then((res: boolean) => {
      rs(res);
    });
  });
};
export const getBuildNumber = (): string => {
  return AppModule.getBuildNumber();
};
export const registerPhotosChanges = () => {
  if (isIos) {
    AppModule.registerPhotosChanges();
  }
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
export const fixRotation = ({uri, height = 800, width = 600}: Image) => {
  return new Promise<ImageResponse>(rs => {
    if (isIos) {
      AppModule.fixRotation(
        uri,
        width,
        height,
        (_?: string, res?: ImageResponse) => {
          if (res) {
            rs({uri: res.uri, name: res.name});
          } else {
            rs({uri: uri, name: 'new_image.png'});
          }
        },
      );
    } else {
      AppModule.fixRotation(uri, width, height, rs, () => {
        rs({uri: uri, name: 'new_image.png'});
      });
    }
  });
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


