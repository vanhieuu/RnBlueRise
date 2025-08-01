import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {APP_SCREEN, BottomTabParamsList} from '@navigation/screen-type';
import {ViewStyle} from 'react-native';
import BottomBar from './BottomBar';

import {Color} from '@utils';



type Props = {};

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const BottomTab = (props: Props) => {
  return (
    <View style={styles.root}>
      {/* <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={props => <BottomBar {...props} />}>

      </Tab.Navigator> */}
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
