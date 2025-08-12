import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Block, SvgIcon, Text} from '@components';

import {useTheme} from '@theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {APP_SCREEN, AuthenParamList} from '@navigation/screen-type';
import isEqual from 'react-fast-compare';

type HeaderTabType = {
  title?: string;
  left?: string;
  showFont?: boolean;
  onPressFont?: () => void;
};

const Header = ({
  title,
  left,
  showFont = false,
  onPressFont,
}: HeaderTabType) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<AuthenParamList>>();
  return (
    <Block
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={8}
      // marginVertical={10}
      paddingVertical={10}
      marginBottom={10}
      colorTheme="background"
      height={40}>
      <Block direction="row" alignItems="center" marginRight={10}></Block>
    </Block>
  );
};

export const HeaderTab = React.memo(Header, isEqual);

const styles = StyleSheet.create({});
