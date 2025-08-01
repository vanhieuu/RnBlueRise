import {Button, Text, View, StyleSheet} from 'react-native';
import Fonts from '../Fonts';

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 20,
    maxHeight: '70%',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  txtNormal: {
    height: 40,
    lineHeight: 40,
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  txtBold: {
    fontSize: Fonts.fontSize.h4,
    fontWeight: '700',
    // padding: 16,
  },
});
export default styles;
