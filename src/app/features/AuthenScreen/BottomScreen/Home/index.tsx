import {
  CellRendererProps,
  RefreshControl,
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import React, {useState} from 'react';
import {Block, Text, Header, BaseScreenLayout} from '@components';
import ListBaseStatus from './component/ListBaseStatus';
import ChartStatistical from './component/StatisticalMonth';
import {images} from '@assets/image';

export const wait = (timeout: number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), timeout);
  });
};

const HomeTabScreen = () => {
  const [show, setShow] = useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const getItemCount = (data: any): number => 2;
  const cellRender: React.ComponentType<
    CellRendererProps<React.JSX.Element | null>
  > = React.useCallback(({item}) => item, []);
  const keyExtractor = React.useCallback(
    (item: any, index: number) => index.toString(),
    [],
  );
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getItem = (data: any, index: number) => {
    switch (index) {
      case 0:
        return <ListBaseStatus />;
      case 1:
        return <ChartStatistical />;
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
        stickyHeaderHiddenOnScroll={true}
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
        keyExtractor={keyExtractor}
        getItem={getItem}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        stickyHeaderIndices={[0]}
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
    </BaseScreenLayout>
  );
};

export default HomeTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
