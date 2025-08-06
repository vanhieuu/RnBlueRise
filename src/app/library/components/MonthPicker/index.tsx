// MonthPicker.tsx
import React, {useState, useMemo, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {Block} from '../Block';
import {Text} from '../Text';
import {createThemedStyles} from '@utils';
import isEqual from 'react-fast-compare';
import {SvgIcon} from '../svg-icon';

const ITEM_WIDTH = 100;

interface MonthPickerProps {
  /** which month is currently selected (0–11) */
  selectedMonth: number;
  /** optional year to display; defaults to current calendar year */
  year?: number;
  /** callback when user picks a month */
  onChange: (monthIndex: number) => void;
}

const MonthPickerComponent: React.FC<MonthPickerProps> = ({
  selectedMonth,
  year,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const flatRef = useRef<FlatList<number>>(null);

  // default to this year if no year prop provided
  const displayYear = year ?? new Date().getFullYear();

  // months 0–11 of displayYear
  const months = useMemo(
    () => Array.from({length: 12}, (_, i) => i),
    [displayYear],
  );

  // scroll to selection on open
  useEffect(() => {
    if (open && flatRef.current) {
      flatRef.current.scrollToIndex({
        index: selectedMonth,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [open, selectedMonth]);

  const formatLabel = (m: number) => `Tháng ${m + 1}/${displayYear}`;

  const renderMonth = ({item: m}: ListRenderItemInfo<number>) => {
    const isSelected = m === selectedMonth;
    return (
      <TouchableOpacity
        style={[styles.monthButton, isSelected && styles.monthButtonActive]}
        onPress={() => {
          onChange(m);
          setOpen(false);
        }}
        activeOpacity={0.7}>
        <Text style={[styles.monthText, isSelected && styles.monthTextActive]}>
          {formatLabel(m)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Block style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.7}
        onPress={() => setOpen(o => !o)}>
        <Block direction="row">
          <SvgIcon source="CalendarIcon" size={20} />
          <Text style={styles.headerText} fontWeight="bold">
            Chọn tháng: {formatLabel(selectedMonth)}
          </Text>
        </Block>
        <Text style={styles.arrow}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open && (
        <FlatList
          ref={flatRef}
          data={months}
          horizontal
          keyExtractor={i => i.toString()}
          renderItem={renderMonth}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, idx) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * idx,
            index: idx,
          })}
          initialScrollIndex={selectedMonth}
          contentContainerStyle={styles.list}
        />
      )}
    </Block>
  );
};

export const MonthPicker = React.memo(MonthPickerComponent, isEqual);

const styles = createThemedStyles({
  container: {
    margin: 16,
    // paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffff',
    borderRadius: 6,
    justifyContent:'space-between'
  },
  headerText: {

    fontSize: 14,
  },
  arrow: {
    // marginLeft: 8,
    fontSize: 12,
    // marginRight:16
  },
  list: {
    paddingVertical: 8,
  },
  monthButton: {
    width: ITEM_WIDTH,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
  },
  monthButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  monthText: {
    fontSize: 13,
    color: '#333',
  },
  monthTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});
