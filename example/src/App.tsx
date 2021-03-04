import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import { InputOutline } from 'react-native-input-outline';

export default function App() {
  const inputRef = React.useRef(null);
  return (
    <View style={styles.container}>
      <InputOutline ref={inputRef} />
      <Button onPress={() => inputRef.current?.focus()} title="Focus" />
      <Button onPress={() => inputRef.current?.blur()} title="Blur" />
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
