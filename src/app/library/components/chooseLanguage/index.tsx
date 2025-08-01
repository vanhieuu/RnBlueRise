import React from 'react';
import {Image, Text, View, TouchableOpacity, FlatList, ViewStyle, TextStyle} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {supportLanguages} from './support';
import { useTheme } from '@theme';


type ChooseLanguage = {
  isModalVisible: boolean;
  onClose: () => void;
};
const ChooseLanguageModal = ({isModalVisible, onClose}: ChooseLanguage) => {
  const {colors} = useTheme()
  return (
    <Modal
      isVisible={isModalVisible}
      testID={'modal'}
      backdropColor={colors.backgroundModal}
      backdropOpacity={0.8}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      {ContentView(onClose)}
    </Modal>
  );
};

type ContentView = {
  onClose: () => void;
};

const ContentView = (onClose: () => void) => {
  const {t, i18n} = useTranslation('setting');
 

  return (
    <View style={styles.content as ViewStyle}>
      <Text style={styles.txtBold as TextStyle}>{t('label.change_language')}</Text>

      <ScrollView style={{width: '100%', paddingBottom: 10, paddingTop: 10}}>
        <FlatList
          style={{flex: 1, width: '100%'}}
          nestedScrollEnabled={false}
          numColumns={1}
          scrollEnabled={false}
          data={supportLanguages()}
          renderItem={item =>
            renderItem(item?.item, i18n.language, () => {
              onClose();
              setTimeout(() => {
                if (item?.item.lang === 'vi') {
                  i18n.changeLanguage('vi');
                }
                if (item?.item.lang === 'en') {
                  i18n.changeLanguage('en');
                }
                if (item?.item.lang === 'cn') {
                  i18n.changeLanguage('cn');
                }
                if (item?.item.lang === 'th') {
                  i18n.changeLanguage('th');
                }
              }, 1000);
            })
          }
        />
      </ScrollView>
    </View>
  );
};
const renderItem = (item: any, langCode: any, onSelectIem: () => void) => {
  let source =
    langCode === item.lang
      ? ''
      : '';

  return (
    <TouchableOpacity onPress={() => onSelectIem()}>
      <View
        style={{
          width: '80%',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginRight: 10,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: 'gray',
          }}
          source={{uri:''}}
        />
        <Text style={styles.txtNormal as TextStyle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChooseLanguageModal;
