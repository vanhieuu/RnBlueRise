import {RXStore, useSelector} from '@common';
import {PortalHost, ProgressDialog, SnackBar} from '@components';

import {MyAppTheme} from '@theme';

import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {navigationRef} from './navigation-services';

import RootNavigator from './rootNavigatior';

export const AppContainer = () => {
  // state
  const {loadingApp,  theme} = useSelector(state => state.app);

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
