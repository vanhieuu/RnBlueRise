// OrderValueChart.tsx
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Svg, { G, Rect, Text as SvgText, Line } from 'react-native-svg';
import { scaleBand, scaleLinear } from 'd3-scale';
import { Block } from '../../Block';
import { ChartCard } from '../ChartCard';
import { createThemedStyles } from '@utils';

export type OrderSlice = {
  key: string;
  label: string;
  color: string;
  values: number[]; // one per branch
};

type OrderValueChartProps = {
  title: string;
  branches: string[]; // ['Chi nhánh 1', ...]
  slices: OrderSlice[]; // series
};

export const OrderValueChart: React.FC<OrderValueChartProps> = ({
  title,
  branches,
  slices,
}) => {
  // 1) toggle visibility
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(slices.map((s) => [s.key, true])),
  );
  const toggle = (k: string) =>
    setVisible((v) => ({ ...v, [k]: !v[k] }));

  // 2) filter series
  const filtered = slices.filter((s) => visible[s.key]);
  if (filtered.length === 0) filtered.push(slices[0]);

  // 3) build chartData rows
  const chartData: Record<string, number>[] = branches.map((_, i) => {
    const row: Record<string, number> = {};
    filtered.forEach((s) => {
      row[s.key] = s.values[i];
    });
    return row;
  });

  // 4) totals per branch
  const totals = chartData.map((row) =>
    filtered.reduce((sum, s) => sum + (row[s.key] || 0), 0),
  );
  const maxTotal = Math.max(...totals, 1);

  // 5) dimensions
  const svgWidth = Dimensions.get('window').width - 32;
  const svgHeight = 240;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  // 6) scales
  const xScale = scaleBand<string>()
    .domain(branches)
    .range([0, width])
    .padding(0.2);

  const yScale = scaleLinear()
    .domain([0, maxTotal])
    .range([height, 0]);

  return (
    <ChartCard
      title={title}
      legendItems={slices.map((s) => ({
        key: s.key,
        label: s.label,
        color: s.color,
        visible: visible[s.key],
        onToggle: () => toggle(s.key),
      }))}
    >
      <Block style={styles.container}>
        <Svg width={svgWidth} height={svgHeight}>
          <G x={margin.left} y={margin.top}>
            {/* Y-axis grid & labels */}
            {yScale.ticks(5).map((t, i) => {
              const y = yScale(t);
              return (
                <G key={`y-tick-${i}`}>
                  <Line
                    x1={0}
                    x2={width}
                    y1={y}
                    y2={y}
                    stroke="#e6e6e6"
                  />
                  <SvgText
                    x={-6}
                    y={y + 4}
                    fontSize="10"
                    fill="#333"
                    textAnchor="end"
                  >
                    {t}
                  </SvgText>
                </G>
              );
            })}

            {/* Stacked columns */}
            {branches.map((branch, bi) => {
              let acc = 0;
              const bx = xScale(branch)!;
              const bw = xScale.bandwidth();
              // draw each segment
              return (
                <G key={`col-${bi}`}>
                  {filtered.map((s, si) => {
                    const v = chartData[bi][s.key] || 0;
                    const colHeight = height - yScale(v);
                    const by = yScale(acc + v);
                    const rect = (
                      <Rect
                        key={`rect-${bi}-${si}`}
                        x={bx}
                        y={by}
                        width={bw}
                        height={colHeight}
                        fill={s.color}
                      />
                    );
                    acc += v;
                    return rect;
                  })}
                  {/* Tổng label ở đỉnh cột */}
                  <SvgText
                    x={bx + bw / 2}
                    y={yScale(acc) - 2}
                    fontSize="10"
                    fill="#333"
                    textAnchor="middle"
                  >
                    {totals[bi]}
                  </SvgText>
                </G>
              );
            })}

            {/* X-axis labels */}
            {branches.map((branch, i) => {
              const cx = xScale(branch)! + xScale.bandwidth() / 2;
              return (
                <SvgText
                  key={`x-label-${i}`}
                  x={cx}
                  y={height + 15}
                  fontSize="10"
                  fill="#333"
                  textAnchor="middle"
                >
                  {branch}
                </SvgText>
              );
            })}
          </G>
        </Svg>
      </Block>
    </ChartCard>
  );
};

const styles = createThemedStyles({
  container: {
    marginVertical: 16,
  },
});
