import React, {useCallback, useEffect, useMemo, useState} from 'react';
import isEqual from 'react-fast-compare';
import {Block, Text, TouchableScale} from '@components';
import {AppTheme, useTheme} from '@theme';
import {createThemedStyles, StatusData} from '@utils';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import CardStatusItem from './CardStatusItem';
import {dispatch, useSelector} from '@common';
import {appActions} from '@store/appRedux/reducer';
import {shallowEqual} from 'react-redux';
import {navigate} from '@navigation/navigation-services';
import {APP_SCREEN} from '@navigation/screen-type';
type Props = {};

const width = Dimensions.get('window').width;

const ListBaseStatus = (props: Props) => {
  const theme = useTheme();
  const styles = listBaseStyles(theme);
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const defaultList = useSelector(state => state.app.listStatus, shallowEqual);

  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>(
    {},
  );

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };
  const statusWithVisible = useMemo(() => {
    return StatusData.map((item, index) => ({
      ...item,
      visible: index < 3,
      id: index,
    }));
  }, []);

  const visibleItems = useMemo(() => {
    return statusWithVisible.filter(item => item.visible);
  }, [statusWithVisible]);

  useEffect(() => {
    const defaultVisibility: Record<string, boolean> = {};
    StatusData.forEach((item, index) => {
      defaultVisibility[item.title] = index < 3; // only first 3 are visible
    });
    setVisibilityMap(defaultVisibility);
  }, []);
  useEffect(() => {
    dispatch(appActions.onSetListData(statusWithVisible));
  }, [visibleItems]);

  const onPressEdit = useCallback(() => {
    navigate(APP_SCREEN.TASK_BOARD);
  }, []);

  return (
    <Block colorTheme='body' block>
      <Block
        direction="row"
        justifyContent="space-between"
        marginHorizontal={16}
        alignItems="center"
        paddingTop={10}>
        <Text fontSize={14} fontWeight="bold">
          Các chỉ số cơ bản
        </Text>
        <TouchableScale
          containerStyle={styles.containButton}
          onPress={onPressEdit}>
          <Text>Chỉnh sửa</Text>
        </TouchableScale>
      </Block>
      <Carousel
        ref={ref}
        // containerStyle={{alignItems: 'center', justifyContent: 'center'}}
        width={width}
        // style={{alignItems: 'center'}}
        height={130}
        data={
          defaultList && defaultList?.length > 0
            ? defaultList.filter(item => item.visible)
            : visibleItems
        }
        onProgressChange={progress}
        renderItem={({item}) => <CardStatusItem {...item} />}
      />
      <Pagination.Basic
        progress={progress}
        data={
          defaultList && defaultList?.length > 0
            ? defaultList.filter(item => item.visible)
            : visibleItems
        }
        dotStyle={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50}}
        containerStyle={{gap: 5}}
        onPress={onPressPagination}
      />
    </Block>
  );
};

export default React.memo(ListBaseStatus, isEqual);

const listBaseStyles = (theme: AppTheme) =>
  createThemedStyles({
    containButton: {
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: theme.colors.black,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 4,
    },
  });
