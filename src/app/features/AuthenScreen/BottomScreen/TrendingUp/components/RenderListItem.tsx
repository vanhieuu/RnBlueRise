import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Block, SvgIcon, Text, TouchableScale} from '@components';
import {AppTheme, useTheme} from '@theme';
import {createThemedStyles} from '@utils';
import {TargetCard} from './TargeCard';
import Modal from 'react-native-modal';
type Props = {
  data: any[];
};

const RenderItem = React.memo(
  ({
    item,
    theme,
    index,
    onEditPress,
    targets,
  }: {
    item: any;
    theme: AppTheme;
    index: number;
    onEditPress: (index: number, currentTarget: number) => void;
    targets: any[];
  }) => {
    const styles = listStyle(theme);
    // adjust length as needed
    const isPositive = item.percent >= 0;
    const target = targets[index] ?? 1;
    const percentColor = useMemo(
      () => (isPositive ? theme.colors.correctAnswer : theme.colors.redAlert),
      [],
    );
    return (
      <TouchableOpacity style={styles.containItem} activeOpacity={0.9}>
        <Block width={200}>
          <Block style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Block style={styles.valueRow}>
              <Text style={styles.value}>{item.value}</Text>
              <Text style={styles.percent} color={percentColor}>
                {isPositive ? '+' : ''}
                {item.percent}%
              </Text>
            </Block>
            <Text style={styles.subText}>
              Tháng trước: {item.previousValue}
            </Text>
          </Block>
        </Block>
        <Block block justifyContent="center" alignItems="center">
          <TargetCard
            value={item.value}
            index={index}
            target={target}
            size={50}
            strokeWidth={2}
            onEditPress={onEditPress}
          />
        </Block>
      </TouchableOpacity>
    );
  },
);
const initialTargets = [138, 20000, 950, 50, 180, 1800];

const RenderListItem = ({data}: Props) => {
  const theme = useTheme();
  const styles = listStyle(theme);
  const modalStyles = modalsStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [targets, setTargets] = useState<number[]>(
    data.map((_, i) => initialTargets[i] ?? 1),
  );

  const handleEditPress = (index: number, currentTarget: number) => {
    setEditingIndex(index);
    setInputValue(String(currentTarget));
    setModalVisible(true);
  };

  const handleSave = () => {
    const newTarget = parseFloat(inputValue) || 0;
    setTargets(prev => {
      const next = [...prev];
      next[editingIndex] = newTarget;
      return next;
    });
    setModalVisible(false);
  };
  return (
    <Block block colorTheme="body">
      {/* <TouchableOpacity style={styles.button}>
        <Block alignItems="flex-end">
          <Text fontSize={12} fontWeight="bold" colorTheme="white">
            Chỉnh sửa
          </Text>
        </Block>
      </TouchableOpacity> */}
      <FlashList
        data={data || []}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) =>
          item ? (
            <RenderItem
              item={item}
              index={index}
              theme={theme}
              targets={targets}
              onEditPress={handleEditPress}
            />
          ) : null
        }
      />
      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.5}
        style={{marginHorizontal: 0}}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}>
        <Block style={modalStyles.overlay}>
          <Block style={modalStyles.content}>
            <Block direction="row">
              <Block alignSelf="center" block paddingVertical={4} >
                <Text fontSize={16} textAlign="center" fontWeight="bold">
                  Sửa mục tiêu
                </Text>
              </Block>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <SvgIcon source="CloseIcon" size={30} />
              </TouchableOpacity>
            </Block>
            <Block colorTheme="body" padding={8} borderRadius={10}>
              <Text fontSize={12} fontWeight="bold">
                {data[editingIndex]?.title ?? ''}
              </Text>
              <Text fontSize={16} fontWeight="bold">
                {data[editingIndex]?.value ?? ''}
              </Text>
              <Text fontSize={11} fontWeight="400" colorTheme="gray00">
                Tháng trước: {data[editingIndex]?.previousValue ?? ''}
              </Text>
              <Block marginTop={20} marginBottom={20}>
                <Text fontSize={12} fontWeight="bold">
                  Mục tiêu hiện tại
                </Text>
                <Text fontSize={16} fontWeight="bold">
                  {/* {inputValue}
                   */}
                  {targets[editingIndex]}
                </Text>
              </Block>
              <Block
                direction="row"
                alignItems="center"
                justifyContent="space-between">
                <TextInput
                  style={modalStyles.input}
                  keyboardType="numeric"
                  
                  // value={inputValue}
                  onChangeText={setInputValue}
                  placeholder="Nhập mục tiêu mới"
                />
                <TouchableOpacity
                  style={modalStyles.buttonSave}
                  onPress={handleSave}>
                  <Text fontSize={12} colorTheme="white" fontWeight="400">
                    Cập nhật
                  </Text>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
        </Block>
      </Modal>
    </Block>
  );
};

export default RenderListItem;

const listStyle = (theme: AppTheme) =>
  createThemedStyles({
    button: {
      backgroundColor: theme.colors.primaryLight,
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      marginHorizontal: 16,
      padding: 4,
      alignItems: 'center',
      paddingHorizontal: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    card: {
      backgroundColor: theme.colors.body,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.black,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginHorizontal: 16,
      paddingHorizontal: 8,
      marginTop: 10,
      width: 200,
      paddingVertical: 10,
      marginVertical: 10,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textGrey,
      marginBottom: 8,
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    value: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.black,
    },
    percent: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    subText: {
      fontSize: 12,
      color: theme.colors.textGrey,
    },
    containItem: {
      borderRadius:10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 10,
      backgroundColor: theme.colors.bodyCard,
      marginVertical: 10,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.19,
      shadowRadius: 5.62,
      elevation: 6,
    },
  });
const modalsStyles = (theme: AppTheme) =>
  createThemedStyles({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      width: 380,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
    },
    label: {
      fontSize: 14,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 8,
      flex: 1,
      marginRight: 10,
      color:theme.colors.black
      // marginBottom: 16,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    buttonSave: {
      borderRadius: 2,
      // borderWidth: 1,
      paddingHorizontal: 8,
      paddingVertical: 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.greenProgress,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.19,
      shadowRadius: 5.62,
      elevation: 6,
    },
  });
