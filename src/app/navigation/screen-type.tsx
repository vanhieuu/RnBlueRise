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
}

export type BottomTabParamsList = {
  [APP_SCREEN.HOME]: undefined;
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
    url:string
  };
};

export type RootStackParamList = {
  [APP_SCREEN.AUTHENTICATION]: NavigatorScreenParams<AuthenParamList>;
  [APP_SCREEN.UN_AUTHENTICATION]: NavigatorScreenParams<UnAuthenParamList>;
  [APP_SCREEN.WEB]: undefined;
} & AuthenParamList &
  UnAuthenParamList;
