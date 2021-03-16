import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { InputStandard } from 'react-native-input-outline';

const darkBackground = '#3a469c';
// const lightForeground = '#fff';
const darkForeground = '#03aae2';

export default () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'<InputStandard />'}</Text>
      <Text style={styles.body}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore.
      </Text>
      <InputStandard
        style={styles.input}
        backgroundColor={darkBackground}
        activeColor={'#fff'}
        inactiveColor={darkForeground}
        placeholder="Your Name"
      />
      <InputStandard
        style={styles.input}
        backgroundColor={darkBackground}
        activeColor={'#fff'}
        inactiveColor={darkForeground}
        placeholder="Your Email"
      />
      <InputStandard
        style={styles.input}
        backgroundColor={darkBackground}
        activeColor={'#fff'}
        inactiveColor={darkForeground}
        placeholder="Your Message"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBackground,
    alignItems: 'center',
    padding: 15,
    paddingTop: 100,
    paddingBottom: 200,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  body: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 50,
  },
  input: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: darkBackground,
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    paddingHorizontal: 100,
    paddingVertical: 15,
  },
});
