import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export interface SearchBarProps {
  defaultText: string;
  placeholder: string;
  onSubmitText: (text: string) => void;
  onChangeText: (text: string) => void;
  onPressBack: () => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}
