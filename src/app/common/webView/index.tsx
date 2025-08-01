import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const PlayVideo = () => {
  return (
    <WebView
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      scalesPageToFit={false}
      ignoreSsError
      originWhitelist={['file://']}
      style={{
        backgroundColor: 'transparent',
        justifyContent: 'center',
      }}
      source={{
        uri: `https://baolamdong.vn/video/202409/phu-nu-lam-dong-khoi-nghiep-c852386/`,
      }}
    />
  );
};

export default PlayVideo;

const styles = StyleSheet.create({});
