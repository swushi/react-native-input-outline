import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import { InputOutline } from 'react-native-input-outline';

export default function App() {
  const inputRef = React.useRef(null);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const focus = () => {
    // @ts-ignore
    inputRef.current?.focus();
  };

  const blur = () => {
    // @ts-ignore
    inputRef.current?.blur();
  };

  const clearError = () => {
    setError(undefined);
  };

  return (
    <View style={styles.container}>
      <InputOutline ref={inputRef} error={error} onChangeText={setError} />
      <Button onPress={focus} title="Focus" />
      <Button onPress={blur} title="Blur" />
      <Button onPress={clearError} title="Clear Error" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
