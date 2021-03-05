import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputOutline } from 'react-native-input-outline';

export default function App() {
  const inputRef = React.useRef(null);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [value, setValue] = React.useState('');

  const focus = () => {
    // @ts-ignore
    inputRef.current?.focus();
  };

  const blur = () => {
    // @ts-ignore
    inputRef.current?.blur();
  };

  const causeError = () => {
    setError('Error Message');
  };

  const clearError = () => {
    setError(undefined);
  };

  const clear = () => {
    // @ts-ignore
    inputRef.current?.clear();
  };

  return (
    <View style={styles.container}>
      <InputOutline
        inactiveColor={'#fff'}
        ref={inputRef}
        error={error}
        onChangeText={setValue}
        value={value}
        trailingIcon={() => (
          <Ionicons name="close" color={'#000'} size={20} onPress={clear} />
        )}
      />
      <Button onPress={focus} title="Focus" />
      <Button onPress={blur} title="Blur" />
      <Button onPress={causeError} title="Cause Error" />
      <Button onPress={clearError} title="Clear Error" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginTop: 200,
    backgroundColor: 'black',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
