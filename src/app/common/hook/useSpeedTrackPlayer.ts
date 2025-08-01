import {useCallback, useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';

export const useTrackPlayerSpeed = () => {
  const [speed, setSpeed] = useState<number | undefined>(undefined);

  const getSpeed = useCallback(async () => {
    const currentSpeed = await TrackPlayer.getRate();
    setSpeed(currentSpeed);
  }, []);

  const updateSpeed = useCallback(async (newSpeed: number) => {
    if (newSpeed < 0 || newSpeed > 2) return;

    setSpeed(newSpeed);
    await TrackPlayer.setRate(newSpeed);
  }, []);

  useEffect(() => {
    getSpeed();
  }, [getSpeed]);

  return {speed, updateSpeed};
};
