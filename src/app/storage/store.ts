import {configureStore} from '@reduxjs/toolkit';


import {persistStore, persistReducer} from 'redux-persist';
import {reduxPersistStorage} from '@utils';
import {allReducer} from './allReducer';
import {rootSaga} from './rootSaga';
const createSagaMiddleware = require('redux-saga');


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
const sagaMiddleware = createSagaMiddleware.default();

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
