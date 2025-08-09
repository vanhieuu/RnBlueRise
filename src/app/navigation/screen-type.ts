import { ReportType } from '@features/AuthenScreen/BottomScreen/Report/components/report';
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
  REPORT_TAB = 'REPORT_TAB',
  TRENDING_UP_TAB = 'TRENDING_UP_TAB',
  USER_TAB = 'USER_TAB',
  TASK_BOARD = 'TASK_BOARD',
  DETAIL_REPORT = 'DETAIL_REPORT',
  FORGOT_PASSWORD_NAV= 'FORGOT_PASSWORD_NAV'
}

export type BottomTabParamsList = {
  [APP_SCREEN.HOME]:undefined,
  [APP_SCREEN.REPORT_TAB]:undefined,
  [APP_SCREEN.USER_TAB]:undefined,
  [APP_SCREEN.TRENDING_UP_TAB]:undefined
};

export type UnAuthenParamList = {
  [APP_SCREEN.ONBOARDING]: undefined;
  [APP_SCREEN.SIGN_IN]: undefined;
  [APP_SCREEN.SIGN_UP]: undefined;
  [APP_SCREEN.RESULT_AUTHEN]: any;
  [APP_SCREEN.FORGOT_PASSWORD_NAV]:any
};
export type AuthenParamList = {
  [APP_SCREEN.BOTTOM_TAB]:undefined;
  [APP_SCREEN.TASK_BOARD]:undefined;
  [APP_SCREEN.DETAIL_REPORT]:{
    type:ReportType,
    title:string
  }

};
export type OfflineParamsList = {};

export type RootStackParamList = {
  [APP_SCREEN.AUTHENTICATION]: NavigatorScreenParams<AuthenParamList>;
  [APP_SCREEN.UN_AUTHENTICATION]: NavigatorScreenParams<UnAuthenParamList>;
} & AuthenParamList &
  UnAuthenParamList &
  OfflineParamsList;
