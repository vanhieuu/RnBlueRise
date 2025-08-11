// client.ts
import axios, {
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosHeaders,
  AxiosRequestConfig,
} from 'axios';
import { showSnack } from '@components';
import { translate } from '@utils';
import { ENVConfig } from './env';
import { TIME_OUT } from './api';

/** =========
 * Auth state
 * ========= */
let _token: string | null = null;
let _tokenGetter: (() => string | Promise<string>) | null = null;

/** Gán token trực tiếp (sau khi login) */
export function setAuthToken(token: string | null) {
  _token = token;
}

/** Hoặc truyền getter để luôn lấy token mới nhất (SecureStore, Keychain, etc.) */
export function setAuthTokenGetter(getter: () => string | Promise<string>) {
  _tokenGetter = getter;
}

/** =========================
 * Axios instance (isolated)
 * ========================= */
export const client: AxiosInstance = axios.create({
  baseURL: ENVConfig.API_URL,
  timeout: TIME_OUT,
  // serialize params (supports Date, numbers, strings)
  paramsSerializer: {
    serialize: (params) => {
      const usp = new URLSearchParams();
      Object.entries(params || {}).forEach(([k, v]) => {
        if (v == null) return;
        if (v instanceof Date) usp.append(k, v.toISOString());
        else usp.append(k, String(v));
      });
      return usp.toString();
    },
  },
});

/** =========================
 * Request interceptor
 * ========================= */
const onRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  // ensure baseURL/timeout from env
  config.baseURL = ENVConfig.API_URL;
  config.timeout = TIME_OUT;

  // merge headers (do NOT overwrite)
  const baseHeaders = new AxiosHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  // Attach Bearer
  let token = _token;
  if (!token && _tokenGetter) token = await _tokenGetter();
  if (token) {
    baseHeaders.set('Authorization', `Bearer ${token}`);
  }

  // merge existing headers last to let caller override if needed
  config.headers = AxiosHeaders.from(baseHeaders);
  if (config.headers && (config as any)._headers) {
    // no-op: axios v1 normalizes headers; this is just a guard if a lib mutates
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] ${error?.message}`, error);
  return Promise.reject(error);
};

/** =========================
 * Response interceptor
 * ========================= */
const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError | any): Promise<any> => {
  // Network layer error (no response)
  const msg = error?.toJSON?.()?.message ?? error?.message;
  if (msg === 'Network Error') {
    showSnack({
      msg: translate('error:errorNetwork') as string,
      interval: 3000,
      type: 'error',
    });
    return Promise.reject(error);
  }

  const status = error?.response?.status;

  if (status === 400) {
    // server returned 400 with body -> forward its data to caller
    // (keep as reject so caller enters catch; or resolve if you prefer)
    console.log('%c### 400', 'color:red', error?.response?.data);
    return Promise.reject(error?.response?.data ?? error);
  }

  if (status === 401) {
    // token expired / unauthorized
    const loggedIn = true; // TODO: wire your real auth state here
    console.log('LOGGED IN:', loggedIn);
    if (loggedIn) {
      // store.dispatch(signOut()); // <-- your logic
      showSnack({
        msg: translate('error:tokenExpired') as string,
        interval: 3000,
        type: 'error',
      });
    }
    return Promise.reject(error);
  }

  if (status === 500) {
    showSnack({
      msg: translate('error:haveError') as string,
      interval: 3000,
      type: 'error',
    });
    return Promise.reject(error);
  }

  return Promise.reject(error);
};

/** Hook up interceptors */
client.interceptors.request.use(onRequest, onRequestError);
client.interceptors.response.use(onResponse, onResponseError);

/** =========
 * Helpers
 * ========= */
export async function get<T>(url: string, params?: Record<string, any>, cfg?: AxiosRequestConfig) {
  const { data } = await client.get<T>(url, { params, ...(cfg || {}) });
  return data;
}

/** Dùng cho export CSV endpoints */
export const CSV_RESPONSE = { responseType: 'arraybuffer' as const };
