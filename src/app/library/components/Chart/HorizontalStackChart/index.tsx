// TeacherHoursChart.tsx
import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Svg, { G, Rect, Text as SvgText } from 'react-native-svg';
import { scaleBand, scaleLinear } from 'd3-scale';
import isEqual from 'react-fast-compare';
import { ChartCard } from '../ChartCard';

export type TeacherSlice = {
  key: 'main' | 'sub';
  label: string;
  color: string;
  values: number[];
};

type TeacherHoursProps = {
  title: string;
  teachers: string[];
  // original arrays
  mainLessons: number[];
  subLessons: number[];
  mainMinutes: number[];
  subHours: number[];   // in hours
};

export const TeacherHoursChart: React.FC<TeacherHoursProps> = ({
  title,
  teachers,
  mainLessons,
  subLessons,
  mainMinutes,
  subHours,
}) => {
  // Legend toggle state
  const [visible, setVisible] = useState({
    lessons: true,
    substituteLessons: true,
    minutes: true,
    substituteMinutes: true,
  });
  const toggle = (k: keyof typeof visible) =>
    setVisible(v => ({ ...v, [k]: !v[k] }));

  // Prepare the four series
  const sessionSeries: TeacherSlice[] = [
    { key: 'main', label: 'Dạy chính', color: '#4caf50', values: mainLessons },
    { key: 'sub',  label: 'Dạy thay',  color: '#f44336', values: subLessons },
  ];
  const minuteSeries: TeacherSlice[] = [
    { key: 'main', label: 'Phút chính', color: '#2196f3', values: mainMinutes },
    { key: 'sub',  label: 'Phút thay',   color: '#ff9800', values: subHours.map(h => h * 60) },
  ];

  // Dimensions
  const svgWidth = Dimensions.get('window').width - 32;
  const svgHeight = 240;
  const margin = { top: 20, right: 10, bottom: 40, left: 80 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // Compute combined totals for domain
  const maxSess = Math.max(
    ...teachers.map((_, i) => sessionSeries[0].values[i] + sessionSeries[1].values[i])
  );
  const maxMin = Math.max(
    ...teachers.map((_, i) => minuteSeries[0].values[i] + minuteSeries[1].values[i])
  );
  const xMax = Math.max(maxSess, maxMin);

  // Scales
  const xScale = useMemo(
    () => scaleLinear().domain([0, xMax]).range([0, chartWidth]),
    [xMax, chartWidth]
  );
  const yDomain = teachers.flatMap((_, i) => [`${i}-sess`, `${i}-min`]);
  const yScale = useMemo(
    () => scaleBand<string>().domain(yDomain).range([0, chartHeight]).paddingInner(0.3),
    [yDomain, chartHeight]
  );
  const xTicks = useMemo(() => xScale.ticks(5), [xScale]);

  return (
    <ChartCard
      title={title}
      legendItems={[
        { key: 'lessons',           label: 'Dạy chính',       color: '#4caf50',      visible: visible.lessons,           onToggle: () => toggle('lessons') },
        { key: 'substituteLessons', label: 'Dạy thay',        color: '#f44336',      visible: visible.substituteLessons, onToggle: () => toggle('substituteLessons') },
        { key: 'minutes',           label: 'Phút chính',      color: '#2196f3',      visible: visible.minutes,           onToggle: () => toggle('minutes') },
        { key: 'substituteMinutes', label: 'Phút thay',       color: '#ff9800',      visible: visible.substituteMinutes, onToggle: () => toggle('substituteMinutes') },
      ]}
    >
      <ScrollView horizontal>
        <Svg width={svgWidth} height={svgHeight}>
          <G x={margin.left} y={margin.top}>
            {/* X grid & ticks */}
            {xTicks.map((t, i) => {
              const x = xScale(t);
              return (
                <G key={i}>
                  <Rect x={x} y={0} width={1} height={chartHeight} fill="#eee" />
                  <SvgText x={x} y={chartHeight + 20} fontSize="10" fill="#333" textAnchor="middle">
                    {t}
                  </SvgText>
                </G>
              );
            })}

            {/* Bars & value labels */}
            {teachers.map((t, ti) => {
              // Session bar stacking
              const sessY = yScale(`${ti}-sess`)!;
              let accSess = 0;
              const sessBars = sessionSeries.map((s, si) => {
                if (!visible[si === 0 ? 'lessons' : 'substituteLessons']) return null;
                const v = s.values[ti];
                const bar = (
                  <Rect
                    key={`sess-${s.key}-${ti}`}
                    x={xScale(accSess)}
                    y={sessY}
                    width={xScale(v)}
                    height={yScale.bandwidth()}
                    fill={s.color}
                  />
                );
                accSess += v;
                return bar;
              });
              const totalSess = sessionSeries.reduce((sum, s) => sum + s.values[ti], 0);

              // Minutes bar stacking
              const minY = yScale(`${ti}-min`)!;
              let accMin = 0;
              const minBars = minuteSeries.map((s, si) => {
                if (!visible[si === 0 ? 'minutes' : 'substituteMinutes']) return null;
                const v = s.values[ti];
                const bar = (
                  <Rect
                    key={`min-${s.key}-${ti}`}
                    x={xScale(accMin)}
                    y={minY}
                    width={xScale(v)}
                    height={yScale.bandwidth()}
                    fill={s.color}
                  />
                );
                accMin += v;
                return bar;
              });
              const totalMin = minuteSeries.reduce((sum, s) => sum + s.values[ti], 0);

              return (
                <G key={ti}>
                  {sessBars}
                  <SvgText
                    x={xScale(totalSess) + 4}
                    y={sessY + yScale.bandwidth() / 2 + 4}
                    fontSize="10"
                    fill="#333"
                  >
                    {totalSess}
                  </SvgText>

                  {minBars}
                  <SvgText
                    x={xScale(totalMin) + 4}
                    y={minY + yScale.bandwidth() / 2 + 4}
                    fontSize="10"
                    fill="#333"
                  >
                    {totalMin}
                  </SvgText>

                  {/* Teacher label */}
                  <SvgText
                    x={-6}
                    y={(sessY + minY + yScale.bandwidth()) / 2}
                    fontSize="10"
                    fill="#000"
                    textAnchor="end"
                    alignmentBaseline="middle"
                  >
                    {t}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </ScrollView>
    </ChartCard>
  );
};

const styles = StyleSheet.create({});
