// ReportList.tsx
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Block, SvgIcon, Text, TouchableScale} from '@components';
import {Report,} from './report';
import {AppTheme, useTheme} from '@theme';
import {createThemedStyles} from '@utils';
import { FlashList } from '@shopify/flash-list';

type ReportListProps = {
  data: Report[];
  onPressItem?: (item:Report) => void;
};

export const ReportList: React.FC<ReportListProps> = ({
  data,
  onPressItem,
}) => {
  const theme = useTheme();
  const styles = reportListStyles(theme);
  const renderItem = ({item, index}: {item: Report; index: number}) => {
    const {Icon, title, entries} = item;

    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        onPress={() => onPressItem?.(item)}>
        <Block style={styles.iconContainer}>
          <SvgIcon source={Icon} size={20} />
        </Block>
        <Block style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {entries.map((line, i) => (
            <Text key={i} style={styles.entry}>
              • {line}
            </Text>
          ))}
        </Block>
      </TouchableOpacity>
    );
  };

  return (
    <FlashList
      data={data}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const reportListStyles = (theme: AppTheme) =>
  createThemedStyles({
    list: {
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      padding: 12,
      marginBottom: 12,
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 2, // shadow on Android
      shadowColor: '#000', // shadow on iOS
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    iconContainer: {
      width: 40,
      height: 40,
      marginRight: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    entry: {
      fontSize: 14,
      color: '#555',
      marginVertical: 1,
    },
  });
