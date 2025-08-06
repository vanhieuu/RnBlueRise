// StackedBarChartCard.tsx
import React, {useState} from 'react';

import {YAxis, StackedBarChart, XAxis} from 'react-native-svg-charts';


import {Block} from '@components';
import {ChartCard} from '../ChartCard';
import {createThemedStyles} from '@utils';

export type BarSeries = {
  key: string;
  label: string;
  data: {branch: string; value: number}[];
  color: string;
};

type StackedBarChartCardProps = {
  title: string;
  series: BarSeries[];
};

export const StackedBarChartCard: React.FC<StackedBarChartCardProps> = ({
  title,
  series,
}) => {
  // Visibility toggle for each series
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(series.map(s => [s.key, true])),
  );
  const toggle = (key: string) => setVisible(v => ({...v, [key]: !v[key]}));

  // Filtered series and chart data
  const filtered = series.filter(s => visible[s.key]);
  if (filtered.length === 0) {
    // avoid empty chart
    filtered.push(series[0]);
  }

  const branches = series[0].data.map(d => d.branch);
  const keys = filtered.map(s => s.key);
  const colors = filtered.map(s => s.color);

  // Build the stacked data rows
  const chartData = branches.map((branch, idx) => {
    const row: Record<string, number | string> = {branch};
    filtered.forEach(s => {
      row[s.key] = s.data[idx].value;
    });
    return row;
  });

  // YAxis expects an array of numbers: the total for each stack
  const yAxisData = chartData.map(item =>
    keys.reduce((sum, key) => sum + (item[key] as number), 0),
  );

  return (
    <ChartCard
      title={title}
      legendItems={series.map(s => ({
        key: s.key,
        label: s.label,
        color: s.color,
        visible: visible[s.key],
        onToggle: () => toggle(s.key),
      }))}>
      <Block style={styles.container}>
        <YAxis
          data={yAxisData}
          contentInset={{top: 10, bottom: 10}}
          svg={{fontSize: 10, fill: 'grey'}}
          numberOfTicks={6}
          formatLabel={value => `${value}`}
        />
        <Block style={styles.chartArea}>
          <StackedBarChart
            style={{flex: 1}}
            data={chartData}
            keys={keys}
            colors={colors}
            showGrid={false}
          />
          <XAxis
            style={{marginTop: 4}}
            data={branches}
            formatLabel={(_, idx) => branches[idx]}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: 'grey'}}
          />
        </Block>
      </Block>
    </ChartCard>
  );
};

const styles = createThemedStyles({
  container: {
    height: 200,
    flexDirection: 'row',
  },
  chartArea: {
    flex: 1,
    marginLeft: 8,
  },
});
