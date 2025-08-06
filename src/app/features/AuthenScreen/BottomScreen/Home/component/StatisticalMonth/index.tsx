import React, {useMemo} from 'react';
import {Dimensions} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {Circle, G, Line, Rect, Text as SvgText} from 'react-native-svg';
import {Block, PieChartCard, PieSlice, Text} from '@components';

const {width} = Dimensions.get('window');

type DecoratorProps = {
  x?: (index: number) => number;
  y?: (value: number) => number;
  data: number[];
  color: string;
};

const Decorator: React.FC<DecoratorProps> = ({x, y, data, color}) => (
  <G>
    {data.map((value, index) => (
      <Circle
        key={index}
        cx={x?.(index)}
        cy={y?.(value)}
        r={4}
        stroke="white"
        fill={color}
      />
    ))}
  </G>
);

const HighlightLine = ({
  x,
  height,
  index,
}: {
  x: (index: number) => number;
  height: number;
  index: number;
}) => (
  <Line
    x1={x(index)}
    x2={x(index)}
    y1={0}
    y2={height}
    stroke="green"
    strokeDasharray={[4, 4]}
    strokeWidth={2}
  />
);

const AnimatedChartCard = () => {
  const pieData: PieSlice[] = [
    {key: 'cn1', label: 'Chi nhánh 1', value: 25, color: '#4caf50'},
    {key: 'cn2', label: 'Chi nhánh 2', value: 12, color: '#f44336'},
    {key: 'cn3', label: 'Chi nhánh 3', value: 63, color: '#2196f3'},
  ];

  const collected = [200, 150, 180, 220, 300, 350, 500];
  const debt = [100, 110, 95, 105, 120, 100, 130];
  const dates = ['12/08', '16/08', '20/08', '22/08', '25/08', '27/08', '30/08'];
  const highlightIndex = 5; // example index for current date

  const chartHeight = 200;

  // Determine label styles in XAxis
  const xAxisLabels = useMemo(
    () =>
      dates.map((date, idx) => {
        if (idx === highlightIndex) {
          return {value: date, highlight: true};
        }
        return {value: date, highlight: false};
      }),
    [],
  );

  return (
    <Block padding={16} block colorTheme="body">
      <Block marginBottom={10}>
        <Text fontSize={14} fontWeight="bold">
          Thống kê tháng này
        </Text>
      </Block>

      {/* Pie Chart Section */}
      <Block
        colorTheme="white"
        padding={16}
        borderRadius={12}
        marginBottom={20}>
        <PieChartCard
          isCheckBox={false}
          title="Tổng số học viên mới theo chi nhánh"
          data={pieData}
        />
      </Block>

      {/* Line Chart Section */}
      <Block colorTheme="white" borderRadius={12} padding={16}>
        <Text style={{fontWeight: '400', fontSize: 12, marginBottom: 10}}>
          Doanh thu tháng này
        </Text>
        <Block direction="row">
          <YAxis
            data={[0, 100, 200, 300, 400, 500, 600]}
            contentInset={{top: 20, bottom: 20}}
            svg={{fontSize: 10, fill: '#888'}}
            numberOfTicks={6}
            formatLabel={value => `${value}.tr`}
          />
          <Block block>
            <LineChart
              style={{height: chartHeight, width: width - 100}}
              data={collected}
              svg={{stroke: 'dodgerblue', strokeWidth: 2}}
              contentInset={{top: 20, bottom: 20}}
              curve={shape.curveMonotoneX}>
              <Grid direction={Grid.Direction.HORIZONTAL} />
              <Decorator data={collected} color="dodgerblue" />
              <HighlightLine
                x={i => i * ((width - 100) / (collected.length - 1))}
                height={chartHeight}
                index={highlightIndex}
              />
            </LineChart>
            <LineChart
              style={{
                height: chartHeight,
                width: width - 100,
                position: 'absolute',
              }}
              data={debt}
              svg={{stroke: 'orange', strokeWidth: 2}}
              contentInset={{top: 20, bottom: 20}}
              curve={shape.curveMonotoneX}>
              <Decorator data={debt} color="orange" />
            </LineChart>

            {/* Replace <XAxis> with custom row of Text */}
            <Block
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
                paddingHorizontal: 5,
              }}>
              {dates.map((date, idx) => (
                <Text
                  key={idx}
                  style={{
                    fontSize: 8,
                    color: idx === highlightIndex ? 'green' : '#888',
                    fontWeight: idx === highlightIndex ? 'bold' : 'normal',
                    transform: [{rotate: '30deg'}],
                    width: (width - 100) / collected.length,
                    textAlign: 'center',
                  }}>
                  {date}
                </Text>
              ))}
            </Block>
          </Block>
        </Block>
        <Block direction="row" justifyContent="center" marginTop={12}>
          <Block
            direction="row"
            alignItems="center"
            marginRight={16}
            paddingHorizontal={8}
            paddingVertical={4}
            borderRadius={8}
            color="#e6f0ff">
            <Block
              width={10}
              height={10}
              color="dodgerblue"
              marginRight={6}
              borderRadius={5}
            />
            <Text style={{fontSize: 12}}>Tiền đã thu</Text>
          </Block>
          <Block
            direction="row"
            alignItems="center"
            paddingHorizontal={8}
            paddingVertical={4}
            borderRadius={8}
            color="#fff5e6">
            <Block
              width={10}
              height={10}
              color="orange"
              marginRight={6}
              borderRadius={5}
            />
            <Text fontSize={12}>Tiền còn nợ</Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default AnimatedChartCard;
