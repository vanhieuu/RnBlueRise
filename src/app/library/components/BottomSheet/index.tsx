import React, {useCallback, useMemo} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import {StyleSheet, ViewStyle} from 'react-native';

import isEqual from 'react-fast-compare';
import {AppBottomSheetProps} from './type';
import {AppTheme, useTheme} from '@theme';
import {Block} from '../Block';
import {Portal} from '@components';
import {createThemedStyles} from '@utils';

const AppBottomSheetComponent = ({
  bottomSheetRef,
  snapPointsCustom,
  hiddenBackdrop,
  useBottomSheetView,
  enablePanDownToClose,
  onClose,
  children,
  contentHeight,
  backgroundColor,
  handleHeight,
  onChange,
  index = -1,
  onAnimated,
  scrollEnable = false,
  enableDynamicSizing = false,
  ...otherProps
}: AppBottomSheetProps) => {
  const snapPoints = useMemo(() => ['20%'], []);
  const {colors} = useTheme();
  const theme = useTheme();
  const styles = rootStyles(theme);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        enableTouchThrough={true}
      />
    ),
    [],
  );
  return (
    <BottomSheet
      enableDynamicSizing={enableDynamicSizing}
      snapPoints={snapPointsCustom ?? snapPoints}
      onClose={onClose}
      ref={bottomSheetRef}
      containerHeight={contentHeight}
      onChange={onChange}
      onAnimate={onAnimated}
      // containerStyle={{backgroundColor:'red'}}
      handleIndicatorStyle={{
        backgroundColor: backgroundColor ?? colors.background,
      }}
      handleStyle={styles.handleStyle(backgroundColor)}
      backdropComponent={hiddenBackdrop ? undefined : renderBackdrop}
      enablePanDownToClose={enablePanDownToClose ?? true}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={true}
      enableOverDrag={false}
      backgroundStyle={{
        backgroundColor: 'red',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
      index={index}
      style={styles.shadowStyle}
      {...otherProps}>
      {useBottomSheetView ? (
        <BottomSheetView style={styles.bottomSheetStyle}>
          {children}
        </BottomSheetView>
      ) : (
        <Block block color={backgroundColor ?? colors.background}>
          {children}
        </Block>
      )}
    </BottomSheet>
  );
};

export const AppBottomSheet = React.memo(AppBottomSheetComponent, isEqual);

const rootStyles = (theme: AppTheme) =>
  createThemedStyles({
    shadowStyle: {
      // backgroundColor: 'black',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      // backgroundColor:'red',
      elevation: 24,
      zIndex: 999999,
    },
    bottomSheetStyle: {
      backgroundColor: theme.colors.background,
      flex: 1,
    } as ViewStyle,
    handleStyle: (backgroundColor: any) =>
      ({
        // display: 'none',
        backgroundColor: theme.colors.white,

        // backgroundColor:'red',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      } as ViewStyle),
  });
