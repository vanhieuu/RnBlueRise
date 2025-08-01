import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import {SvgIcon} from '@components';
import {useTheme} from '@theme';

type buttonProps = {
  icon: any;
  size: number;
  
};

export const PlayButton = ({icon, size}: buttonProps) => {
  const {playing} = useIsPlaying();
  const theme = useTheme();
  return (
    <SvgIcon
      onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      color={theme.colors.text}
      source={icon}
      size={size}
    />
  );
};

const styles = StyleSheet.create({});
