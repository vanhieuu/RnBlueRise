import {RegisterOptions} from 'react-hook-form';

export enum SLICE_NAME {
  APP = 'APP_',
}

export type HookFromRules = Exclude<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;
