
import {showSnack} from '@components';

import {translate} from '@utils';
import {ENVConfig} from './env'
import axios, {

  AxiosError,
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from 'axios';
import { TIME_OUT } from './api';



const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  config!.baseURL = ENVConfig.API_URL;
  config!.timeout = TIME_OUT;
  config!.headers = new AxiosHeaders({
    'Content-Type': 'application/json',
  });

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.info(`[response]: `, response);
  return response;
};

const onResponseError = (error: AxiosError | any): Promise<AxiosError> => {
  // console.error(`[response error]: `, error.response);
  if (error?.toJSON()?.message! === 'Network Error') {
    showSnack({
      msg: translate('error:errorNetwork') as string,
      interval: 3000,
      type: 'error',
    });
    return Promise.reject(error);
  }
  if (error?.response?.status === 400) {
    console.log('%c### 400', 'color:red', error);
    return error?.response?.data;
  }
  if (error?.response?.status === 401) {
    const loggedIn = true;
    console.log('LOGGED IN:', loggedIn);
    if (loggedIn) {
      // store.dispatch(signOut());
      if (loggedIn) {
        showSnack({
          msg: translate('error:tokenExpired') as string,
          interval: 3000,
          type: 'error',
        });
      }
      return Promise.resolve(error);
    }
  }
  if (error?.response?.status === 500) {
    showSnack({
      msg: translate('error:haveError') as string,
      interval: 3000,
      type: 'error',
    });
    return Promise.resolve(error);
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance,
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export const client = setupInterceptorsTo(axios);
