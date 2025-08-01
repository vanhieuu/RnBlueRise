import {ReactElement} from 'react';
import {SharedValue} from 'react-native-reanimated';

export type AppBottomSheetProps = {
  /* ref */
  bottomSheetRef: any;

  snapPointsCustom?: any;
  hiddenBackdrop?: boolean;
  enablePanDownToClose?: boolean;
  useBottomSheetView?: boolean;
  onClose?: () => void;
  footer?: boolean;
  children?: ReactElement | ReactElement[];
  backgroundColor?: any;
  onChange?: (index: number) => void;
  contentHeight?: number | SharedValue<number>;
  handleHeight?: number | SharedValue<number>;
  index?: number;
  onAnimated?: (fromIndex?: number, toIndex?: number) => void;
  enableDynamicSizing?: boolean;
  scrollEnable?:boolean
};
