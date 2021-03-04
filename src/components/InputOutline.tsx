import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';

export interface InputOutlineMethods {
  /**
   * Requests focus for the given input or view. The exact behavior triggered will depend on the platform and type of view.
   */
  focus: () => void;
  /**
   * Removes focus from an input or view. This is the opposite of focus()
   */
  blur: () => void;
}

export interface InputOutlineProps extends TextInputProps {
  /**
   * Placeholder for the textinput.
   * @default Placeholder
   * @type string
   */
  placeholder?: string;
  /**
   * Placeholder font size.
   * @default 14
   * @type number
   */
  placeholderFontSize?: number;
  /**
   * Color when focused.
   * @default blue
   * @type string
   */
  activeColor?: string;
  /**
   * Color when blurred (not focused).
   * @default black
   * @type string
   */
  inactiveColor?: string;
}

export const InputOutline = forwardRef<InputOutlineMethods, InputOutlineProps>(
  (props, ref) => {
    // establish provided props
    const {
      placeholder = 'Placeholder',
      placeholderFontSize = 14,
      activeColor = 'blue',
      inactiveColor = 'black',
      ...inputProps
    } = props;

    // animation vars
    const inputRef = useRef<TextInput>(null);
    const textTranslation = useSharedValue(0);

    const handleFocus = () => {
      textTranslation.value = withTiming(-20);
      inputRef.current?.focus();
    };

    const handleBlur = () => {
      textTranslation.value = withTiming(0);
      inputRef.current?.blur();
    };

    const animatedPlaceholderStyles = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: textTranslation.value,
        },
        {
          scale: interpolate(textTranslation.value, [0, -20], [1, 0.85]),
        },
      ],
      color: interpolateColor(
        textTranslation.value,
        [0, -20],
        [inactiveColor, activeColor]
      ),
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
      borderColor: interpolateColor(
        textTranslation.value,
        [0, -20],
        [inactiveColor, activeColor]
      ),
    }));

    useImperativeHandle(ref, () => ({
      focus: handleFocus,
      blur: handleBlur,
    }));

    const styles = StyleSheet.create({
      container: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 12,
        alignSelf: 'stretch',
        flexDirection: 'row',
      },
      inputContainer: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'center',
      },
      placeholder: {
        position: 'absolute',
        top: 12,
        left: 6,
        backgroundColor: '#fff',
        paddingHorizontal: 7,
        fontSize: placeholderFontSize,
      },
    });

    return (
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <TouchableWithoutFeedback onPress={handleFocus}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              pointerEvents="none"
              onFocus={handleFocus}
              onSubmitEditing={handleBlur}
              {...inputProps}
            />
          </View>
        </TouchableWithoutFeedback>
        <Animated.Text style={[styles.placeholder, animatedPlaceholderStyles]}>
          {placeholder}
        </Animated.Text>
      </Animated.View>
    );
  }
);
