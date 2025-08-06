import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ViewStyle,
  ImageSourcePropType,
  StyleProp,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

import {baseScreenLayoutStyles} from './styles';
import {LAYOUT} from '@utils';
import {ScreenErrorFallback} from './ScreenErrorFallBack';

interface BaseScreenLayoutProps {
  children: React.ReactNode;
  backgroundImage?: ImageSourcePropType;
  isFullScreenBackground?: boolean;
  backgroundColor?: string;
  contentStyle?: StyleProp<ViewStyle>;
  roundedContent?: boolean;
  lightStatusBar?: boolean;
  renderHeader?: () => React.ReactNode;
}

export const BaseScreenLayout: React.FC<BaseScreenLayoutProps> = React.memo(
  ({
    children,
    backgroundImage,
    isFullScreenBackground = false,
    backgroundColor = '#F4F4F4',
    contentStyle,
    roundedContent = true,
    lightStatusBar = true,
    renderHeader,
  }) => {
    const insets = useSafeAreaInsets();

    const renderContent = () => (
      <ErrorBoundary FallbackComponent={ScreenErrorFallback}>
        <View
          style={[
            baseScreenLayoutStyles.headerContainer,
            {paddingTop: insets.top},
          ]}>
          {renderHeader?.()}
        </View>

        <View
          style={[
            baseScreenLayoutStyles.content,
            roundedContent &&
              !isFullScreenBackground &&
              baseScreenLayoutStyles.roundedContent,
            contentStyle,
          ]}>
          {children}
        </View>
      </ErrorBoundary>
    );

    // If fullscreen background is requested
    if (isFullScreenBackground && backgroundImage) {
      return (
        <View style={baseScreenLayoutStyles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={lightStatusBar ? 'light-content' : 'dark-content'}
          />
          <ImageBackground
            source={backgroundImage}
            style={[
              baseScreenLayoutStyles.fullScreenBackground,
              {backgroundColor},
            ]}
            imageStyle={baseScreenLayoutStyles.backgroundImageStyle}>
            {renderContent()}
          </ImageBackground>
        </View>
      );
    }

    // Original layout with header-only background
    return (
      <View style={baseScreenLayoutStyles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={lightStatusBar ? 'light-content' : 'dark-content'}
        />

        {backgroundImage && (
          <ImageBackground
            source={backgroundImage}
            style={[
              baseScreenLayoutStyles.backgroundImage,
              backgroundColor && {backgroundColor},
              {height: LAYOUT.HEADER.HEIGHT + insets.top},
            ]}
            imageStyle={[
              baseScreenLayoutStyles.backgroundImageStyle,
              baseScreenLayoutStyles.roundedBackground,
            ]}
          />
        )}

        {renderContent()}
      </View>
    );
  },
);

BaseScreenLayout.displayName = 'BaseScreenLayout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  fullScreenBackground: {
    flex: 1,
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
  },
  roundedBackground: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerContainer: {
    position: 'relative',
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
  roundedContent: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
});
