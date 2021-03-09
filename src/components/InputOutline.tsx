import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  Text,
  // @ts-ignore
  LogBox,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
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
  /**
   * Removes all text from the TextInput.
   */
  clear: () => void;
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
   * Color of TextInput font.
   * @default 'black'
   * @type string
   */
  fontColor?: string;
  /**
   * Font family for all fonts.
   * @default undefined
   * @type string
   */
  fontFamily?: string;
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
   * @default 'blue'
   * @type string
   */
  activeColor?: string;
  /**
   * Color when blurred (not focused).
   * @default 'grey'
   * @type string
   */
  inactiveColor?: string;
  /**
   * Background color of the InputOutline.
   * @default 'white'
   * @type string
   */
  backgroundColor?: string;
  /**
   * Error message is displayed. If anything is provided to error besides null or undefined, then the component is
   * within an error state, thus displaying the error message provided here and errorColor.
   * @default undefined
   * @type string
   */
  error?: string;
  /**
   * Color that is displayed when in error state.
   * @default 'red'
   * @type string
   */
  errorColor?: string;
  /**
   * Trailing Icon for the TextInput.
   * @default none
   * @type React.FC
   */
  trailingIcon?: React.FC;
  /**
   * Border radius applied to container.
   * @default 5
   * @type number
   */
  roundness?: number;
  /**
   * Will show a character count helper text and limit the characters being entered.
   * @default undefined
   * @type number
   */
  characterCount?: number;
  /**
   * Helper text that can be displayed to assist users with Inputs. `error` prop will override this.
   * @default undefined
   * @type string
   */
  assistiveText?: string;
}

type InputOutline = InputOutlineMethods;

