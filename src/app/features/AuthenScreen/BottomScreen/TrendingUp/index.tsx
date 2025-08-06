import {
  CellRendererProps,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  AppBottomSheet,
  BaseScreenLayout,
  Block,
  Header,
  SvgIcon,
  Text,
} from '@components';
import {FlashList, FlashListRef} from '@shopify/flash-list';
import RenderListSelect from './components/RenderListSelect';
import {wait} from '../Home';
import {AppTheme, useTheme} from '@theme';
import {createThemedStyles, StatusData} from '@utils';
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
import RenderListItem from './components/RenderListItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '@assets/image';

type Props = {};

const TrendingTabScreen = (props: Props) => {
  const theme = useTheme();
  const styles = trendingUpStyle(theme);
  const bottomRef = useRef<BottomSheetMethods>(null);
  const flashRef = useRef<FlashListRef<any>>(null);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [isLoad, startEffect] = useTransition();
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
  const snapPoints = useMemo(() => ['20%', '50%'], []);
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

  const getItemCount = (data: any): number => 5;
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

  const onChangeText = useCallback((text: string) => {
    startEffect(() => {
      setValueSearch(text);
    });
  }, []);

  const onSubmitText = useCallback((text: string) => {
    setValueSearch(text);
  }, []);
  function normalizeText(str: string): string {
    return str
      .normalize('NFD') // decompose combined letters
      .replace(/[\u0300-\u036f]/g, '') // strip diacritics
      .toLowerCase(); // case‐insensitive
  }

  const filteredStatusData = useMemo(
    () =>
      StatusData.filter(item => {
        // normalize both sides
        const title = normalizeText(item.title);
        const query = normalizeText(valueSearch);
        return title.includes(query);
      }),
    [valueSearch],
  );

  const getItem = (_: any, index: number) => {
    switch (index) {
      case 0:
        return (
          <Header
            userName={'Tên user'}
            nameOfEducationCenter={'Tên trung tâm GD'}
            imageUrl={''}
            setShow={setShow}
          />
        );
      case 1:
        return (
          <Block colorTheme="body" marginTop={20}>
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
          </Block>
        );
      case 2:
        return (
          <FlashList
            data={listData}
            keyExtractor={keyExtractor}
            horizontal
            ref={flashRef}
            contentContainerStyle={{backgroundColor: theme.colors.body}}
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
      case 3:
        return (
          <Block colorTheme="body">
            <SearchComponent
              value={valueSearch}
              onChangeText={onChangeText}
              onSubmitText={onSubmitText}
            />
          </Block>
        );
      case 4:
        return <RenderListItem data={filteredStatusData} />;

      default:
        return null;
    }
  };

  return (
    <BaseScreenLayout
      isFullScreenBackground={true}
      contentStyle={styles.container}
      backgroundImage={images.bgFull}>
      <VirtualizedList
        data={[]}
        renderItem={() => null}
        getItemCount={getItemCount}
        bounces={true}
        // stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        nestedScrollEnabled={true}
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
        keyboardShouldPersistTaps="never"
        CellRendererComponent={cellRender}
      />
      <AppBottomSheet
        bottomSheetRef={bottomRef}
        enableDynamicSizing
        onChange={() => setShowOption(false)}
        hiddenBackdrop={false}
        backgroundColor={theme.colors.white}
        // snapPointsCustom={snapPoints}
        enablePanDownToClose>
        <BottomSheetView style={{flex: 1}}>
          <Block block>
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
      </AppBottomSheet>
    </BaseScreenLayout>
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
    container: {
      flex: 1,
      backgroundColor: 'transparent',
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
