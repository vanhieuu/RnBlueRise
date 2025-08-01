import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from './type';
import {SLICE_NAME} from '@config/type';
import {ThemeType} from '@theme';

const initialState: AppState = {
  theme: 'default',
  loadingApp: false,
  showDialog: false,
  showLoadingScreen: false,
  internetState: true,
};
const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialState,
  reducers: {
    onSetAppTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    onSetInternet: (state, action: PayloadAction<any>) => {
      state.internetState = action.payload;
    },
    onLoading: state => {
      state.loadingApp = true;
    },
    onLoadAppEnd: state => {
      state.loadingApp = false;
    },
    onStartProcess: state => {
      state.showDialog = true;
    },
    onEndProcess: state => {
      state.showDialog = false;
    },
  },
});

export const appActions = {
  ...appSlice.actions,
};
export const appReducer = appSlice.reducer;
