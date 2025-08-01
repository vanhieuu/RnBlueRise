import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import LottieView from 'lottie-react-native';

import {useSelector} from '@common';
import json from '@assets/json';

const styles = StyleSheet.create({
  containLoading: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as ViewStyle,
  lottieView: {
    width: 100,
    height: 100,
    backgroundColor:'transparent'
  },
});

const LottieLoading = () => {
  const showLoadingScreen = useSelector(state => state.app.showLoadingScreen);

  if (!showLoadingScreen) return null;
  return (
    <View style={styles.containLoading}>
      <LottieView
        style={styles.lottieView}
        source={json.loadingApp}
        autoPlay
        loop
      />
    </View>
  );
};

export default React.memo(LottieLoading);
