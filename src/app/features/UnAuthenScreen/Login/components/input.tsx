import {HelperText, SvgIcon, Text, TextField} from '@components';

import {useTheme} from '@theme';
import {HookFormRules} from '@utils';

import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {useController, useFormContext} from 'react-hook-form';
import {TextInputProps, TouchableOpacity} from 'react-native';

import {FormLoginType} from './type';
import {SvgComponent, SvgIconTypes} from '@assets/svgIcon';

interface InputProps extends TextInputProps {
  name: keyof FormLoginType;
  label?: string;
  onSubmit?: () => void;
  nameTrigger?: keyof FormLoginType;
  rules?: HookFormRules;
  typeInput: 'flat' | 'outline';
  secureTextEntry: boolean;
  title: string;
  leftChild?: boolean;
  leftIcon?: SvgIconTypes;
}

const InputComponent = ({
  onSubmit,
  label,
  name,
  rules,
  nameTrigger,
  placeholder,
  defaultValue = '',
  typeInput,
  title,
  secureTextEntry,
  leftChild,
  leftIcon,
  ...rest
}: InputProps) => {
  // state
  const {trigger, getValues} = useFormContext<FormLoginType>();
  const [isPassword, setIsPassword] = React.useState<boolean>(true);
  const theme = useTheme();
  const {
    field,
    fieldState: {invalid, error},
  } = useController({
    name,
    rules,
    defaultValue,
  });
  // render
  return (
    <>
      <Text
        color={theme.colors.text}
        fontFamily="medium"
        style={{marginBottom: 8}}>
        {title}
      </Text>
      <TextField
        onSubmit={onSubmit}
        ref={field.ref}
        nameTrigger={nameTrigger}
        trigger={trigger}
        error={invalid}
        inputStyle={{
          color: invalid ? theme.colors.error : 'black',
          fontSize: 16,
 
          // lineHeight:26,
        }}
        label={label}
        value={field.value}
        name={name}
        placeholder={placeholder}
        placeHolderStyle={{paddingLeft:20}}
        placeholderColor={'#B2B2B2'}
        secureTextEntry={name === 'password' ? isPassword : false}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        defaultValue={getValues()[name]}
        leftChild={
          leftChild ? (
            <SvgIcon source={leftIcon ?? 'UserIcon'} size={20} />
          ) : undefined
        }
        rightChildren={
          name === 'password' ? (
            <TouchableOpacity
              onPress={() => {
                setIsPassword(!isPassword);
              }}>
              <SvgIcon
                source={isPassword ? 'EyeSecure' : 'EyeSlash'}
                color={invalid ? theme.colors.error : theme.colors.gray05}
              />
              {/* {isPassword ? (
                <SvgComponent.EyeSecure
                  width={20}
                  height={20}
                  color={invalid ? theme.colors.error : theme.colors.gray05}
                />
              ) : (
                <SvgComponent.EyeSlash
                  width={20}
                  height={20}
                  color={invalid ? theme.colors.error : theme.colors.gray05}
                />
              )} */}
            </TouchableOpacity>
          ) : null
        }
        typeInput={typeInput}
        {...rest}
      />

      <HelperText visible={invalid} msg={error?.message ?? ''} type={'error'} />
    </>
  );
};

export const Input = memo(InputComponent, isEqual);
