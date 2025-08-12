import {SLICE_ACTION} from '@config/type';

export type AuthState = {
  token: string | null;
  profile: {};
};
export enum AUTH_ACTION {
  LOGIN = SLICE_ACTION.LOGIN + 'LOGIN',
}
