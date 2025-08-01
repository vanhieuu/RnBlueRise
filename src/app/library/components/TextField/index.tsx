/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {forwardRef} from 'react';


import {TextFieldProps} from './type';
import { InputFlat } from './flat';
import { InputOutline } from './outLine';
import { TextInput } from 'react-native';

const TextFieldComponent = forwardRef<TextInput, TextFieldProps>((props, refs) => {
  // state
  const {typeInput} = props;

  // render
  return typeInput === 'flat' ? (
    <InputFlat {...props} ref={refs} />
  ) : (
    <InputOutline {...props} ref={refs} />
  );
});
export const TextField = TextFieldComponent;
