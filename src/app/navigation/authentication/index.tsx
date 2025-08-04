import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTab from './BottomTab';
import {APP_SCREEN, AuthenParamList} from '@navigation/screen-type';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

import {useSelector} from '@common';
import {shallowEqual} from 'react-redux';

=======
import TaskBoard from '@features/AuthenScreen/TaskBoard';
>>>>>>> Stashed changes
=======
import TaskBoard from '@features/AuthenScreen/TaskBoard';
>>>>>>> Stashed changes
=======
import TaskBoard from '@features/AuthenScreen/TaskBoard';
>>>>>>> Stashed changes
=======
import TaskBoard from '@features/AuthenScreen/TaskBoard';
>>>>>>> Stashed changes
=======
import TaskBoard from '@features/AuthenScreen/TaskBoard';
>>>>>>> Stashed changes

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
      <Stack.Screen
        name={APP_SCREEN.TASK_BOARD}
        component={TaskBoard}
        options={{orientation: 'portrait'}}
      />
    </Stack.Navigator>
  );
};

export default Authentication;
