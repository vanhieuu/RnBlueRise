import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppTheme, useTheme} from '@theme';
import {createThemedStyles} from '@utils';
import {Text} from '@components';
import isEqual from 'react-fast-compare';

type Props = {
  id: string | number;
  label: string;
  selected: any;
  handleSelected: (id: string | number) => void;
};

const RenderListSelect = ({id, label, selected, handleSelected}: Props) => {
  const theme = useTheme();
  const styles = optionStyles(theme);

  return (
    <TouchableOpacity
      style={styles.containSelect(selected, id)}
      onPress={() => handleSelected(id)}>
      <Text
        fontSize={14}
        fontWeight="400"
        colorTheme={selected === id ? 'white' : 'black'}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(RenderListSelect,isEqual);

const optionStyles = (theme: AppTheme) =>
  createThemedStyles({
    containSelect: (selected: any, id: any) => ({
      backgroundColor:
        selected === id ? theme.colors.primaryLight : theme.colors.body,
      borderWidth: 1,
      borderColor: selected === id ? theme.colors.secondBlue : theme.colors.gray00,
      marginHorizontal: 10,
      padding: 10,
    }),
  });
