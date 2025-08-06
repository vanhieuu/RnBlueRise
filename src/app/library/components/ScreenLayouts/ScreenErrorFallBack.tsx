import {createThemedStyles, LAYOUT} from '@utils';
import React from 'react';
import {} from 'react-native';
import {Block} from '../Block';
import {Text} from '../Text';
import {TouchableScale} from '../touch-scale';

interface ScreenErrorFallbackProps {
  error: Error;
  resetError: () => void;
}
export const ScreenErrorFallback: React.FC<ScreenErrorFallbackProps> = ({
  error,
  resetError,
}) => {
  return (
    <Block style={styles.container}>
      <Text style={styles.text}>Đã có lỗi xảy ra khi tải màn hình:</Text>
      <Text style={styles.text}>{error.message}</Text>
      <TouchableScale onPress={resetError}>
        <Text>Thử lại</Text>
      </TouchableScale>
    </Block>
  );
};


const styles = createThemedStyles({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: LAYOUT.SPACING.lg,
  },
  text: {
    marginBottom: LAYOUT.SPACING.md,
    textAlign: 'center',
  },
});
