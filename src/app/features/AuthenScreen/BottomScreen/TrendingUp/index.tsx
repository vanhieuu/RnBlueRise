import {
  CellRendererProps,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {AppBottomSheet, Block, Header, SvgIcon, Text} from '@components';
import {FlashList, FlashListRef} from '@shopify/flash-list';
import RenderListSelect from './components/RenderListSelect';
import {wait} from '../Home';
import {AppTheme, useTheme} from '@theme';
import {createThemedStyles} from '@utils';
import {useMix, useRadian, useSharedTransition} from '@animated';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import SearchComponent from './components/SearchComponent';
import {SearchBar} from 'react-native-screens';

type Props = {};

const TrendingTabScreen = (props: Props) => {
  const theme = useTheme();
  const styles = trendingUpStyle(theme);
  const bottomRef = useRef<BottomSheetMethods>(null);
  const flashRef = useRef<FlashListRef<any>>(null);
  const [show, setShow] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(1);
  const [showOption, setShowOption] = useState<boolean>(false);
  const listData = useMemo(
    () => [
      {
        id: 1,
        label: 'Tất cả',
      },
      {
        id: 2,
        label: 'Tên chi nhánh 1',
      },
      {
        id: 3,
        label: 'Tên chi nhánh 2',
      },
      {
        id: 4,
        label: 'Tên chi nhánh 3',
      },
    ],
    [],
  );

  const keyExtractor = useCallback((item: any, index: number) => item.id, []);
  const handleSelected = useCallback(
    (id: number | string) => {
      setSelected(id);
      const idx = listData.findIndex(item => item.id === id);
      if (idx >= 0) {
        flashRef.current?.scrollToIndex({
          index: idx,
          animated: true,
          viewPosition: 0.5, // center it
        });
      }
    },
    [listData],
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const getItemCount = (data: any): number => 4;
  const cellRender: React.ComponentType<
    CellRendererProps<React.JSX.Element | null>
  > = React.useCallback(({item}) => item, []);
  const keyExtractorVirtual = React.useCallback(
    (item: any, index: number) => index.toString(),
    [],
  );
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const progress = useSharedTransition(showOption);
  const rotate = useRadian(useMix(progress, 0, -180));

  const arrowStyle = useAnimatedStyle(
    () => ({
      transform: [{rotate: rotate.value}],
    }),
    [],
  );

  const onPressArrow = useCallback(() => {
    if (!showOption) {
      bottomRef.current?.expand();
      setShowOption(!showOption);
    } else {
      bottomRef.current?.close();
      setShowOption(false);
    }
  }, [showOption]);

  const getItem = (_: any, index: number) => {
    switch (index) {
      case 0:
        return (
          <Block marginHorizontal={16} marginVertical={16} direction="row">
            <Text>Chọn chi nhánh: </Text>
            <TouchableOpacity
              style={styles.dropBoxContain}
              onPress={onPressArrow}>
              <Text fontSize={12} fontWeight="400">
                {listData.find(item => item.id === selected)?.label || ''}
              </Text>
              <Animated.View style={[arrowStyle]}>
                <SvgIcon source="ArrowUp" color="white" size={20} />
              </Animated.View>
            </TouchableOpacity>
          </Block>
        );
      case 1:
        return (
          <FlashList
            data={listData}
            keyExtractor={keyExtractor}
            horizontal
            ref={flashRef}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <RenderListSelect
                  key={index}
                  id={item.id}
                  label={item.label}
                  handleSelected={handleSelected}
                  selected={selected}
                />
              );
            }}
          />
        );
      case 2:
        return (
          <Block>
            <SearchComponent />
          </Block>
        );
      default:
        return null;
    }
  };

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={1}
      appearsOnIndex={2}
      pressBehavior={'close'}
    />
  );

  return (
    <>
      <VirtualizedList
        data={[]}
        renderItem={() => null}
        getItemCount={getItemCount}
        stickyHeaderHiddenOnScroll={false}
        bounces={true}
        decelerationRate={'fast'}
        initialScrollIndex={0}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'#c95f34'}
          />
        }
        keyExtractor={keyExtractorVirtual}
        getItem={getItem}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        stickyHeaderIndices={[0]}
        contentContainerStyle={{}}
        keyboardShouldPersistTaps="never"
        CellRendererComponent={cellRender}
        ListHeaderComponent={
          <Header
            userName={'Tên user'}
            nameOfEducationCenter={'Tên trung tâm GD'}
            imageUrl={''}
            setShow={setShow}
          />
        }
      />
      <BottomSheet
        ref={bottomRef}
        enableDynamicSizing
        enablePanDownToClose
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={{flex: 1}}>
          <Block>
            {listData.map((item, idex) => {
              return (
                <TouchableOpacity
                  key={idex}
                  onPress={() => handleSelected(item.id)}
                  style={styles.selectedSheetItem(selected, item)}>
                  <Text>{item.label}</Text>
                  {selected === item.id && (
                    <SvgIcon source="CheckSmall" size={20} />
                  )}
                </TouchableOpacity>
              );
            })}
          </Block>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default TrendingTabScreen;

const trendingUpStyle = (theme: AppTheme) =>
  createThemedStyles({
    dropBoxContain: {
      marginLeft: 10,
      //   backgroundColor: 'red',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    selectedSheetItem: (selected, item) => ({
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor:
        selected === item.id ? theme.colors.secondBlue : theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      //   marginHorizontal: 16,
    }),
  });
