// TeacherHoursChart.tsx
import React, { useMemo, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { G, Rect, Text as SvgText, Line } from 'react-native-svg';
import { scaleBand, scaleLinear } from 'd3-scale';
import isEqual from 'react-fast-compare';
import { ChartCard } from '../ChartCard';
import { Block } from '@library/components/Block';

export type TeacherHoursProps = {
  title: string;
  teachers: string[];      // ['GV A', 'GV B', …]
  mainLessons: number[];   // số buổi dạy chính
  subLessons: number[];    // số buổi dạy thay
  mainMinutes: number[];   // số phút dạy chính
  subHours: number[];      // số giờ dạy thay
};

const TeacherHoursChartComponent: React.FC<TeacherHoursProps> = ({
  title,
  teachers,
  mainLessons,
  subLessons,
  mainMinutes,
  subHours,
}) => {
  // legend toggles
  const [visible, setVisible] = useState({
    lessons: true,
    substituteLessons: true,
    minutes: true,
    substituteMinutes: true,
  });
  const toggle = (k: keyof typeof visible) =>
    setVisible(v => ({ ...v, [k]: !v[k] }));

  // our two series
  const sessionSeries = [
    { key: 'lessons',           color: '#4caf50', values: mainLessons },
    { key: 'substituteLessons', color: '#f44336', values: subLessons  },
  ];
  const hourSeries = [
    { key: 'minutes',           color: '#2196f3', values: mainMinutes.map(m => m / 60) },
    { key: 'substituteMinutes', color: '#ff9800', values: subHours },
  ];

  // dims & margins
  const svgW  = Dimensions.get('window').width - 32;
  const svgH  = 240;
  const margin= { top: 30, right: 10, bottom: 50, left: 80 };
  const cW    = svgW - margin.left - margin.right;
  const cH    = svgH - margin.top - margin.bottom;

  // compute overall max in the same “units” (lessons + hours)
  const xMax = Math.max(
    ...teachers.map((_,i)=>
      (visible.lessons           ? mainLessons[i]    : 0) +
      (visible.substituteLessons ? subLessons[i]     : 0) +
      (visible.minutes           ? mainMinutes[i]/60 : 0) +
      (visible.substituteMinutes? subHours[i]        : 0)
    ), 1
  );

  // scales
  const xScale = useMemo(()=> scaleLinear().domain([0,xMax]).range([0,cW]), [xMax,cW]);
  const yScale = useMemo(()=> 
    scaleBand<string>()
      .domain(teachers.flatMap((_,i)=>[`${i}-sess`,`${i}-hour`]))
      .range([0,cH])
      .paddingInner(0.6),
    [teachers,cH]
  );
  const ticks = useMemo(()=> xScale.ticks(5), [xScale]);

  return (
    <ChartCard
      title={title}
      legendItems={[
        { key:'lessons',           label:'Buổi chính',     color:'#4caf50', visible:visible.lessons,            onToggle:()=>toggle('lessons') },
        { key:'substituteLessons', label:'Buổi thay',      color:'#f44336', visible:visible.substituteLessons,   onToggle:()=>toggle('substituteLessons') },
        { key:'minutes',           label:'Giờ chính',      color:'#2196f3', visible:visible.minutes,            onToggle:()=>toggle('minutes') },
        { key:'substituteMinutes', label:'Giờ thay',       color:'#ff9800', visible:visible.substituteMinutes,   onToggle:()=>toggle('substituteMinutes') },
      ]}
    >
      <Block marginHorizontal={10} marginTop={10}>
        <Svg width={svgW} height={svgH}>
          <G x={margin.left} y={margin.top}>

            {/* vertical grid & bottom ticks */}
            {ticks.map((t,i)=>(
              <G key={i}>
                <Line
                  x1={xScale(t)} y1={0}
                  x2={xScale(t)} y2={cH}
                  stroke="#eee" strokeWidth={0.5}
                />
                <SvgText
                  x={xScale(t)} y={cH+20}
                  fontSize="10" fill="#333"
                  textAnchor="middle"
                >
                  {t.toFixed(1)}h
                </SvgText>
              </G>
            ))}

            {/* each teacher has two rows */}
            {teachers.map((name, ti)=>{
              // 1) sessions row
              const yS = yScale(`${ti}-sess`)!;
              let accL = 0;
              sessionSeries.forEach(s => accL += visible[s.key as keyof typeof visible] ? s.values[ti] : 0);
              const totalSess = accL;

              // now draw them
              let running = 0;
              const sessBars = sessionSeries.map((s, si) => {
                const v = visible[s.key as keyof typeof visible] ? s.values[ti] : 0;
                const w = xScale(v);
                const bar = (
                  <Rect
                    key={`sess-bar-${ti}-${si}`}
                    x={xScale(running)} y={yS}
                    width={w} height={yScale.bandwidth()}
                    fill={s.color}
                  />
                );
                running += v;
                return bar;
              });

              // 2) hours row
              const yH = yScale(`${ti}-hour`)!;
              let accH = 0;
              hourSeries.forEach(s => accH += visible[s.key as keyof typeof visible] ? s.values[ti] : 0);
              const totalHrs = accH;

              running = 0;
              const hourBars = hourSeries.map((s, si) => {
                const v = visible[s.key as keyof typeof visible] ? s.values[ti] : 0;
                const w = xScale(v);
                const bar = (
                  <Rect
                    key={`hour-bar-${ti}-${si}`}
                    x={xScale(running)} y={yH}
                    width={w} height={yScale.bandwidth()}
                    fill={s.color}
                  />
                );
                running += v;
                return bar;
              });

              return (
                <G key={ti}>
                  {/* session bars & one total */}
                  {sessBars}
                  <SvgText
                    x={xScale(totalSess)+4}
                    y={yS + yScale.bandwidth()/2 + 4}
                    fontSize="10" fill="#333"
                  >
                    {totalSess}
                  </SvgText>

                  {/* hour bars & one total */}
                  {hourBars}
                  <SvgText
                    x={xScale(totalHrs)+4}
                    y={yH + yScale.bandwidth()/2 + 4}
                    fontSize="10" fill="#333"
                  >
                    {totalHrs.toFixed(1)}h
                  </SvgText>

                  {/* teacher label */}
                  <SvgText
                    x={-6}
                    y={(yS + yH + yScale.bandwidth())/2}
                    fontSize="10" fill="#000"
                    textAnchor="end"
                    alignmentBaseline="middle"
                  >
                    {name}
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

export const TeacherHoursChart = React.memo(TeacherHoursChartComponent, isEqual);

const styles = StyleSheet.create({});
