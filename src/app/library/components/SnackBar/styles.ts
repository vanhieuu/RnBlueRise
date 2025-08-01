import {StyleSheet} from 'react-native';

import {BG_SUCCESS} from './constants';
import { Color } from '@utils';

export const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    paddingHorizontal: 15,

    
  },
  itemBar: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    marginHorizontal: 50,
    alignItems: 'center',
    flexDirection: 'row',
    // borderLeftWidth: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    // shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderWidth:1,
    borderColor:'#979797',

  },
  text: {
    flex: 1,
    // color:Color.textColor
  },
});
