import * as React from 'react';
import { StyleSheet, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { InputOutline } from 'react-native-input-outline';
// import Showcase from './Showcase';
import StandardShowcase from './StandardShowcase';

export default function App() {
  return (
    <View style={styles.container}>
      <StandardShowcase />
      {/* <Showcase /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  input: {
    color: '#fff',
  },
});
