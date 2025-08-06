import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Block, Text} from '@components';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import CardStatusItem from '@features/AuthenScreen/BottomScreen/Home/component/ListBaseStatus/CardStatusItem';
import isEqual from 'react-fast-compare';

type Props = {
  data: any[];
};
const width = Dimensions.get('window').width;
const RenderOverviewDetail = ({data}: Props) => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <Block colorTheme="white">
      <Block paddingHorizontal={16}>
        <Text fontSize={14} fontWeight="bold" colorTheme="text">
          Chi tiết tổng quan
        </Text>
      </Block>
      <Carousel
        ref={ref}
        // containerStyle={{alignItems: 'center', justifyContent: 'center'}}
        width={width}
        // style={{alignItems: 'center'}}
        height={130}
        data={data}
        onProgressChange={progress}
        renderItem={({item}) => <CardStatusItem {...item} />}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50}}
        containerStyle={{gap: 5}}
        onPress={onPressPagination}
      />
    </Block>
  );
};

export default React.memo(RenderOverviewDetail, isEqual);

const styles = StyleSheet.create({});
