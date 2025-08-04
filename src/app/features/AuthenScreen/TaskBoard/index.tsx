import React, {forwardRef, useCallback, useMemo, memo} from 'react';
import {
  LogBox,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  ViewProps,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

import {
  DragEndParams,
  NestableDraggableFlatList,
  NestableScrollContainer,
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {Block, Divider, SvgIcon, Text} from '@components';
import {AppTheme, useTheme} from '@theme';
import {dispatch, useSelector} from '@common';
import {appActions} from '@store/appRedux/reducer';
import {shallowEqual} from 'react-redux';
import {createThemedStyles} from '@utils';
import { goBack } from '@navigation/navigation-services';

LogBox.ignoreLogs([
  `[Reanimated] Tried to modify key "current" of an object which has been already passed to a worklet.`,
]);

type ItemType = {
  id: string;
  title: string;
  visible: boolean;
};

// 1️⃣ RenderItem inner, receives ref
const RenderItemInner = (
  {
    item,
    drag,
    isActive,
    onHide,
    theme,
    styles,
  }: RenderItemParams<any> & {
    onHide: (id: string) => void;
    theme: AppTheme;
    styles: ReturnType<typeof rootStyles>;
  },
  ref: React.Ref<View>,
) => {
  const isPositive = item.percent >= 0;
  const percentColor = useMemo(
    () => (isPositive ? theme.colors.correctAnswer : theme.colors.redAlert),
    [],
  );
  const showColor = useMemo(
    () => (item?.visible ? theme.colors.correctAnswer : theme.colors.redAlert),
    [item.visible],
  );
  return (
    <ScaleDecorator activeScale={1}>
      <View
        ref={ref}
        style={[
          styles.container(isActive, item.visible),
          isActive && styles.shadow,
        ]}>
        <Pressable
          onLongPress={drag}
          disabled={isActive}
          style={{flex: 1, justifyContent: 'center'}}>
          <Block style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Block style={styles.valueRow}>
              <Text style={styles.value}>{item.value}</Text>
              <Text style={styles.percent} color={percentColor}>
                {isPositive ? '+' : '-'}
                {item.percent}%
              </Text>
            </Block>
            <Text style={styles.subText}>
              Tháng trước: {item.previousValue}
            </Text>
          </Block>
        </Pressable>
        <Block width={100} alignSelf="center">
          <Text color={showColor}>
            {item.visible ? 'Đang hiển thị' : 'Không hiển thị'}
          </Text>
          <Pressable
            onPress={() => onHide(item.id)}
            style={styles.buttonToggle(item.visible)}>
            <Text
              colorTheme="white"
              fontWeight="bold"
              lineHeight={24}
              fontSize={14}>
              {item.visible ? 'Ẩn chỉ số' : 'Hiện chỉ số'}
            </Text>
          </Pressable>
        </Block>
      </View>
      <Divider colorTheme="border" />
    </ScaleDecorator>
  );
};

// 2️⃣ forwardRef and memoize
const ForwardedRenderItem = forwardRef(RenderItemInner);
const RenderItem = memo(ForwardedRenderItem);

const TaskBoard = () => {
  const theme = useTheme();
  const styles = rootStyles(theme);
  const listStatus = useSelector(
    state => state.app.listStatus,
    shallowEqual,
  ) as ItemType[];

  const onHide = useCallback((id: string) => {
    dispatch(appActions.hideItem(id));
  }, []);

  const onDragEnd = useCallback(({data}: DragEndParams<ItemType>) => {
    // preserve visibility
    const newList = data.map(item => ({
      ...item,
      visible: item.visible ?? true,
    }));
    dispatch(appActions.onSetListData(newList));
  }, []);

  const memoizedRenderItem = useMemo(
    () => (params: RenderItemParams<ItemType>) =>
      <RenderItem {...params} onHide={onHide} theme={theme} styles={styles} />,
    [onHide, theme, styles],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Block
        colorTheme="primary"
        paddingVertical={20}
        direction="row"
        paddingHorizontal={16}
        alignItems="center">
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            height: 30,
          }}  onPress={() => goBack()} >
          <SvgIcon source="ArrowLeft" size={24} />
        </TouchableOpacity>
        <Text fontSize={20} fontWeight="bold">
          Chỉnh sửa chỉ số cơ bản
        </Text>
      </Block>
      <NestableScrollContainer
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <Block paddingHorizontal={16} justifyContent="center">
          <Text>Giữ 2s thẻ chỉ số rồi kéo thả để sắp xếp lại vị trí</Text>
        </Block>

        <NestableDraggableFlatList
          data={listStatus || []}
          dragItemOverflow
          showsVerticalScrollIndicator={false}
          initialNumToRender={12}
          windowSize={21}
          nestedScrollEnabled
          keyExtractor={item => item.id}
          onDragEnd={onDragEnd}
          renderItem={memoizedRenderItem}
        />
      </NestableScrollContainer>
    </SafeAreaView>
  );
};

const rootStyles = (theme: AppTheme) =>
  createThemedStyles({
    container: (isActive: boolean, visible: boolean): ViewStyle => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      // paddingVertical: 20,
      // backgroundColor: theme.colors.background,
      // borderRadius: 10,
      // borderWidth: isActive ? 1 : 0,
      // borderColor: isActive
      //   ? visible
      //     ? theme.colors.text
      //     : theme.colors.grayscale04
      //   : 'transparent',
    }),
    shadow: {
      shadowColor: theme.dark ? '#000' : '#fff',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    text: (visible: boolean, isActive: boolean): TextStyle => ({
      color: visible ? theme.colors.text : theme.colors.grayscale04,
    }),
    card: {
      backgroundColor: theme.colors.body,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.black,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginHorizontal: 16,
      paddingHorizontal: 8,
      marginTop: 10,
      // width:180,
      paddingVertical: 10,
      marginVertical: 10,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textGrey,
      marginBottom: 8,
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    value: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.black,
    },
    percent: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    subText: {
      fontSize: 12,
      color: theme.colors.textGrey,
    },
    buttonToggle: (visible: boolean) => ({
      borderWidth: 1,
      alignItems: 'center',
      marginHorizontal: 8,
      backgroundColor: visible
        ? theme.colors.redAlert
        : theme.colors.greenAlert,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginTop: 10,
      marginRight: 10,
    }),
  });

export default TaskBoard;
