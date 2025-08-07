import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {Suspense} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from '@store/store';
import {I18nextProvider} from 'react-i18next';
import i18n from '@library/utils/i18n/i18n';
import {PortalProvider} from '@components';
import {AppContainer} from './app/navigation/app-navigator';
type Props = {};

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        hidden={false}
        backgroundColor={'black'}
      />
      <SafeAreaProvider>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Suspense fallback={null}>
              <PortalProvider>
                <AppContainer />
              </PortalProvider>
            </Suspense>
          </I18nextProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
