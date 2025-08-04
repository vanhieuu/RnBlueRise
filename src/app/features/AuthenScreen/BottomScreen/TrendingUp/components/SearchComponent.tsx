import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import isEqual from 'react-fast-compare';

type Props = {};

const SearchComponent = (props: Props) => {
  return (
    <View>
      <Text>SearchComponent</Text>
    </View>
  );
};

export default React.memo(SearchComponent, isEqual);

const styles = StyleSheet.create({});
