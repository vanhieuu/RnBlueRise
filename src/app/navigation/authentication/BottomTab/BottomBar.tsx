import {
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {useTransition} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {Block, SvgIcon, Text} from '@components';
import {AppTheme, useTheme} from '@theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {};

const BottomBar = (props: BottomTabBarProps) => {
  const {navigation, state} = props;

  const [isPending, startEffect] = useTransition();
  const theme = useTheme();
  const styles = rootStyles(theme);
  const pressNavigator = React.useCallback(
    (curTab: any) => {
      startEffect(() => {
        if (
          curTab === 0 ||
          curTab === 1 ||
          curTab === 2 ||
          curTab === 3 ||
          curTab === 4
        ) {
          navigation.emit({
            type: 'tabPress',
            target: state.routes[curTab].name,
            canPreventDefault: true,
          });

          navigation.navigate(state.routes[curTab].name);
        }
      });
    },
    [navigation, state],
  );

  return (
    <SafeAreaView edges={['right', 'left']} style={{overflow:'hidden'}}>
    <Block style={styles.container} colorTheme="background" shadow={true}>
      <TouchableOpacity style={styles.item} onPress={() => pressNavigator(0)}>
        <Block pointerEvents="none">
          <SvgIcon
            source=""
            size={24}
            color={state.index === 0 ? '#2069B2' : theme.colors.neutral03}
          />
        </Block>
        <Text style={styles.txtItem(state.index, 0)}>Trang chủ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => pressNavigator(1)}>
        <Block pointerEvents="none">
          <SvgIcon
            source="ActiveVideoIcon"
            size={24}
            color={state.index === 1 ? '#2069B2' : theme.colors.neutral03}
          />
        </Block>
        <Text style={styles.txtItem(state.index, 1)}>Video</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => pressNavigator(2)}>
        <Block pointerEvents="none">
          <SvgIcon
            source=""
            size={24}
            color={state.index === 2 ? '#2069B2' : theme.colors.neutral03}
          />
        </Block>
        <Text style={styles.txtItem(state.index, 2)}>AI</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => pressNavigator(3)}>
        <Block pointerEvents="none">
          <SvgIcon
            source=""
            size={24}
            color={state.index === 3 ? '#2069B2' : theme.colors.neutral03}
          />
        </Block>
        <Text style={styles.txtItem(state.index, 3)}>Audio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => pressNavigator(4)}>
        <Block pointerEvents="none">
          <SvgIcon
            source="ActiveProfile"
            size={24}
            color={state.index === 4 ? '#2069B2' : theme.colors.body}
          />
        </Block>
        <Text style={styles.txtItem(state.index, 4)}>Cá nhân</Text>
      </TouchableOpacity>
    </Block>
    </SafeAreaView>
  );
};

export default BottomBar;

const rootStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      // backgroundColor:'red',
      flexDirection: 'row',
      alignItems: 'flex-end',
      overflow: 'hidden',
      justifyContent: 'space-around',
      paddingHorizontal: 10,
      paddingTop: 10,
      width: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      // paddingBottom: 30,
      shadowColor: '#000',
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 4,
          },
          // shadowOpacity: 0.32,
          shadowRadius: 5.46,
        },
        android: {
          elevation: 9,
        },
      }),
    } as ViewStyle,
    itemIndicator: {
      height: 3,
      width: '100%',
      marginBottom: 10,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    } as ViewStyle,
    item: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
      // backgroundColor:'yellow'
      // backgroundColor:
    } as ViewStyle,
    txtItem: (index: number, curIndex: number) =>
      ({
        color: index === curIndex ? '#2069B2' : '#7D7D7D',

        textAlign: 'center',
        fontSize: 12,
        fontWeight: index === curIndex ? '500' : '400',
        lineHeight: 28,
      } as TextStyle),
  });
