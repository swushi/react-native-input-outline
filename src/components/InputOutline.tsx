import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
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
  /**
   * Returns current focus of input.
   */
  isFocused: Boolean;
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
  /**
   * Trailing Icon for the TextInput.
   */
  trailingIcon?: React.FC;
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
      trailingIcon,
      error,
      onChangeText,
      ...inputProps
    } = props;
    // value
    const [value, setValue] = useState('');

    // animation vars
    const inputRef = useRef<TextInput>(null);
    const labelMap = useSharedValue(0);
    const colorMap = useSharedValue(0);

    // helper functinos
    const focus = () => inputRef.current?.focus();
    const blur = () => inputRef.current?.blur();
    const isFocused = () => Boolean(inputRef.current?.isFocused());

    const handleFocus = () => {
      labelMap.value = withTiming(1); // focused
      if (!error) colorMap.value = withTiming(1); // active
      focus();
    };

    const handleBlur = () => {
      if (!value) labelMap.value = withTiming(0); // blur
      if (!error) colorMap.value = withTiming(0); // inactive
      blur();
    };

    const handleChangeText = (text: string) => {
      onChangeText && onChangeText(text);
      setValue(text);
    };

    const renderTrailingIcon = useCallback(() => {
      if (trailingIcon) return trailingIcon({});
      return null;
    }, [trailingIcon]);

    // error handling
    useEffect(() => {
      if (error) {
        colorMap.value = 2; // error -- no animation here, snap to color immediately
      } else {
        colorMap.value = withTiming(isFocused() ? 1 : 0); // to active or inactive color if focused
      }
    }, [error, colorMap]);

    const animatedPlaceholderStyles = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(
            labelMap.value,
            [0, 1],
            [0, -(paddingVertical + fontSize * 0.7)]
          ),
        },
        {
          scale: interpolate(labelMap.value, [0, 1], [1, 0.7]),
        },
        {
          translateX: interpolate(
            labelMap.value,
            [0, 1],
            [0, -paddingHorizontal]
          ),
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
      isFocused: isFocused(),
    }));

    const styles = StyleSheet.create({
      container: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 12,
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingVertical,
        paddingHorizontal,
      },
      inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
      errorText: {
        color: errorColor,
        position: 'absolute',
        fontSize: 10,
        bottom: -15,
        left: paddingHorizontal,
      },
      trailingIcon: {
        position: 'absolute',
        right: paddingHorizontal,
        alignSelf: 'center',
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
              onChangeText={handleChangeText}
              selectionColor={error ? errorColor : activeColor}
              {...inputProps}
            />
          </View>
        </TouchableWithoutFeedback>
        {trailingIcon && (
          <View style={styles.trailingIcon}>{renderTrailingIcon()}</View>
        )}
        <Animated.Text style={[styles.placeholder, animatedPlaceholderStyles]}>
          {placeholder}
        </Animated.Text>
        <Animated.Text style={[styles.errorText]}>{error}</Animated.Text>
      </Animated.View>
    );
  }
);
