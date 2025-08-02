// styles-utils.ts
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

// Define a general style type
export type Style = ViewStyle | TextStyle | ImageStyle;

// A function that returns a style
export type NamedStyleFunction = (...args: any[]) => Style;

// A named style can be static or dynamic
export type NamedStyle = Style | NamedStyleFunction;

// The shape of all styles in an object
export type NamedStyles = Record<string, NamedStyle>;

// Factory function to create typed style objects
export function createThemedStyles<T extends NamedStyles>(styles: T): T {
  return styles;
}

// A safe function to extract styles (both static and dynamic)
export function getStyle<S extends NamedStyles, K extends keyof S>(
  styles: S,
  key: K,
  ...args: S[K] extends (...args: infer A) => any ? A : []
): S[K] extends (...args: any[]) => infer R ? R : S[K] {
  const style = styles[key];

  if (typeof style === 'function') {
    return (style as (...args: any[]) => Style)(...args) as any;
  }

  return style as any;
}
