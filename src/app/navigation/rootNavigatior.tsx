import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import {APP_SCREEN, RootStackParamList} from './screen-type';


import NetInfo from '@react-native-community/netinfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

<<<<<<< Updated upstream
import {SafeAreaProvider} from 'react-native-safe-area-context';
=======
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Authentication from './authentication';
>>>>>>> Stashed changes


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
<<<<<<< Updated upstream
    <SafeAreaProvider>
      {/* <Stack.Navigator screenOptions={{headerShown: false}}>
=======
    <SafeAreaView edges={['top']} style={{flex:1}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
>>>>>>> Stashed changes
        <Stack.Screen
          name={APP_SCREEN.AUTHENTICATION}
          options={{headerShown: false}}
          component={Authentication}
        />
      </Stack.Navigator>
<<<<<<< Updated upstream
      <LottieLoad /> */}
      <View>
        <Text>ehehehe</Text>
      </View>
    </SafeAreaProvider>
=======
      {/* <LottieLoad /> */}
    
    </SafeAreaView>
>>>>>>> Stashed changes
    // </SafeAreaView>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
