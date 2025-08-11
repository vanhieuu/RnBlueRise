import {authActions} from '@store/authRedux/reducer';
import {takeLatest} from 'typed-redux-saga';
import * as Saga from './saga';
export function* authSaga() {
  yield takeLatest(authActions.onLoginAction.type.toString(), Saga.onLoginSaga);
}
