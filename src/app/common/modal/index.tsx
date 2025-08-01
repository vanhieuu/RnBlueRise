import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {Block, SvgIcon, Text,FastImg} from '@components';
import {modalPostCastContainer} from '@container';
import {URL_PREFIX} from '@config/api';

import {useTheme} from '@theme';
import TrackPlayer, {
  useIsPlaying,
  useProgress,
} from 'react-native-track-player';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {APP_SCREEN, AuthenParamList} from '@navigation/screen-type';
import {PlayButton} from '../trackControl/index';
import {MovingText} from './components/RunningText';
import {width} from '@utils';
import isEqual from 'react-fast-compare';

interface PodCastModalType {
  onPressModal?: () => void;
  isDefault?: boolean;
}
const PodCastModal = ({onPressModal, isDefault = true}: PodCastModalType) => {
  const {modalVisible, detailPostCast, progress, closeModal, formatTime} =
    modalPostCastContainer();
  const {playing} = useIsPlaying();
  const {duration, position} = useProgress(1000);
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<AuthenParamList>>();
  const togglecloseModal = useCallback(async () => {
    
    await TrackPlayer.stop();
   await closeModal();
   console.log(modalVisible,'modalVisible')
  }, []);
  const elapsedTime = formatTime(position);
  const remainingTime = formatTime(duration);
  const onPress = useCallback(() => {
   
    if (isDefault) {
      navigation.navigate(APP_SCREEN.DETAIL_POST_CARD);
    }else{
      onPressModal!()
    }
    closeModal()
  }, []);




  return (
    // <Modal
    //   isVisible={modalVisible}
    //   onBackdropPress={closeModal}
    //   backdropOpacity={0}
    //   style={styles.modalTab as ViewStyle}
    //   coverScreen={false}
    //   animationIn="slideInUp"
    //   animationOut="slideOutDown"
    //   hasBackdrop={false}
    //   >
    <Block style={{width: '100%', padding: 2}} colorTheme="background">
      <Block
        borderColor={theme.colors.text}
        pointerEvents="box-none"
        colorTheme="background"
        alignItems="center"
        height={50}
        position="relative"
        // bottom={50}
        borderWidth={0.5}
        borderRadius={10}
        marginBottom={0}
        marginHorizontal={10}
        direction="row"
        style={{
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 1,
        }}
        paddingHorizontal={10}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <FastImg
            source={{uri: `${URL_PREFIX}/file/${detailPostCast?.avatar}`}}
            style={{height: 40, width: 40, borderRadius: 10, marginRight: 10}}
          />
          <Block justifyContent="center" flex={1}>
            {/* <MovingText
              text={detailPostCast?.title}
              animationThreshold={25}
              
              styleBody={{overflow: 'hidden', with: '100%'}}
            /> */}
             <Text
                fontWeight="bold"
                lineHeight={20}
                fontSize={12}
                numberOfLines={1}
                colorTheme="text">
                {detailPostCast?.title}
              </Text>
            <Block height={5} />
            <Block direction="row">
              <Text
                fontWeight="bold"
                lineHeight={20}
                fontSize={12}
                numberOfLines={1}
                colorTheme="text">
                {elapsedTime} / {remainingTime}
              </Text>
              <Text
                lineHeight={20}
                fontSize={10}
                colorTheme="text"
                style={{marginHorizontal: 10}}>
                |
              </Text>
              <Text
                fontWeight="bold"
                lineHeight={20}
                fontSize={12}
                numberOfLines={1}
                colorTheme="text">
                Tin hôm nay
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
        <PlayButton size={25} icon={playing ? 'IconStop' : 'ButtonPlay'} />
        <SvgIcon
          onPress={togglecloseModal}
          source="IconClose"
          size={25}
          color={theme.colors.text}
        />
      </Block>
    </Block>
    // </Modal>
  );
};

export const ModalPostCast = memo(PodCastModal,isEqual);

const styles = StyleSheet.create({
  modalTab: {
    justifyContent: 'flex-end',
    margin: 10,
    position: 'relative',
  } as ViewStyle,
});
