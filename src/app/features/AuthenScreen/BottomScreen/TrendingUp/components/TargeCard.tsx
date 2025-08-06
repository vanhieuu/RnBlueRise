import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Block, Text} from '@components';
import {createThemedStyles} from '@utils';
import Svg, {Circle, G} from 'react-native-svg';
import {useTheme} from '@theme';

interface TargetCardProps {
  target:number
  size?: number;
  value:number;
  strokeWidth?: number;
  onEditPress: (index:number,target:number) => void;
  index:number
}

export const TargetCard: React.FC<TargetCardProps> = ({
  target,
  value,
  size = 80,
  strokeWidth = 8,
  onEditPress,
  index
}) => {
  const theme = useTheme();
  // determine color: <50 red, <100 orange, >=100 success
  const percent = Math.round((value/target)*100)
  const activeColor =
    percent >= 100
      ? theme.colors.greenProgress
      : percent < 50
      ? theme.colors.redAlert
      : '#FF8C00';

  const radius = (size - strokeWidth) / 2;
  const fillRadius = radius * (percent / 100);
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent / 100);
  const center = size / 2;

  return (
    <Block style={styles.card}>
      <Text style={styles.title}>Mục tiêu</Text>
      <Block style={{width: size, height: size, marginVertical: 8}}>
        <Svg width={size} height={size}>
          <G transform={`rotate(-90 ${center} ${center})`}>
            <Circle cx={center} cy={center} r={fillRadius} fill={activeColor} />
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={styles.ringColor}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={activeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              fill="none"
            />
          </G>
        </Svg>
        <Block style={styles.percentOverlay}>
          <Text style={[styles.percentText, {backgroundColor: activeColor}]}>
            {percent}%
          </Text>
        </Block>
      </Block>
      <TouchableOpacity onPress={() => onEditPress(index,target)}>
        <Text style={[styles.editText, {color: activeColor}]}>
          Sửa mục tiêu
        </Text>
      </TouchableOpacity>
    </Block>
  );
};

const styles = createThemedStyles({
  card: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    // alignSelf: 'flex-start',
    fontSize: 14,
    color: '#333',
  },
  ringColor: '#e7e7e7' as any,
  percentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentText: {
    paddingHorizontal: 4,
    borderRadius: 4,
    overflow: 'hidden',
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  editText: {
    fontSize: 12,
    marginTop: 4,
  },
});
