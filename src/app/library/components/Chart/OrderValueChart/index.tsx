// OrderValueChart.tsx
import React, {useState} from 'react';
import {} from 'react-native';
import {YAxis, StackedBarChart, XAxis} from 'react-native-svg-charts';
import {ChartCard} from '../ChartCard';
import {Block} from '../../Block';
import {createThemedStyles} from '@utils';

export type OrderSlice = {
  key: string;
  label: string;
  color: string;
  values: number[]; // one value per branch
};

type OrderValueChartProps = {
  title: string;
  branches: string[]; // ['Chi nhánh 1', ...]
  slices: OrderSlice[]; // array of series
};

export const OrderValueChart: React.FC<OrderValueChartProps> = ({
  title,
  branches,
  slices,
}) => {
  // visibility toggle
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(slices.map(s => [s.key, true])),
  );
  const toggle = (key: string) => setVisible(v => ({...v, [key]: !v[key]}));

  // filtered & chartData
  const filtered = slices.filter(s => visible[s.key]);
  const keys = filtered.map(s => s.key);
  const colors = filtered.map(s => s.color);

  // build chart rows per branch
  const chartData = branches.map((b, idx) => {
    const row: any = {branch: b};
    filtered.forEach(s => (row[s.key] = s.values[idx]));
    return row;
  });

  // YAxis total per stack
  const yData = chartData.map(item =>
    keys.reduce((sum, k) => sum + item[k], 0),
  );

  return (
    <ChartCard
      title={title}
      isCheckBox={false}
      legendItems={slices.map(s => ({
        key: s.key,
        label: s.label,
        color: s.color,
        visible: visible[s.key],
        onToggle: () => toggle(s.key),
      }))}>
      <Block style={styles.container}>
        <YAxis
          data={yData}
          contentInset={{top: 10, bottom: 10}}
          svg={{fontSize: 10, fill: 'grey'}}
          numberOfTicks={6}
          formatLabel={v => `${v}`}
        />
        <Block style={styles.chart}>
          <StackedBarChart
            style={{flex: 1}}
            data={chartData}
            keys={keys}
            colors={colors}
            showGrid={false}
            animate={true}
            spacingInner={0.8}
            spacingOuter={0.2}

            // width={10}
          />
          <XAxis
            style={{marginTop: 4}}
            data={branches}
            formatLabel={(_, idx) => branches[idx]}
            contentInset={{left: 30, right: 30}}
            svg={{fontSize: 10, fill: 'grey', rotation: 0, originY: 10, y: 5}}
          />
        </Block>
      </Block>
    </ChartCard>
  );
};

const styles = createThemedStyles({
  container: {flexDirection: 'row', height: 200},
  chart: {flex: 1, marginLeft: 8},
});
