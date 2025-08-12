import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import {APP_SCREEN, RootStackParamList} from './screen-type';

import NetInfo from '@react-native-community/netinfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Authentication from './authentication';
import DetailReportScreen from '@features/AuthenScreen/DetailReport';
import UnAuthenTicationStack from './unAuthentication';
import {dispatch, useSelector} from '@common';
import {shallowEqual} from 'react-redux';
import { appActions } from '@store/appRedux/reducer';

type Props = {};
const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = (props: Props) => {
  const [networkState, setNetworkState] = React.useState<boolean>(true);
  const token = useSelector(state => state.auth.token,shallowEqual)
  const isLogin = useSelector(state => state.app.isLogin, shallowEqual);
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setNetworkState(true);
      } else {
        setNetworkState(false);
      }
    });
    if(token){
      dispatch(appActions.onSetLoginStatus(true))
    }

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, [token]);

  console.log(token ,'ssss')
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isLogin ? (
        <Stack.Screen
          name={APP_SCREEN.UN_AUTHENTICATION}
          options={{headerShown: false}}
          component={UnAuthenTicationStack}
        />
      ) : (
        <Stack.Group>
          <Stack.Screen
            name={APP_SCREEN.AUTHENTICATION}
            options={{headerShown: false}}
            component={Authentication}
          />

          <Stack.Screen
            name={APP_SCREEN.DETAIL_REPORT}
            options={{headerShown: false}}
            component={DetailReportScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
