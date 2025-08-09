// ChartCard.tsx
import {Block} from '@library/components/Block';
import {Text} from '@library/components/Text';
import {createThemedStyles} from '@utils';
import React from 'react';
import isEqual from 'react-fast-compare';
import {StyleProp, ViewStyle} from 'react-native';

type ChartCardProps = {
  title: string;
  legendItems: {
    key: string;
    label: string;
    color: string;
    visible: boolean;
    onToggle: () => void;
  }[];
  children: React.ReactNode;
  isCheckBox?: boolean;
  containContentStyle?: StyleProp<ViewStyle>;
};

const ChartCardComponent: React.FC<ChartCardProps> = ({
  title,
  legendItems,
  children,
  isCheckBox = true,
  containContentStyle,
}) => (
  <Block style={[styles.card, containContentStyle]}>
    <Text style={styles.title}>{title}</Text>
    <Block style={styles.chartContainer}>{children}</Block>
    <Block style={styles.legend}>
      {legendItems.map(item => (
        <Block key={item.key} style={styles.legendItem}>
          {isCheckBox ? (
            <Text
              onPress={item.onToggle}
              style={[
                styles.checkbox,
                {borderColor: item.color},
                !item.visible && styles.unchecked,
              ]}>
              {item.visible ? '☑' : '☐'}
            </Text>
          ) : (
            <Block
              marginRight={10}
              color={item.visible ? item.color : 'gray'}
              width={10}
              height={10}
            />
          )}
          <Text
            style={[
              styles.legendLabel,
              {
                color: isCheckBox
                  ? item.color
                  : item.visible
                  ? 'black'
                  : 'gray',
              },
            ]}
            onPress={item.onToggle}>
            {item.label}
          </Text>
        </Block>
      ))}
    </Block>
    <Block direction="row" alignItems="center">
      <Text fontSize={10} colorTheme="red01">
        *
      </Text>
      <Text fontSize={12} colorTheme="grayIconHome">
        Bấm vào từng ô để ẩn/hiện thông số
      </Text>
    </Block>
  </Block>
);
export const ChartCard = React.memo(ChartCardComponent, isEqual);

const styles = createThemedStyles({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 16,
    padding: 10,
    marginHorizontal: 8,

    // elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  chartContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  checkbox: {
    width: 18,
    textAlign: 'center',
    marginRight: 4,
  },
  unchecked: {
    color: '#ccc',
  },
  legendLabel: {
    fontSize: 14,
  },
});
