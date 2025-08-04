import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTab from './BottomTab';
import {APP_SCREEN, AuthenParamList} from '@navigation/screen-type';


const Stack = createNativeStackNavigator<AuthenParamList>();

const Authentication = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name={APP_SCREEN.BOTTOM_TAB}
        component={BottomTab}
        options={{orientation: 'portrait'}}
      />
     
    </Stack.Navigator>
  );
};

export default Authentication;
