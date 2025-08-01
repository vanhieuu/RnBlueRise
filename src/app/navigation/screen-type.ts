import {DetailPostType} from '@features/authentication/DetailPost/data';
import {NavigatorScreenParams} from '@react-navigation/native';

export enum APP_SCREEN {
  ONBOARDING = 'ONBOARDING',
  AUTHENTICATION = 'AUTHENTICATION',
  UN_AUTHENTICATION = 'UN_AUTHENTICATION',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  RESULT_AUTHEN = 'RESULT_AUTHEN',
  HOME = 'HOME',
  BOTTOM_TAB = 'BOTTOM_TAB',
  WEB = 'WEB',
  VIDEO = 'VIDEO',
  BOOKMARK = 'BOOKMARK',
  PROFILE = 'PROFILE',
  DETAIL_POST = 'DETAIL_POST',
  LIST_TRENDING = 'LIST_TRENDING',
  SEARCH = 'SEARCH',
  DETAIL_VIDEO_PLAYER = 'DETAIL_VIDEO_PLAYER',
  POST_CARD = 'POST_CARD',
  DETAIL_POST_CARD = 'DETAIL_POST_CARD',
  SETTING = 'SETTING',
  SORT_CATEGORY = 'SORT_CATEGORY',
  LIST_CATEGORY = 'LIST_CATEGORY',
  DEFAULT_SELECT_CATEGORY = 'DEFAULT_SELECT_CATEGORY',
  SPEECH_NEWS = 'SPEECH_NEWS',
  DETAIL_SPEECH_AUDIO = 'DETAIL_SPEECH_AUDIO',
  WATCH_LATER = 'WATCH_LATER',
  AUTHOR_SAVE = 'AUTHOR_SAVE',
  OFFLINE_NETWORK = 'OFFLINE_NETWORK',
  DOWNLOAD_NEWS = 'DOWNLOAD_NEWS',
  WIDGET_SCREEN = 'WIDGET_SCREEN',
  DETAIL_POST_OFFLINE = 'DETAIL_POST_OFFLINE',
  LIST_NEWS_OFFLINE = 'LIST_NEWS_OFFLINE',
  GOLD_PRICE_DETAIL = 'GOLD_PRICE_DETAIL',
  GOLD_CHART = 'GOLD_CHART',
  WEATHER_DETAIL = 'WEATHER_DETAIL',
  WIDGET_SETTING = 'WIDGET_SETTING',
  AUDIO_SCREEN ='AUDIO_SCREEN',
  SUMMARY_AI ='SUMMARY_AI',
  NOTIFICATION = 'NOTIFICATION',
  DETAIL_CALENDAR ='DETAIL_CALENDAR'
}

export type BottomTabParamsList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.VIDEO]: undefined;
  [APP_SCREEN.SUMMARY_AI]:undefined,
  [APP_SCREEN.PROFILE]: undefined;
  [APP_SCREEN.AUDIO_SCREEN]:undefined
};

export type UnAuthenParamList = {
  [APP_SCREEN.ONBOARDING]: undefined;
  [APP_SCREEN.SIGN_IN]: undefined;
  [APP_SCREEN.SIGN_UP]: undefined;
  [APP_SCREEN.RESULT_AUTHEN]: any;
};
export type AuthenParamList = {
  [APP_SCREEN.BOTTOM_TAB]: NavigatorScreenParams<BottomTabParamsList>;
  [APP_SCREEN.WEB]: {
    url: string;
    bannerContent?: string;
    title?: string;
  };
  [APP_SCREEN.WEATHER_DETAIL]: {lat:number,long:number};
  [APP_SCREEN.WIDGET_SETTING]: undefined;
  [APP_SCREEN.DETAIL_CALENDAR]:{
    data:any
  }
  [APP_SCREEN.GOLD_CHART]: {
    item: {
      type: string;
      buy: string;
      sell: string;
      name:string
    };
  };
  [APP_SCREEN.LIST_NEWS_OFFLINE]: {
    item: any;
  };
  [APP_SCREEN.GOLD_PRICE_DETAIL]: {
    label: string;
  };
  [APP_SCREEN.DETAIL_POST]: {
    cateId?: any;
    idPost?: any;
    objectType?: any;
    link?: any;
  };
  [APP_SCREEN.WIDGET_SCREEN]: undefined;

  [APP_SCREEN.AUTHOR_SAVE]: undefined;
  [APP_SCREEN.DETAIL_POST_CARD]: undefined;
  [APP_SCREEN.LIST_TRENDING]: undefined;
  [APP_SCREEN.DOWNLOAD_NEWS]: undefined;
  [APP_SCREEN.DETAIL_POST_OFFLINE]: {
    content: any;
    tags: any[];
  };
  [APP_SCREEN.SEARCH]: {
    keyword?: any;
  };
  [APP_SCREEN.DETAIL_VIDEO_PLAYER]: {
    id: string;
    content?: any;
    from?: any;
  };
  [APP_SCREEN.DETAIL_SPEECH_AUDIO]: {
    data?: any;
  };
  [APP_SCREEN.BOOKMARK]: undefined;
  [APP_SCREEN.WATCH_LATER]: undefined;

  [APP_SCREEN.SETTING]: undefined;
  [APP_SCREEN.SORT_CATEGORY]: {
    isProfile?: boolean;
  };
  [APP_SCREEN.DEFAULT_SELECT_CATEGORY]: undefined;
  [APP_SCREEN.LIST_CATEGORY]: {
    currentIndex: number;
    currentId: string;
  };
  [APP_SCREEN.NOTIFICATION]:undefined
};
export type OfflineParamsList = {
  [APP_SCREEN.DETAIL_POST_OFFLINE]: {
    content: DetailPostType;
    tags: any[];
  };
};

export type RootStackParamList = {
  [APP_SCREEN.AUTHENTICATION]: NavigatorScreenParams<AuthenParamList>;
  [APP_SCREEN.UN_AUTHENTICATION]: NavigatorScreenParams<UnAuthenParamList>;
  [APP_SCREEN.WEB]: {
    url: string;
  };
  [APP_SCREEN.OFFLINE_NETWORK]: NavigatorScreenParams<OfflineParamsList>;
} & AuthenParamList &
  UnAuthenParamList &
  OfflineParamsList;
