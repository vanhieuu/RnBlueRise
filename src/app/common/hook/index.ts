import isEqual from 'react-fast-compare';
import {RootState} from 'src/app/storage/allReducer';
import {TypedUseSelectorHook, useSelector as useReduxSelector} from 'react-redux';
import {useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, Dimensions} from 'react-native';
import {onCheckType} from '../type';
import { checkApplicationPermission } from './useRequestPermission';

 const useAppSelector: TypedUseSelectorHook<RootState> = (selector, equalityFn = isEqual) => {
  return useReduxSelector<RootState, ReturnType<typeof selector>>(selector, equalityFn);
};
function useDisableBackHandler(disabled: boolean, callback?: () => void) {
  // function
  const onBackPress = useCallback(() => {
    if (onCheckType(callback, 'function')) {
      callback();
    }
    return true;
  }, [callback]);

  useEffect(() => {
    if (disabled) {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    } 
    return () =>
      BackHandler.addEventListener('hardwareBackPress', onBackPress).remove();
  }, [disabled, onBackPress]);
}
function useEffectOnce(cb: React.EffectCallback) {
  useEffect(cb, []);
}

const extractUrl = (html: string) => {
  const regex =
    /(?:youtube\.com\/(?:embed|shorts)\/|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const match = html.match(regex);
  return match ? match[1] : null;
};
const decodeHtml = (html: string): string => {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};

const extractIframeUrl = (iframeString: string): string | null => {
  // Decode any HTML entities in the iframe string
  const decodedString = decodeHtml(iframeString);

  // Regex to extract the src attribute from the iframe tag
  const regex = /<iframe.*?src="(.*?)".*?<\/iframe>/;
  const match = decodedString.match(regex);

  // If a match is found, return the extracted URL
  if (match && match[1]) {
    return match[1];
  }

  // Return null if no URL is found
  return null;
};

const extractYouTubeId = (data:string):string | undefined => {
  // Decode any HTML-encoded characters first
  const decodedData = decodeHtml(data);

  // Regex to extract YouTube video ID from the iframe
  const iframeRegex = /<iframe.*?src="https:\/\/www\.youtube\.com\/embed\/(.*?)\?.*?".*?><\/iframe>/;
  const match = decodedData.match(iframeRegex);

  if (match && match[1]) {
    return match[1]; // Return the YouTube video ID
  }

  return undefined; // No YouTube video ID found
};

function useOrientation() {
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
   
  }, []);

  return orientation;
}
const useDebounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function useDeepCompareEffect(
  callback: React.EffectCallback,
  dependencies: React.DependencyList | any,
) {
  const currentDependenciesRef = useRef(null);

  if (!isEqual(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, [currentDependenciesRef.current]);
}
export {
  useAppSelector as useSelector,
  useDeepCompareEffect,
  useEffectOnce,
  useDisableBackHandler,
  useOrientation,
  extractIframeUrl,
  extractUrl,
  extractYouTubeId,
  decodeHtml,
  useDebounce,
  checkApplicationPermission,

  
};
