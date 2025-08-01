import {useEffect, useRef} from 'react';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RatingType,
  RepeatMode,
} from 'react-native-track-player';

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });

  await TrackPlayer.updateOptions({
    // ratingType: RatingType.Heart,
    android: {
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });

  await TrackPlayer.setVolume(0.5);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export const useSetUpTrackPlayer = ({onLoad}: {onLoad?: () => void}) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    setupPlayer()
      .then(() => {
        isInitialized.current = true;
        onLoad?.();
      })
      .catch(error => {
        isInitialized.current = false;
        console.error(error);
      });
  }, [onLoad]);
};
