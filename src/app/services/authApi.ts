import {showSnack} from '@components';
import {client} from '@config/client';
import authEndpoints from '@config/endpoint';
import {
  APIResponse,
  CreateOrLoginAccountResponse,
  LoginRequest,
} from '@model/authApiType';

export const AuthApi = {
  login: async (payload: LoginRequest) => {
    const {data} = await client.post<APIResponse<CreateOrLoginAccountResponse>>(
      authEndpoints.login,
      payload,
    );
    if (data.code < 0) {
      showSnack({
        msg: data.message,
        type: 'error',
        interval: 3000,
      });
    }
    return data.data;
  },
};
