import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {persistStore, persistReducer} from 'redux-persist';
import {reduxPersistStorage} from '@utils';
import {allReducer} from './allReducer';
import {rootSaga} from './rootSaga';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: reduxPersistStorage,
    whitelist: [],
    timeout: 0,
  },
  allReducer,
);

const devMode = __DEV__;
const sagaMiddleware = createSagaMiddleware();

const storeConfig = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: devMode,

    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = storeConfig();
export const persistore = persistStore(store);
