import React from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';

// Constants
const SIZE = 7;
const MARGIN = 5;
const BG = 'rgb(172, 172, 172)';
const ACTIVE_BG = '#fff';
const dots = [1, 2, 3];
const INTERVAL = 300;
const ANIMATION_DURATION = 400;
const ANIMATION_SCALE = 1.4;

// Define types for props and state
interface ThreeDotsLoaderProps {
  active: number;
  interval?: any;
}

interface ThreeDotsLoaderState {
  active: number;
}

export default class ThreeDotsLoader extends React.Component<ThreeDotsLoaderProps, ThreeDotsLoaderState> {
  interval: NodeJS.Timeout | undefined; // Define the interval type

  constructor(props: ThreeDotsLoaderProps) {
    super(props);
    this.state = {
      active: 1,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const active = this.state.active;
      this.setState({ active: active > 2 ? 1 : active + 1 });
    }, INTERVAL);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const active = this.state.active;
    return (
      <View style={styles.main as ViewStyle}>
        {dots.map((i) => (
          <Dot key={i} {...this.props} active={i === active} />
        ))}
      </View>
    );
  }
}

interface DotProps {
  active: boolean;
  size: number;
  background?: string;
  activeBackground?: string;
  dotMargin: number;
  animationDuration: number;
  animationScale: number;
}

class Dot extends React.Component<DotProps> {
  static defaultProps = {
    size: SIZE,
    background: BG,
    activeBackground: ACTIVE_BG,
    dotMargin: MARGIN,
    animationDuration: ANIMATION_DURATION,
    animationScale: ANIMATION_SCALE,
  };

  scale: Animated.Value;

  constructor(props: DotProps) {
    super(props);
    this.scale = new Animated.Value(1);
  }

  componentDidMount() {
    if (this.props.active) {
      this.scaleUp();
    }
  }

  componentDidUpdate(prevProps: DotProps) {
    if (prevProps.active && !this.props.active) {
      this.scaleDown();
    }
    if (!prevProps.active && this.props.active) {
      this.scaleUp();
    }
  }

  scaleDown = () => {
    Animated.timing(this.scale, {
      toValue: 1,
      duration: this.props.animationDuration,
      useNativeDriver: true, // Add useNativeDriver for better performance
    }).start();
  };

  scaleUp = () => {
    Animated.timing(this.scale, {
      toValue: this.props.animationScale!,
      duration: this.props.animationDuration,
      useNativeDriver: true, // Add useNativeDriver for better performance
    }).start();
  };

  render() {
    const { active, size, background, activeBackground, dotMargin } = this.props;
    const style = {
      height: size,
      width: size,
      borderRadius: size / 2,
      marginHorizontal: dotMargin,
      backgroundColor: active ? activeBackground : background,
    };
    return (
      <Animated.View style={[style, { transform: [{ scale: this.scale }] }]} />
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
