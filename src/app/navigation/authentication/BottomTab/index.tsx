import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {APP_SCREEN, BottomTabParamsList} from '@navigation/screen-type';
import {ViewStyle} from 'react-native';
import BottomBar from './BottomBar';

import {Color} from '@utils';
import HomeTabScreen from '@features/AuthenScreen/BottomScreen/Home';
import TrendingTabScreen from '@features/AuthenScreen/BottomScreen/TrendingUp';
import ReportTabScreen from '@features/AuthenScreen/BottomScreen/Report';
import UserTabScreen from '@features/AuthenScreen/BottomScreen/User';

type Props = {};

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const BottomTab = (props: Props) => {
  return (
    <View style={styles.root}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => <BottomBar {...props} />}>
        <Tab.Screen name={APP_SCREEN.HOME} component={HomeTabScreen} />
        <Tab.Screen
          name={APP_SCREEN.TRENDING_UP_TAB}
          component={TrendingTabScreen}
        />
        <Tab.Screen name={APP_SCREEN.REPORT_TAB} component={ReportTabScreen} />
        <Tab.Screen name={APP_SCREEN.USER_TAB} component={UserTabScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // borderRadius:100
    // backgroundColor:Color.backgroundColor
  } as ViewStyle,
});