const InputOutlineComponent = forwardRef<InputOutline, InputOutlineProps>(
  (props, ref) => {
    // establish provided props
    const {
      placeholder = 'Placeholder',
      fontSize = 14,
      fontColor = 'black',
      activeColor = 'blue',
      inactiveColor = 'grey',
      paddingVertical = 12,
      paddingHorizontal = 16,
      errorColor = 'red',
      backgroundColor = 'white',
      roundness = 5,
      characterCount,
      trailingIcon,
      assistiveText,
      fontFamily,
      error,
      style,
      onChangeText,
      ...inputProps
    } = props;
    // value of input
    const [value, setValue] = useState('');

    // animation vars
    const inputRef = useRef<TextInput>(null);
    const placeholderMap = useSharedValue(0);
    const placeholderSize = useSharedValue(0);
    const colorMap = useSharedValue(0);

    // helper functinos
    const focus = () => inputRef.current?.focus();
    const blur = () => inputRef.current?.blur();
    const isFocused = () => Boolean(inputRef.current?.isFocused());
    const clear = () => {
      Boolean(inputRef.current?.clear());
      setValue('');
    };

    const handleFocus = () => {
      placeholderMap.value = withTiming(1); // focused
      if (!error) colorMap.value = withTiming(1); // active
      focus();
    };

    const handleBlur = () => {
      if (!value) placeholderMap.value = withTiming(0); // blur
      if (!error) colorMap.value = withTiming(0); // inactive
      blur();
    };

    const handleChangeText = (text: string) => {
      onChangeText && onChangeText(text);
      setValue(text);
    };

    const handlePlaceholderLayout = useCallback(
      ({ nativeEvent }) => {
        const { width } = nativeEvent.layout;
        placeholderSize.value = width;
      },
      [placeholderSize]
    );

    const renderTrailingIcon = useCallback(() => {
      if (trailingIcon) return trailingIcon({});
      return null;
    }, [trailingIcon]);

    // error handling
    useEffect(() => {
      if (error) {
        colorMap.value = 2; // error -- no animation here, snap to color immediately
      } else {
        colorMap.value = isFocused() ? 1 : 0; // to active or inactive color if focused
      }
    }, [error, colorMap]);

    const animatedPlaceholderStyles = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: interpolate(
            placeholderMap.value,
            [0, 1],
            [0, -(paddingVertical + fontSize * 0.7)]
          ),
        },
        {
          scale: interpolate(placeholderMap.value, [0, 1], [1, 0.7]),
        },
        {
          translateX: interpolate(
            placeholderMap.value,
            [0, 1],
            [0, -placeholderSize.value * 0.2]
          ),
        },
      ],
    }));

    const animatedPlaceholderTextStyles = useAnimatedStyle(() => ({
      color: interpolateColor(
        colorMap.value,
        [0, 1, 2],
        [inactiveColor, activeColor, errorColor]
      ),
    }));

    const animatedPlaceholderSpacerStyles = useAnimatedStyle(() => ({
      width: interpolate(
        placeholderMap.value,
        [0, 1],
        [0, placeholderSize.value * 0.7 + 7],
        Extrapolate.CLAMP
      ),
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
      borderColor:
        placeholderSize.value > 0
          ? interpolateColor(
              colorMap.value,
              [0, 1, 2],
              [inactiveColor, activeColor, errorColor]
            )
          : inactiveColor,
    }));

    useImperativeHandle(ref, () => ({
      focus: handleFocus,
      blur: handleBlur,
      isFocused: isFocused(),
      clear: clear,
    }));

    const styles = StyleSheet.create({
      container: {
        borderWidth: 1,
        borderRadius: roundness,
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingVertical,
        paddingHorizontal,
        backgroundColor,
      },
      inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      input: {
        fontSize,
        fontFamily,
        color: fontColor,
      },
      placeholder: {
        position: 'absolute',
        top: paddingVertical,
        left: paddingHorizontal,
      },
      placeholderText: {
        fontSize,
        fontFamily,
      },
      placeholderSpacer: {
        position: 'absolute',
        top: -1,
        left: paddingHorizontal - 3,
        backgroundColor,
        height: 1,
      },
      errorText: {
        position: 'absolute',
        color: errorColor,
        fontSize: 10,
        bottom: -15,
        left: paddingHorizontal,
        fontFamily,
      },
      trailingIcon: {
        position: 'absolute',
        right: paddingHorizontal,
        alignSelf: 'center',
      },
      counterText: {
        position: 'absolute',
        color: error ? errorColor : inactiveColor,
        fontSize: 10,
        bottom: -15,
        right: paddingHorizontal,
        fontFamily,
      },
      assistiveText: {
        position: 'absolute',
        color: inactiveColor,
        fontSize: 10,
        bottom: -15,
        left: paddingHorizontal,
        fontFamily,
      },
    });

    const placeholderStyle = useMemo(() => {
      return [styles.placeholder, animatedPlaceholderStyles];
    }, [styles.placeholder, animatedPlaceholderStyles]);

    return (
      <Animated.View style={[styles.container, animatedContainerStyle, style]}>
        <TouchableWithoutFeedback onPress={handleFocus}>
          <View style={styles.inputContainer}>
            <TextInput
              {...inputProps}
              ref={inputRef}
              style={styles.input}
              pointerEvents="none"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={handleChangeText}
              maxLength={characterCount ? characterCount : undefined}
              selectionColor={error ? errorColor : activeColor}
              placeholder=""
            />
          </View>
        </TouchableWithoutFeedback>
        {trailingIcon && (
          <View style={styles.trailingIcon}>{renderTrailingIcon()}</View>
        )}
        <Animated.View
          style={[styles.placeholderSpacer, animatedPlaceholderSpacerStyles]}
        />
        <Animated.View
          style={placeholderStyle}
          onLayout={handlePlaceholderLayout}
          pointerEvents="none"
        >
          <Animated.Text
            style={[styles.placeholderText, animatedPlaceholderTextStyles]}
          >
            {placeholder}
          </Animated.Text>
        </Animated.View>
        {characterCount && (
          <Text
            style={styles.counterText}
          >{`${value.length} / ${characterCount}`}</Text>
        )}
        {error ? (
          <Text style={[styles.errorText]}>{error}</Text>
        ) : (
          assistiveText && (
            <Text style={[styles.assistiveText]}>{assistiveText}</Text>
          )
        )}
      </Animated.View>
    );
  }
);

const InputOutline = InputOutlineComponent;
export { InputOutline };

// color issue
LogBox.ignoreLogs(['You are setting the style `{ color: ... }` as a prop.']);
