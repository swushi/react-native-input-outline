import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
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
   * Font size for TextInput.
   * @default 14
   * @type number
   */
  fontSize?: number;
  /**
   * Vertical padding for TextInput Container. Used to calculate animations.
   * @default 12
   * @type number
   */
  paddingVertical?: number;
  /**
   * Vertical padding for TextInput Container.
   * @default 16
   * @type number
   */
  paddingHorizontal?: number;
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
  /**
   * Error message is displayed. If anything is provided to error besides null or undefined, then the component is
   * within an error state, thus displaying the error message provided here and errorColor.
   * @default undefined
   * @type string
   */
  error?: string;
  /**
   * Color that is displayed when in error state.
   * @default red
   * @type string
   */
  errorColor?: string;
}

export const InputOutline = forwardRef<InputOutlineMethods, InputOutlineProps>(
  (props, ref) => {
    // establish provided props
    const {
      placeholder = 'Placeholder',
      fontSize = 14,
      activeColor = 'blue',
      inactiveColor = 'black',
      paddingVertical = 12,
      paddingHorizontal = 16,
      errorColor = 'red',
      error,
      ...inputProps
    } = props;

    // animation vars
    const inputRef = useRef<TextInput>(null);
    const anim = useSharedValue(0);
    const colorMap = useSharedValue(0);

    // helper functinos
    const focus = () => inputRef.current?.focus();
    const blur = () => inputRef.current?.blur();
    const isFocused = () => inputRef.current?.isFocused;

    const handleFocus = () => {
      anim.value = withTiming(1); // focused
      colorMap.value = withTiming(1); // active
      focus();
    };

    const handleBlur = () => {
      anim.value = withTiming(0); // blur
      colorMap.value = withTiming(0); // inactive
      blur();
    };

    // error handling
    useEffect(() => {
      if (error) {
        colorMap.value = withTiming(2); // error
      } else {
        colorMap.value = withTiming(isFocused() ? 1 : 0); // to active or inactive color if focused
      }
    }, [error, colorMap]);

    const animatedPlaceholderStyles = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(
            anim.value,
            [0, 1],
            [0, -(paddingVertical + fontSize * 0.7)]
          ),
        },
        {
          scale: interpolate(anim.value, [0, 1], [1, 0.7]),
        },
        {
          translateX: interpolate(anim.value, [0, 1], [0, -paddingHorizontal]),
        },
      ],
      color: interpolateColor(
        colorMap.value,
        [0, 1, 2],
        [inactiveColor, activeColor, errorColor]
      ),
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
      borderColor: interpolateColor(
        colorMap.value,
        [0, 1, 2],
        [inactiveColor, activeColor, errorColor]
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
        paddingVertical,
        paddingHorizontal,
        justifyContent: 'center',
      },
      input: {
        fontSize,
      },
      placeholder: {
        position: 'absolute',
        top: paddingVertical,
        left: paddingHorizontal - 7,
        backgroundColor: '#fff',
        paddingHorizontal: 7,
        fontSize: fontSize,
      },
    });

    return (
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <TouchableWithoutFeedback onPress={handleFocus}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              pointerEvents="none"
              onFocus={handleFocus}
              onSubmitEditing={handleBlur}
              selectionColor={error ? errorColor : activeColor}
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
