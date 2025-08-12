import {Block, SvgIcon} from '@components';
import {goBack} from '@navigation/navigation-services';
import {useTheme} from '@theme';
import {debounce} from 'lodash';
import React, {useState, useEffect, startTransition, useCallback} from 'react';
import {
  TouchableOpacity,
  TextInput,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import {SearchBarProps} from './type';
import isEqual from 'react-fast-compare';

const SearchBarComponent = ({
  defaultText,
  placeholder,
  onSubmitText,
  onChangeText,
  onPressBack,
   onFocus = (e) => {},
  onBlur = (e) => {},
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');
  const [showClose, setShowClose] = useState(true);
  const theme = useTheme();
  const [showPlaceHolder, setShowPlaceHolder] = useState(placeholder);

  useEffect(() => {
    startTransition(() => {
      if (defaultText.trim().length > 0) {
        setSearchText(defaultText);
      }
    });
  }, [defaultText]);

  const debouncedOnChangeText = useCallback(
    debounce(text => {
      onChangeText(text);
      setSearchText(text);
    }, 400),

    [onChangeText],
  );
  const _onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus!(e);
      setShowPlaceHolder('');
    },
    [showPlaceHolder],
  );

  return (
    <Block
      width={'100%'}
      // color='red'
      height={50}
      zIndex={1}
      paddingVertical={4}
      marginBottom={5}
      marginTop={5}
      direction="row"
      justifyContent="center"
      alignItems="center">
      <Block
        block
        height={45}
        colorTheme="backgroundInput"
        // marginHorizontal={20}
        shadowConfig={{
          shadowOffset: {width: 0, height: 2},
          elevation: 2,
          shadowColor: theme.colors.placeHolderText,
        }}
        shadow
        borderRadius={8}
        direction="row"
        // padding={10}

        paddingHorizontal={20}
        alignItems="center"
        justifyContent="center"
        borderColor={theme.colors.border}
        borderWidth={1}>
        <TouchableOpacity onPress={() => onPressBack()}>
          <SvgIcon source="SearchIcon" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 1,
            fontSize: 15,
            fontWeight: '400',
            color: theme.colors.text,
            paddingLeft: 5,
          }}
          placeholder={showPlaceHolder}
          onBlur={onBlur}
          onChangeText={text => {
            setSearchText(text);
            if (text.trim().length > 0) {
              debouncedOnChangeText(text);
            }
          }}
          value={searchText}
          placeholderTextColor={theme.colors.gray00}
          keyboardType="default"
          onFocus={_onFocus}
          returnKeyType="search"
          onEndEditing={e => onSubmitText(e.nativeEvent.text)}
          returnKeyLabel="Search"
          onSubmitEditing={event => {
            onSubmitText(event.nativeEvent.text);
          }}
        />
        {showClose && (
          <TouchableOpacity
            style={{padding: 6}}
            onPress={() => {
              setSearchText('');
              onChangeText('');
              if (defaultText.length === 0) {
                goBack();
              }
            }}>
            {/* <SvgIcon source="CloseIcon" size={20} color={theme.colors.text} /> */}
          </TouchableOpacity>
        )}
        {/* <MyImage
            resizeMode="cover"
            defaultSource={ic_voice}
            style={{
              marginLeft: 10,
              height: 30,
              width: 30,
            }}
          /> */}
      </Block>
    </Block>
  );
};
export const SearchBar = React.memo(SearchBarComponent,isEqual);
