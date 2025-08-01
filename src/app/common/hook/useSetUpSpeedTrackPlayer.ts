import {useCallback} from 'react';
import {useTrackPlayerSpeed} from './useSpeedTrackPlayer';

export const useSpeedSetup = () => {
  const {speed, updateSpeed} = useTrackPlayerSpeed();

  const increaseSpeed = useCallback(() => {
    let newSpeed = (speed || 1) + 0.25;
    if (newSpeed > 2.0) newSpeed = 1.0;
    updateSpeed(newSpeed);
  }, [speed, updateSpeed]);

  return {speed, increaseSpeed};
};
