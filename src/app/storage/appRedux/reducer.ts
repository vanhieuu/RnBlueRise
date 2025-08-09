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
  listStatus: [],
  token: '',
  isLogin: false,
  rememberLogin:false
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
    onSetListData: (state, action: PayloadAction<any>) => {
      state.listStatus = action.payload;
    },
    hideItem: (state, action: PayloadAction<string>) => {
      const item = state.listStatus.find?.(
        (item: any) => item.id === action.payload,
      );
      if (item) {
        item.visible = !item.visible;
      }
    },
    showItem: (state, action: PayloadAction<string>) => {
      const item = state.listStatus.find?.(
        (item: any) => item.id === action.payload,
      );
      if (item) {
        item.visible = true;
      }
    },
    onSetTokenLogin: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    onLogout: state => {
      state.token = '';
      state.isLogin = false;
    },
    onSetLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    onSetRememberLogin:(state,action:PayloadAction<boolean>) =>{
      state.rememberLogin = action.payload
    }
  },
});

export const appActions = {
  ...appSlice.actions,
};
export const appReducer = appSlice.reducer;
