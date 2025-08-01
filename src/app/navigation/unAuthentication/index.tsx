import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_SCREEN, UnAuthenParamList} from '@navigation/screen-type';

import {useSelector} from '@common';
import {shallowEqual} from 'react-redux';


// import Onboarding from '@features/unAuthenScreen/Onboarding';

const Stack = createNativeStackNavigator<UnAuthenParamList>();
const UnAuthenTicationStack = () => {
  const isLog = useSelector(state => state.login.isLogin, shallowEqual);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* {isLog && ( */}
      {/* <Stack.Screen name={APP_SCREEN.ONBOARDING} component={Onboarding} /> */}
      {/* )} */}
     
    </Stack.Navigator>
  );
};

export default UnAuthenTicationStack;
