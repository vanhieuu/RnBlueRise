import React from 'react';
import FastImage from "@d11/react-native-fast-image";
import {ImageProps} from './type';

import isEqual from 'react-fast-compare';
import { images } from '@assets/image';

const FastImgComponent = ({resizeMode = 'contain', source, style}: ImageProps) => {
  const isValidSource = (source: any) => {
    if (source?.uri && source?.uri.endsWith('.jpg')) {
      return true;
    }
    return false;
  };

  const validSource = isValidSource(source) ? source : undefined ;
  return (
    <FastImage
      style={{...style}}
      resizeMode={resizeMode}
      source={validSource}
    />
  );
};

export const FastImg = React.memo(FastImgComponent,isEqual);
