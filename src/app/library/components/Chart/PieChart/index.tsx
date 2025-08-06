// PieChartCard.tsx
import {Text as SvgText} from 'react-native-svg';
import React, {useState} from 'react';
import {PieChart} from 'react-native-svg-charts';
import {ChartCard} from '../ChartCard';
import isEqual from 'react-fast-compare';
import {Block} from '@library/components/Block';
import {Text} from '@library/components/Text';
import {ViewStyle} from 'react-native';

export type PieSlice = {
  key: string;
  label: string;
  value: number;
  color: string;
};

type PieChartCardProps = {
  title: string;
  data: PieSlice[];
  isCheckBox?: boolean;
  horizontal?: boolean;
  content?: string;
};

const PieChartCardComponent: React.FC<PieChartCardProps> = ({
  title,
  data,
  isCheckBox = true,
  horizontal = false,
  content = '',
}) => {
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(data.map(d => [d.key, true])),
  );

  const toggle = (key: string) => setVisible(v => ({...v, [key]: !v[key]}));

  const filtered = data.filter(d => visible[d.key]);
  const total = filtered.reduce((sum, d) => sum + d.value, 0);

  const chartData = filtered.map(slice => ({
    value: slice.value,
    svg: {fill: slice.color},
    key: slice.key,
    arc: {outerRadius: '100%', innerRadius: '60%'},
  }));

  // custom label decorator
  const Labels = ({slices}: any) =>
    slices.map((slice: any, index: number) => {
      const {pieCentroid, data} = slice;
      const percent = Math.round((data.value / total) * 100);
      return (
        <SvgText
          key={`label-${index}`}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="white"
          fontSize="12"
          textAnchor="middle">
          {percent}%
        </SvgText>
      );
    });

  return (
    <ChartCard
      title={title}
      isCheckBox={isCheckBox}
      legendItems={data.map(d => ({
        key: d.key,
        label: d.label,
        color: d.color,
        visible: visible[d.key],
        onToggle: () => toggle(d.key),
      }))}>
      <Block
        style={{flexDirection: horizontal ? 'row' : undefined} as ViewStyle}>
        {horizontal && (
          <Block block alignSelf="flex-end">
            <Text fontSize={12} fontWeight="400" colorTheme="text">
              {content}
            </Text>
          </Block>
        )}

        <Block>
          <PieChart style={{height: 200, width: 200}} data={chartData}>
            <Labels />
          </PieChart>
        </Block>
      </Block>
    </ChartCard>
  );
};
export const PieChartCard = React.memo(PieChartCardComponent, isEqual);
