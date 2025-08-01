import React, {useState, useRef} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, TextStyle} from 'react-native';
import {Block} from '../Block';
import {width} from '@utils';
import {AppTheme, useTheme} from '@theme';

type Props = {
  text: string;
  maxLines: number;
};

const ExpandableText = ({text, maxLines}: Props) => {
  const [isTruncated, setIsTruncated] = useState(false); // Check if text is truncated
  const [showFullText, setShowFullText] = useState(false); // State to toggle between truncated and full text
  const [isMeasured, setIsMeasured] = useState(false); // Track if the text has been measured
  const theme = useTheme();
  const styles = rootStyles(theme);
  const textRef = useRef<Text>(null);

  // Function to handle layout calculation
  const handleTextLayout = (event: any) => {
    if (isMeasured) return; // Avoid measuring multiple times
    const {height} = event.nativeEvent.layout;
    textRef?.current?.measureLayout(textRef.current, (x, y, width, height) => {
      // Check if the height exceeds the maxLines' height
      const maxTextHeight = 18 * maxLines; // Assuming 18 is the line height for each line
      if (height > maxTextHeight) {
        setIsTruncated(true);
      }
      setIsMeasured(true);
    });
  };

  return (
    <Block maxWidth={width - 100}>
      <Text
        numberOfLines={showFullText ? undefined : maxLines}
        ellipsizeMode="tail"
        onLayout={handleTextLayout}
        ref={textRef}
        style={styles.text}>
        {text}
      </Text>

      {/* Show "Show more" or "Show less" based on state */}
      {isTruncated && (
        <TouchableOpacity
          onPress={() => setShowFullText(!showFullText)}
          style={styles.showMore}>
          <Text style={styles.showMoreText}>
            {showFullText ? 'Show less' : 'Show more'}
          </Text>
        </TouchableOpacity>
      )}
    </Block>
  );
};

const rootStyles = (theme: AppTheme) =>
  StyleSheet.create({
    text: {
      fontSize: 16,
      lineHeight: 18,
      color:theme.colors.text
    } as TextStyle,
    showMore: {
      marginTop: 5,
    },
    showMoreText: {
      color: theme.colors.action,
      fontSize: 14,
    },
  });

export const TruncateText = React.memo(ExpandableText);
