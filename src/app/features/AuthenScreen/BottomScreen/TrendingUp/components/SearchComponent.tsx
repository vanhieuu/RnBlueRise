import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import isEqual from 'react-fast-compare';
import {Block, SearchBar} from '@components';

import {goBack} from '@navigation/navigation-services';

type Props = {
  value: string;
  onChangeText: (txt: string) => void;
  onSubmitText: (text: string) => void;
};

const SearchComponent = ({value, onChangeText, onSubmitText}: Props) => {
  const [isFocus, setIsFocus] = useState<boolean>();

  const onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocus(true);
    },
    [],
  );

  const onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocus(false);
    },
    [],
  );

  return (
    <Block marginHorizontal={8}>
      <SearchBar
        defaultText={value}
        placeholder={'Nhập nội dung tìm kiếm'}
        onSubmitText={onSubmitText}
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeText={onChangeText}
        onPressBack={goBack}
      />
    </Block>
  );
};

export default React.memo(SearchComponent, isEqual);

const styles = StyleSheet.create({});
