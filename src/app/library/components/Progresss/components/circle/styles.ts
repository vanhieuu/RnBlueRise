import {Platform, StyleSheet, TextStyle, ViewStyle} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textProgress: {
    ...Platform.select({
      ios:{
        overflow:'hidden',
        // backgroundColor:'red',
        // top:-10
      }
    }),
    // position: 'absolute',
    fontSize:16,
    color:'#282828',
    alignSelf:'center',
    // backgroundColor:'transparent',
    // zIndex:9999,
    // bottom:10,
    // top:0,
    // left:10,
    // right:10,
    textAlign:'center',
    textAlignVertical:'center',
    fontWeight:'bold'
    
  } as TextStyle,
  unitProgress: {
    // position: 'absolute',
    fontSize:14,
    color:'#282828',
    alignSelf:'center',
    backgroundColor:'transparent',

  
    textAlign:'center',
    textAlignVertical:'bottom'
    
  } as TextStyle,
  wrapCircle: {
    transform: [{rotate: '-90deg'}],
    // backgroundColor:
  } as ViewStyle,
});
