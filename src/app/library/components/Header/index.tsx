import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import isEqual from 'react-fast-compare';
import {HeaderComponentType} from './type';
import {Block} from '../Block';
import {Text} from '../Text';
import {createThemedStyles} from '@utils';
import {AppTheme, useTheme} from '@theme';
import FastImage from '@d11/react-native-fast-image';
import {SvgIcon} from '../svg-icon';
import {images} from '@assets/image';

const HeaderComponent = ({
  imageUrl,
  nameOfEducationCenter,
  userName,
  setShow,
  backgroundColor,
  showImageBackground = true,
}: HeaderComponentType) => {
  const theme = useTheme();
  const styles = rootStyles(theme);
  return (
    <ImageBackground source={showImageBackground ? images.bgFull : undefined}>
      <Block
        direction="row"
        paddingVertical={10}
        color={backgroundColor ?? theme.colors.transparent}>
        <TouchableOpacity
          style={styles.buttonImage}
          onPress={() => setShow(true)}>
          <Block style={styles.containImage}>
            {imageUrl.trim().length > 0 ? (
              <FastImage source={{uri: imageUrl || ''}} style={styles.images} />
            ) : (
              <SvgIcon source="UserIcon" size={40} style={styles.images} />
            )}
          </Block>
          <Block style={styles.containCamera}>
            <SvgIcon source="CameraIcon" size={20} />
          </Block>
        </TouchableOpacity>
        <Block justifyContent="center" paddingLeft={12}>
          <Block>
            <Text
              fontSize={16}
              color="white"
              fontWeight="700"
              fontFamily="bold">
              {userName}
            </Text>
          </Block>
          <Text fontSize={12} color={theme.colors.grayscale02} fontWeight="700">
            {nameOfEducationCenter}
          </Text>
        </Block>
      </Block>
    </ImageBackground>
  );
};

export const Header = React.memo(HeaderComponent, isEqual);

const rootStyles = (theme: AppTheme) =>
  createThemedStyles({
    containImage: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      width: 80,
      height: 80,
    },
    buttonImage: {
      marginLeft: 16,
      justifyContent: 'center',
    },
    images: {
      width: '100%',
      height: '100%',
      borderRadius: 46,
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containCamera: {
      width: 24,
      height: 24,
      top: 55,
      left: 60,
      position: 'absolute',
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.grayscale02,
      borderRadius: 20,
    },
  });
