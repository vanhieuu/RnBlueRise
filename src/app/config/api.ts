import {AppModule} from '@common';
import axios from 'axios';
export const HEADER_DEFAULT = {
  'Content-Type': 'application/json',
};
export const TIMEOUT = 50000;


// HTTP Status
export const CODE_DEFAULT = -200;
export const CODE_SUCCESS = 200;
export const ERROR_NETWORK_CODE = -100;
export const RESULT_CODE_PUSH_OUT = 401;
export const TIME_OUT = 10000;
export const STATUS_TIME_OUT = 'ECONNABORTED';
export const CODE_TIME_OUT = 408;

