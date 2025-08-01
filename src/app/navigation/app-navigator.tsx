import {dispatch, AppModule, RXStore, useSelector} from '@common';
import {PortalHost, SnackBar} from '@components';
import BootSplash from 'react-native-bootsplash';

import {MyAppTheme} from '@theme';

import React, {useCallback, useEffect} from 'react';
import {Linking, StatusBar, AppStateStatus, AppState} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import {NavigationContainer} from '@react-navigation/native';
import {appActions} from '@store/appRedux/reducer';
import {
  hideLoading,
  ProgressDialog,
  showLoading,
} from '@library/components/progressDialog';
import {navigationRef} from './navigation-services';
import RootNavigator from './rootNavigatior';

export const AppContainer = () => {
  // state
  const {loadingApp, showDialog, theme} = useSelector(state => state.app);
  // const [isToken, setIsToken] = React.useState();

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({fade: true});
    }, 1000);
    AppState.addEventListener('change', handleAppStateChange);
    return () => clearTimeout(id);
  }, []);
  // effect
  useEffect(() => {
    // SAVE DEVICE ID
    DeviceInfo.getUniqueId().then(value =>
      // dispatch(appActions.onSetDeviceId(value)),
      console.log(value),
    );

    Linking.getInitialURL().then(value => console.log(value));
    Linking.addEventListener('url', () => {
      console.log('heelo');
    });
    // dispatch(actionsLogin.reset());
  }, []);

  useEffect(() => {
    if (showDialog) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [showDialog]);

  const handleAppStateChange = useCallback((nextState: AppStateStatus) => {
    if (nextState === 'active') {
      console.log('App has come to the foreground');
    } else if (nextState === 'background') {
    }
  }, []);

  // render
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
      <>
        <StatusBar backgroundColor={'transparent'} translucent />
        {!loadingApp && (
          <>
            <PortalHost name={'AppModal'} />
            <RootNavigator />
            <ProgressDialog />
            <SnackBar />
          </>
        )}
        <RXStore />
      </>
    </NavigationContainer>
  );
};
