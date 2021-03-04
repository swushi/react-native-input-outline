import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export interface InputOutlineProps {}

export const InputOutline = () => {
  return (
    <View style={styles.container}>
      <Text>Text Input</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'grey',
  },
});
