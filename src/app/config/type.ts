import {RegisterOptions} from 'react-hook-form';

export enum SLICE_NAME {
  APP = 'APP_',
  AUTH = 'AUTH_'
}

export type HookFromRules = Exclude<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;


export enum SLICE_ACTION  {
  LOGIN = 'LOGIN_'
}