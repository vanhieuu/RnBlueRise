import { Dimensions, StyleSheet } from "react-native";

export const Color = {
  backgroundColor: '#EDEEEE',
  backgroundColorMomo: '#ad076b',
  primaryColor: '#B0006D', // hồng buê đuê
  textColorHeader: '#222222', // Đen
  textColor: '#4D4D4D', // xám đậm
  secondTextColor: '#8F8E94', // xám nhạt
  thirdTextColor: '#C8C7CC', // xám nhạt hơn thằng trên
  textColorLink: '#77ade6',
  textColorBlue: '#4A90E2',
  textColorAqua: '#36bc99',
  textColorProcess: '#fd942f',
  borderBoxColor: '#DADADA', // đường kẻ, b
  colorMoneyMomo: '#B0006D',
  colorRed: '#F96268',
  colorOrange: '#FFB359',
  colorBlue: '#4a90e2',
  colorLightGrey: '#d3d3d3',
  backgroundColorGrey: '#d3d3d3',
};
export const {width, height} = Dimensions.get('screen');
const guidelineBaseWidth = 350;

const [shortDimension] = width < height ? [width, height] : [height, width];

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

export const enhance = <T>(arrStyle: Array<T>) => {
  return StyleSheet.flatten<T>(arrStyle);
};
export const sizeScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const propsToStyle = <T = any>(arrStyle: Array<T>) => {
  return arrStyle
    .filter(
      (x: any) =>
        x !== undefined && !Object.values(x).some(v => v === undefined),
    )
    .reduce((prev: any, curr: any) => {
      const firstKey = Object.keys(curr)[0];
      const firstValue = curr[firstKey];

      if (
        !['opacity', 'zIndex', 'flex'].includes(firstKey as never) &&
        typeof firstValue === 'number'
      ) {
        curr[firstKey as string] = sizeScale(firstValue);
      }
      return {...prev, ...curr};
    }, {});
};

export const URL_ICON= (icon:string)=> `https://openweathermap.org/img/wn/${icon}@2x.png`