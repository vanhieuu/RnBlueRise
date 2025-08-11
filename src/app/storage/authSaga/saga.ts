import {showSnack} from '@components';
import {CreateOrLoginAccountResponse} from '@model/authApiType';
import {PayloadAction} from '@reduxjs/toolkit';
import {AuthApi} from '@service';
import {appActions} from '@store/appRedux/reducer';
import {authActions} from '@store/authRedux/reducer';
import {call, put} from 'typed-redux-saga';

export function* onLoginSaga(action: PayloadAction) {
  if (authActions.onLoginAction.match(action)) {
    try {
      yield put(appActions.onLoading());
      const res: CreateOrLoginAccountResponse = yield call(
        AuthApi.login,
        action.payload,
      );

      yield put(authActions.onSetToken(res.accessToken));
      yield put(appActions.onSetTokenLogin(res.accessToken));
    } catch (err) {
      showSnack({
        msg: 'Có lỗi xảy ra, vui lòng thử lại',
        type: 'error',
        position: 'bottom',
        interval: 3000,
      });
    } finally {
      yield put(appActions.onLoadAppEnd());
    }
  }
}
