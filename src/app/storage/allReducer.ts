import {combineReducers} from '@reduxjs/toolkit';
import {appReducer} from './appRedux/reducer'
import { authReducer } from './authRedux/reducer';
export const allReducer = combineReducers({
        app:appReducer,
        auth:authReducer
});

export type RootState = ReturnType<typeof allReducer>;
