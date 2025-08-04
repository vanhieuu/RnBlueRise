import {
  CellRendererProps,
  RefreshControl,
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import React, {useState} from 'react';
import {Block, Text, Header} from '@components';
import ListBaseStatus from './component/ListBaseStatus';
import ChartStatistical from './component/StatisticalMonth';

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
        return <ChartStatistical/>;
      default:
        return null;
    }
  };

  return (
    <Block block>
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
    </Block>
  );
};

export default HomeTabScreen;

const styles = StyleSheet.create({});
