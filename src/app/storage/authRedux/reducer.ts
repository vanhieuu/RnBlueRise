import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AUTH_ACTION, AuthState} from './type';
import {SLICE_NAME} from '@config/type';

const initialState: AuthState = {
  profile: {},
  token: '',
};

const authSlice = createSlice({
  name: SLICE_NAME.AUTH,
  initialState,
  reducers: {
    reset: () => {
      return {...initialState};
    },
    onSetToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    onSetAppProfile: (state, action: PayloadAction<any>) => {
      return (state.profile = action.payload);
    },
  },
});

const onLoginAction = createAction(
  AUTH_ACTION.LOGIN,
  (username: string, password: string) => ({payload: {username, password}}),
);

export const authActions = {
  ...authSlice.actions,
  onLoginAction,
};
export const authReducer = authSlice.reducer;
