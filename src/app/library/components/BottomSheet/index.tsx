import React, {useCallback, useMemo} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { StyleSheet,  ViewStyle} from 'react-native';

import isEqual from 'react-fast-compare';
import {AppBottomSheetProps} from './type';
import {AppTheme, useTheme} from '@theme';
import {Block} from '../Block';
import {Portal} from '@components';

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
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  return (
    <Portal hostName={'Bottom-Sheet'}>
      <BottomSheet
        enableDynamicSizing={enableDynamicSizing}
        snapPoints={snapPointsCustom ?? snapPoints}
        onClose={onClose}
        ref={bottomSheetRef}
        containerHeight={contentHeight}
        onChange={onChange}
        onAnimate={onAnimated}
        handleIndicatorStyle={{
          backgroundColor: backgroundColor ?? colors.background,
        }}
        handleStyle={styles.handleStyle(backgroundColor)}
        backgroundComponent={hiddenBackdrop ? null : renderBackdrop}
        enablePanDownToClose={enablePanDownToClose ?? true}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={true}
        enableOverDrag={false}
        index={index}
        style={styles.shadowStyle}
        {...otherProps}>
        {useBottomSheetView ? (
          <BottomSheetView
            // scrollEnabled={scrollEnable}
            style={styles.bottomSheetStyle}>
            {children}
          </BottomSheetView>
        ) : (
          <Block block color={backgroundColor ?? colors.background}>
            {children}
          </Block>
        )}
      </BottomSheet>
    </Portal>
  );
};

export const AppBottomSheet = React.memo(AppBottomSheetComponent, isEqual);

const rootStyles = (theme: AppTheme) =>
  StyleSheet.create({
    shadowStyle: {
      backgroundColor: 'black',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      // backgroundColor:'red',
      elevation: 24,
      zIndex:999999
    },
    bottomSheetStyle: {
      backgroundColor: theme.colors.background,
      flex: 1,
    } as ViewStyle,
    handleStyle: (backgroundColor: any) =>
      ({
        // display: 'none',
        backgroundColor: backgroundColor ?? theme.colors.background,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // backgroundColor:'red'
      } as ViewStyle),
  });
