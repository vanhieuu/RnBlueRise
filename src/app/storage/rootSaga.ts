import {all} from 'typed-redux-saga';
import {authSaga} from './authSaga';

export const rootSaga = function* rootSaga() {
  yield all([authSaga()]);
};
