import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { InputOutline } from 'react-native-input-outline';

export default function App() {
  return (
    <View style={styles.container}>
      <InputOutline />
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
