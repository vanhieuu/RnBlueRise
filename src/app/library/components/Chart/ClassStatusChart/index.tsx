// ClassStatusChart.tsx
import React, {useState, useMemo} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, {G, Rect, Text as SvgText} from 'react-native-svg';
import {scaleBand, scaleLinear} from 'd3-scale';
import isEqual from 'react-fast-compare';
import {ChartCard} from '../ChartCard';
import {Block} from '@library/components/Block';

export type StatusSlice = {
  key: string;
  label: string;
  color: string;
  values: number[]; // one per branch
};

type ClassStatusChartProps = {
  title: string;
  branches: string[]; // e.g. ['CN1','CN2','CN3']
  slices: StatusSlice[];
};

const ClassStatusChartComponent: React.FC<ClassStatusChartProps> = ({
  title,
  branches,
  slices,
}) => {
  // Legend toggle state
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(slices.map(s => [s.key, true])),
  );
  const toggle = (k: string) => setVisible(v => ({...v, [k]: !v[k]}));

  // Filtered series
  const filtered = useMemo(
    () => slices.filter(s => visible[s.key]),
    [slices, visible],
  );
  if (filtered.length === 0) filtered.push(slices[0]);

  // Dimensions & margins
  const svgWidth = Dimensions.get('window').width - 32;
  const svgHeight = 240;            // a bit taller to accommodate values + labels
  const margin = {
    top: 20,
    right: 10,
    bottom: 50,                    // increased bottom margin
    left: 40,
  };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // Scales
  const x0 = useMemo(
    () =>
      scaleBand<string>()
        .domain(branches)
        .range([0, chartWidth])
        .padding(0.2),
    [branches, chartWidth],
  );
  const x1 = useMemo(
    () =>
      scaleBand<string>()
        .domain(filtered.map(s => s.key))
        .range([0, x0.bandwidth()])
        .padding(0.1),
    [filtered, x0],
  );
  const maxTotal = Math.max(
    ...branches.map((_, i) =>
      filtered.reduce((sum, s) => sum + s.values[i], 0),
    ),
  );
  const y = useMemo(
    () => scaleLinear().domain([0, maxTotal]).range([chartHeight, 0]),
    [maxTotal, chartHeight],
  );

  return (
    <ChartCard
      title={title}
      legendItems={slices.map(s => ({
        key: s.key,
        label: s.label,
        color: s.color,
        visible: visible[s.key],
        onToggle: () => toggle(s.key),
      }))}
    >
      <Block>
        <Svg width={svgWidth} height={svgHeight}>
          <G x={margin.left} y={margin.top}>
            {/* Bars */}
            {branches.map((branch, bi) =>
              filtered.map((series, si) => {
                const value = series.values[bi];
                const barX = x0(branch)! + x1(series.key)!;
                const barY = y(value);
                const barW = x1.bandwidth();
                const barH = chartHeight - barY;
                return (
                  <G key={`${series.key}-${branch}`}>
                    <Rect
                      x={barX}
                      y={barY}
                      width={barW}
                      height={barH}
                      fill={series.color}
                    />
                    {/* Value label */}
                    <SvgText
                      x={barX + barW / 2}
                      y={barY - 4}
                      fontSize="10"
                      fill={series.color}
                      textAnchor="middle"
                    >
                      {value}
                    </SvgText>
                  </G>
                );
              }),
            )}

            {/* X‐Axis labels (moved down by the larger bottom margin) */}
            {branches.map((branch, i) => (
              <SvgText
                key={`x-${branch}`}
                x={x0(branch)! + x0.bandwidth() / 2}
                y={chartHeight + 20}      // moved lower
                fontSize={10}
                fill="#333"
                textAnchor="middle"
              >
                {branch}
              </SvgText>
            ))}

            {/* Y‐Axis ticks & grid */}
            {y.ticks(5).map((tickValue, ti) => {
              const yPos = y(tickValue);
              return (
                <G key={`y-${ti}`}>
                  {/* grid line */}
                  <Rect
                    x={0}
                    y={yPos}
                    width={chartWidth}
                    height={1}
                    fill="#e6e6e6"
                  />
                  {/* tick label */}
                  <SvgText
                    x={-6}
                    y={yPos + 4}
                    fontSize={10}
                    fill="#333"
                    textAnchor="end"
                  >
                    {tickValue}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </Block>
    </ChartCard>
  );
};

export const ClassStatusChart = React.memo(
  ClassStatusChartComponent,
  isEqual,
);

const styles = StyleSheet.create({});
