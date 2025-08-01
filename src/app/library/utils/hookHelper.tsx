import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import { RegisterOptions } from 'react-hook-form';

export type HookFormRules = Exclude<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export const useGetNavigation = () => {
  type screenProps = NativeStackNavigationProp<any>;
  let route = useRoute();
  const navigation = useNavigation<screenProps>();
  return {
    navigation,
    route,
  };
};

// const store = configureStore().store;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;
