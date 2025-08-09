import {StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {Block, Text} from '@components';
import {AppTheme, useTheme} from '@theme';
import {createThemedStyles} from '@utils';

type Props = {
  title: string;
  value: any;
  percent: any;
  previousValue: any;
};

const CardStatusItem = ({percent, previousValue, title, value}: Props) => {
  const theme = useTheme();
  const styles = cardStyles(theme);
  const isPositive = percent >= 0;
  const percentColor = useMemo(
    () => (isPositive ? theme.colors.correctAnswer : theme.colors.redAlert),
    [],
  );

  return (
    <Block style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Block style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.percent} color={percentColor}>
          {isPositive ? '+' : '-'}
          {percent}%
        </Text>
      </Block>
      <Text style={styles.subText}>Tháng trước: {previousValue}</Text>
    </Block>
  );
};

export default React.memo(CardStatusItem, isEqual);

const cardStyles = (theme: AppTheme) =>
  createThemedStyles({
    card: {
      backgroundColor: theme.colors.body,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.black,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      // marginHorizontal: 32,
      paddingHorizontal: 16,
      marginTop:10,
      width:320,

      // alignItems:'center',
      paddingVertical:10,
      alignSelf:'center'
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textGrey,
      marginBottom: 8,
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    value: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.black,
    },
    percent: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    subText: {
      fontSize: 12,
      color: theme.colors.textGrey,
    },
  });
