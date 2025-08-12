// StackedBarChartCard.tsx
import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { G, Rect, Text as SvgText, Line } from 'react-native-svg';
import { scaleBand, scaleLinear } from 'd3-scale';
import { Block } from '@components';
import { ChartCard } from '../ChartCard';
import { createThemedStyles } from '@utils';

export type BarSeries = {
  key: string;
  label: string;
  data: { branch: string; value: number }[];
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
  // State để toggle series
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(series.map((s) => [s.key, true])),
  );
  const toggle = (k: string) =>
    setVisible((v) => ({ ...v, [k]: !v[k] }));

  // Lọc những series được bật
  const filtered = series.filter((s) => visible[s.key]);
  if (filtered.length === 0) filtered.push(series[0]);

  // Các nhánh, keys, colors
  const branches = series[0].data.map((d) => d.branch);
  const keys = filtered.map((s) => s.key);
  const colors = filtered.map((s) => s.color);

  // Kích thước SVG
  const svgWidth = Dimensions.get('window').width - 32;
  const svgHeight = 240;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  // Tạo data dạng hàng theo branch
  const chartData = branches.map((branch, i) => {
    const row: Record<string, number> = {} as any;
    filtered.forEach((s) => {
      row[s.key] = s.data[i].value;
    });
    return row;
  });

  // Tính tổng stack cho mỗi cột
  const totals = chartData.map((row) =>
    keys.reduce((sum, k) => sum + (row[k] || 0), 0),
  );

  // Scale X cho nhóm branches
  const x0 = scaleBand<string>()
    .domain(branches)
    .range([0, width])
    .padding(0.2);

  // Scale X1 cho mỗi series trong nhóm
  const x1 = scaleBand<string>()
    .domain(keys)
    .range([0, x0.bandwidth()])
    .padding(0.1);

  // Scale Y từ 0..maxTotal xuống chiều cao
  const maxTotal = Math.max(...totals, 1);
  const y = scaleLinear()
    .domain([0, maxTotal])
    .range([height, 0]);

  return (
    <ChartCard
      title={title}
      legendItems={series.map((s) => ({
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
            {/* --- Trục Y (Grid + Labels) --- */}
            {y.ticks(5).map((tick, i) => {
              const yPos = y(tick);
              return (
                <G key={`y-grid-${i}`}>
                  {/* Đường kẻ ngang */}
                  <Line
                    x1={0}
                    x2={width}
                    y1={yPos}
                    y2={yPos}
                    stroke="#e6e6e6"
                  />
                  {/* Nhãn giá trị */}
                  <SvgText
                    x={-6}
                    y={yPos + 4}
                    fontSize="10"
                    fill="#333"
                    textAnchor="end"
                  >
                    {tick}
                  </SvgText>
                </G>
              );
            })}

            {/* --- Các thanh stacked + nhãn trên đỉnh --- */}
            {branches.map((branch, bi) =>
              filtered.map((s, si) => {
                const v = s.data[bi].value;
                const bx = x0(branch)! + x1(s.key)!;
                const by = y(v);
                const bw = x1.bandwidth();
                const bh = height - by;
                return (
                  <G key={`${s.key}-${branch}`}>
                    <Rect
                      x={bx}
                      y={by}
                      width={bw}
                      height={bh}
                      fill={s.color}
                    />
                    <SvgText
                      x={bx + bw / 2}
                      y={by - 2}
                      fontSize="10"
                      fill="#333"
                      textAnchor="middle"
                    >
                      {v}
                    </SvgText>
                  </G>
                );
              }),
            )}

            {/* --- Trục X (Nhãn dưới đáy) --- */}
            {branches.map((branch, i) => {
              const cx = x0(branch)! + x0.bandwidth() / 2;
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
