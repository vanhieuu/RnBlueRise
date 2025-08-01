declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
interface CustomWindow extends Window {
  dropdownInitialized?: boolean;
  isExpanded?: boolean;
  toggleDropdown?: () => void;
  ReactNativeWebView?: { postMessage: (message: string) => void };
  addEventListener:any
}

declare const window: CustomWindow;