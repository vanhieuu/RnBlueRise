import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import {APP_SCREEN, RootStackParamList} from './screen-type';

import NetInfo from '@react-native-community/netinfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Authentication from './authentication';
import DetailReportScreen from '@features/AuthenScreen/DetailReport';

type Props = {};
const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = (props: Props) => {
  const [networkState, setNetworkState] = React.useState<boolean>(true);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setNetworkState(true);
      } else {
        setNetworkState(false);
      }
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  // console.log(token,'ssss')
  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
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
      </Stack.Navigator>
      {/* <LottieLoad /> */}
    </SafeAreaView>
    // </SafeAreaView>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
